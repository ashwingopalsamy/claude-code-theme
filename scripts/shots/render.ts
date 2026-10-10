/**
 * Generates README visuals from the built theme JSONs (run `pnpm build` first):
 *   assets/shots/<flavor>.png, assets/hero.png, assets/swatches.png, assets/bold-vs-nobold.png
 * Shiki highlights, an HTML mock window is screenshotted by Playwright at DPR 2.
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium, type Browser } from 'playwright';
import { boldHtml, heroHtml, swatchesHtml } from './hero.ts';
import { createHL, highlight } from './sample.ts';
import { loadFlavors, missingKeys, ROOT } from './theme.ts';
import { windowHtml } from './window.ts';

const ASSETS = resolve(ROOT, 'assets');
const BUDGET_KB = 600;

async function launch(): Promise<Browser> {
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    console.warn('Google Chrome not found, falling back to bundled Chromium');
    return chromium.launch();
  }
}

const flavors = loadFlavors();
const bold = flavors.filter((f) => !f.noBold);
const hl = await createHL(flavors.map((f) => f.json));
const lines = (slug: string, noBold = false) => highlight(hl, flavors.find((f) => f.slug === slug && f.noBold === noBold)!.json);

const browser = await launch();
const tab = await (await browser.newContext({ deviceScaleFactor: 2 })).newPage();

/** Renders `html` and screenshots its #root element to `assets/<out>`. */
async function shoot(html: string, out: string): Promise<Buffer> {
  await tab.setContent(html, { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  const root = tab.locator('#root');
  const box = (await root.boundingBox())!;
  await tab.setViewportSize({ width: Math.ceil(box.width), height: Math.ceil(box.height) });
  let png = await root.screenshot({ type: 'png', animations: 'disabled' });
  let note = '';
  if (png.length > BUDGET_KB * 1024) {
    // gradients and downscaled screenshots do not deflate well: palette-quantize only when over budget
    const { default: sharp } = await import('sharp');
    png = await sharp(png).png({ palette: true, quality: 92, effort: 10 }).toBuffer();
    note = ' (palette)';
  }
  writeFileSync(resolve(ASSETS, out), png);
  const kb = Math.round(png.length / 1024);
  console.log(`${kb > BUDGET_KB ? 'OVER ' : 'ok   '} ${String(kb).padStart(4)} KB  assets/${out}${note}`);
  return png;
}

mkdirSync(resolve(ASSETS, 'shots'), { recursive: true });
for (const old of ['dark', 'light'].flatMap((t) => [`${t}-theme-primary.png`, `${t}-theme-secondary.png`])) rmSync(resolve(ASSETS, old), { force: true });

try {
  const shots: Record<string, Buffer> = {};
  for (const f of bold) shots[f.slug] = await shoot(windowHtml(f, lines(f.slug)), `shots/${f.slug}.png`);
  await shoot(heroHtml({ dark: shots['dark'], light: shots['light'], midnight: shots['midnight'] }, bold), 'hero.png');
  await shoot(swatchesHtml(bold), 'swatches.png');
  const dark = flavors.find((f) => f.slug === 'dark' && !f.noBold)!;
  const darkNb = flavors.find((f) => f.slug === 'dark' && f.noBold)!;
  await shoot(
    boldHtml([
      { flavor: dark, label: 'bold', lines: lines('dark') },
      { flavor: darkNb, label: 'no bold', lines: lines('dark', true) },
    ]),
    'bold-vs-nobold.png',
  );
} finally {
  await browser.close();
}

const missing = missingKeys();
if (missing.length) console.log('fallback keys used (key x count):', missing.map(([k, n]) => `${k} x${n}`).join(', '));
