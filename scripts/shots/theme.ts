import { readFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export interface TokenRule {
  name?: string;
  scope: string | string[];
  settings: { foreground?: string; fontStyle?: string };
}
export interface ThemeJson {
  name: string;
  type: 'dark' | 'light';
  colors: Record<string, string>;
  tokenColors: TokenRule[];
  [key: string]: unknown;
}
export interface Flavor {
  slug: string; // "dark-brand"
  label: string; // "Claude Code Dark Brand"
  noBold: boolean;
  json: ThemeJson;
}

/** Reads every theme listed in package.json contributes.themes. */
export function loadFlavors(): Flavor[] {
  const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
  const flavors = pkg.contributes.themes.map((t: { label: string; path: string }) => {
    const json = JSON.parse(readFileSync(resolve(ROOT, t.path), 'utf8')) as ThemeJson;
    const file = basename(t.path, '.json').replace(/^claude-code-/, '');
    // Shiki registers themes by name: the label is unique per file.
    return { slug: file.replace(/-no-bold$/, ''), label: t.label, noBold: file.endsWith('-no-bold'), json: { ...json, name: t.label } };
  }) as Flavor[];
  if (new Set(flavors.map((f) => f.label)).size !== flavors.length) throw new Error('duplicate theme labels');
  return flavors;
}

// ---------------------------------------------------------------- colors

const misses = new Map<string, number>();
export const missingKeys = () => [...misses.entries()].sort((a, b) => b[1] - a[1]);

/**
 * Color resolver: first defined key wins. A key starting with "#" is a literal
 * fallback. Falling past the first key is recorded so the CLI can report it.
 */
export function palette(colors: Record<string, string>) {
  return (...keys: string[]): string => {
    for (let i = 0; i < keys.length; i++) {
      const v = keys[i].startsWith('#') ? keys[i] : colors[keys[i]];
      if (v) {
        if (i > 0 && !keys[0].startsWith('#')) misses.set(keys[0], (misses.get(keys[0]) ?? 0) + 1);
        return v;
      }
    }
    throw new Error(`no color for ${keys.join(' | ')}`);
  };
}
export type Palette = ReturnType<typeof palette>;

function rgba(hex: string): [number, number, number, number] {
  let h = hex.replace('#', '');
  if (h.length <= 4) h = [...h].map((c) => c + c).join('');
  const n = (i: number) => parseInt(h.slice(i, i + 2), 16);
  return [n(0), n(2), n(4), h.length === 8 ? n(6) / 255 : 1];
}
const toHex = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

/** Replaces the alpha channel of a hex color (0..1). */
export function alpha(hex: string, a: number): string {
  const [r, g, b] = rgba(hex);
  return `rgba(${r},${g},${b},${a})`;
}
/** Linear mix: t=0 -> a, t=1 -> b. Alpha of the inputs is ignored. */
export function mix(a: string, b: string, t: number): string {
  const [r1, g1, b1] = rgba(a);
  const [r2, g2, b2] = rgba(b);
  return toHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}
export const isTransparent = (hex: string) => rgba(hex)[3] === 0;

// ---------------------------------------------------------------- token scope lookup

/**
 * Minimal TextMate scope matcher. Resolves the foreground a theme gives to a
 * scope stack (outermost first) the way VS Code does: deepest matching scope,
 * then most specific selector, then the later rule.
 */
export function tokenColor(theme: ThemeJson, stack: string[]): string | undefined {
  const hit = (scope: string, sel: string) => scope === sel || scope.startsWith(sel + '.');
  const match = (selector: string): number[] | null => {
    const parts = selector.trim().split(/\s+/);
    let i = stack.length - 1;
    while (i >= 0 && !hit(stack[i], parts[parts.length - 1])) i--;
    if (i < 0) return null;
    const depth = i;
    for (let p = parts.length - 2; p >= 0; p--) {
      i--;
      while (i >= 0 && !hit(stack[i], parts[p])) i--;
      if (i < 0) return null;
    }
    return [depth, parts.length, selector.length];
  };
  const better = (a: number[], b: number[]) => {
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] > b[i];
    return false;
  };
  let best: { score: number[]; fg: string } | undefined;
  theme.tokenColors.forEach((rule, order) => {
    if (!rule.settings.foreground || !rule.scope) return;
    for (const sel of ([] as string[]).concat(rule.scope).flatMap((s) => s.split(','))) {
      const m = match(sel);
      if (!m) continue;
      const score = [...m, order];
      if (!best || better(score, best.score)) best = { score, fg: rule.settings.foreground };
    }
  });
  return best?.fg;
}

// ---------------------------------------------------------------- fonts

const fontFile = (pkg: string, file: string) =>
  readFileSync(resolve(ROOT, 'node_modules/@fontsource-variable', pkg, 'files', file)).toString('base64');

/** Geist + Geist Mono variable fonts inlined as base64: offline and deterministic. */
export const FONT_CSS = [
  ['Geist', fontFile('geist', 'geist-latin-wght-normal.woff2')],
  ['Geist Mono', fontFile('geist-mono', 'geist-mono-latin-wght-normal.woff2')],
]
  .map(([family, b64]) => `@font-face{font-family:'${family}';font-weight:100 900;font-style:normal;src:url(data:font/woff2;base64,${b64}) format('woff2');}`)
  .join('\n');

export const BASE_CSS = `${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{font-family:'Geist',system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.mono{font-family:'Geist Mono',ui-monospace,monospace;font-variant-ligatures:none}`;

export const page = (css: string, body: string) =>
  `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}\n${css}</style></head><body>${body}</body></html>`;
