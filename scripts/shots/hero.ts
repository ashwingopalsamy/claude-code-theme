import { CROP, linesHtml, type Seg } from './sample.ts';
import { page, palette, tokenColor, type Flavor } from './theme.ts';

export const HERO = { w: 1280, h: 640 };
export const SWATCHES = { w: 1280 };
export const BOLD = { w: 1320 };

const short = (f: Flavor) => f.label.replace(/^Claude Code /, '');
const dataUri = (png: Buffer) => `data:image/png;base64,${png.toString('base64')}`;

// ---------------------------------------------------------------- hero

const CHIP_ORDER = ['dark', 'light', 'midnight', 'dusk', 'mono-dark', 'mono-light', 'dark-brand', 'light-brand', 'dark-high-contrast', 'light-high-contrast'];

/** Three fanned window cards on an ink-to-clay gradient, title, tagline, flavor chips. */
export function heroHtml(cards: { dark: Buffer; light: Buffer; midnight: Buffer }, flavors: Flavor[]): string {
  const chips = CHIP_ORDER.map((slug) => flavors.find((f) => f.slug === slug)!)
    .map((f) => {
      const bg = f.json.colors['editor.background'];
      const accent = f.json.colors['focusBorder'];
      return `<span class="chip"><i style="background:linear-gradient(90deg,${bg} 50%,${accent} 50%)"></i>${short(f)}</span>`;
    })
    .join('');
  const css = `
#root{position:relative;width:${HERO.w}px;height:${HERO.h}px;overflow:hidden;color:#FAF9F5;
 background:radial-gradient(1300px 900px at 50% 76%,rgba(217,119,87,.38),rgba(217,119,87,0) 60%),
  radial-gradient(640px 380px at 6% 0%,rgba(217,119,87,.2),rgba(217,119,87,0) 70%),
  linear-gradient(180deg,#141413 0%,#19130F 100%)}
.head{position:absolute;top:46px;left:0;right:0;text-align:center}
h1{font-size:60px;line-height:1.05;font-weight:600;letter-spacing:-.04em}
.tag{margin-top:12px;font-size:20px;letter-spacing:-.01em;color:rgba(250,249,245,.62)}
.chips{display:flex;justify-content:center;gap:8px;margin-top:26px}
.chip{display:flex;align-items:center;gap:7px;height:28px;padding:0 12px 0 9px;border-radius:99px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);font-size:12.5px;font-weight:500;color:#F0EEE6;white-space:nowrap}
.chip i{width:11px;height:11px;border-radius:50%;box-shadow:0 0 0 1px rgba(255,255,255,.18)}
.card{position:absolute;top:262px;width:600px;border-radius:14px;overflow:hidden;
 box-shadow:0 0 0 1px rgba(255,255,255,.14),0 60px 90px -24px rgba(0,0,0,.7),0 24px 40px -12px rgba(0,0,0,.5)}
.card img{display:block;width:100%}
.card::after{content:"";position:absolute;inset:0;border-radius:14px;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,0) 28%);pointer-events:none}
.s::after{background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(20,16,12,.2) 60%)}
.l{left:-70px;top:300px;transform:perspective(1900px) rotateY(24deg);z-index:1}
.r{right:-70px;top:300px;transform:perspective(1900px) rotateY(-24deg);z-index:1}
.c{left:320px;width:640px;top:236px;z-index:2}`;
  const body = `<div id="root">
<div class="head"><h1>Claude Code Theme</h1><div class="tag">warm, calm themes for long sessions.</div><div class="chips">${chips}</div></div>
<div class="card s l"><img src="${dataUri(cards.light)}"></div>
<div class="card s r"><img src="${dataUri(cards.midnight)}"></div>
<div class="card c"><img src="${dataUri(cards.dark)}"></div></div>`;
  return page(css, body);
}

// ---------------------------------------------------------------- swatches

/** Scope stacks (TypeScript) looked up in each theme's tokenColors. */
const SWATCH_SCOPES: [string, string[]][] = [
  ['keyword', ['source.ts', 'keyword.control.ts']],
  ['function', ['source.ts', 'meta.function-call.ts', 'entity.name.function.ts']],
  ['type', ['source.ts', 'meta.type.annotation.ts', 'entity.name.type.ts']],
  ['string', ['source.ts', 'string.quoted.double.ts']],
  ['number', ['source.ts', 'constant.numeric.decimal.ts']],
  ['constant', ['source.ts', 'variable.other.constant.ts']],
  ['property', ['source.ts', 'variable.other.property.ts']],
  ['decorator', ['source.ts', 'meta.decorator.ts', 'punctuation.decorator.ts']],
  ['comment', ['source.ts', 'comment.line.double-slash.ts']],
];

/** One row per flavor: name, then 9 syntax swatches on the flavor's editor background. */
export function swatchesHtml(flavors: Flavor[]): string {
  const cols = 'display:grid;grid-template-columns:repeat(9,1fr);padding:0 28px';
  const rows = flavors
    .map((f) => {
      const p = palette(f.json.colors);
      const dots = SWATCH_SCOPES.map(([, stack]) => {
        const c = tokenColor(f.json, stack) ?? p('editor.foreground');
        return `<div style="display:grid;place-items:center"><i style="width:30px;height:30px;border-radius:50%;background:${c};box-shadow:0 0 0 1px rgba(128,128,128,.28)"></i></div>`;
      }).join('');
      return `<div class="row"><div class="name"><b>${short(f)}</b><span class="mono">${p('editor.background').toUpperCase()}</span></div>
        <div class="tile" style="background:${p('editor.background')};${cols}">${dots}</div></div>`;
    })
    .join('');
  const labels = SWATCH_SCOPES.map(([n]) => `<span>${n}</span>`).join('');
  const css = `
#root{width:${SWATCHES.w}px;padding:36px 44px 40px;background:#F1F0EB;color:#1F1E1D}
.row{display:grid;grid-template-columns:230px 1fr;align-items:center;height:62px;margin-bottom:8px}
.name{display:flex;flex-direction:column;gap:3px}.name b{font-size:16px;font-weight:600;letter-spacing:-.01em}
.name span{font-size:11.5px;color:#8A857C}
.tile{height:62px;border-radius:12px;box-shadow:0 0 0 1px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.05)}
.cap{display:grid;grid-template-columns:230px 1fr;margin-bottom:12px}
.cap div{display:grid;grid-template-columns:repeat(9,1fr);padding:0 28px;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:#8A857C;text-align:center}`;
  return page(css, `<div id="root"><div class="cap"><span></span><div>${labels}</div></div>${rows}</div>`);
}

// ---------------------------------------------------------------- bold vs no bold

/** The same code crop in a bold theme and its no-bold twin, side by side. */
export function boldHtml(pairs: { flavor: Flavor; label: string; lines: Seg[][] }[]): string {
  const cards = pairs
    .map(({ flavor, label, lines }) => {
      const p = palette(flavor.json.colors);
      const html = linesHtml(lines, p).slice(CROP[0] - 1, CROP[1]).join('\n');
      return `<div class="col"><div class="lab">${label}</div>
        <pre class="card mono" style="background:${p('editor.background')};color:${p('editor.foreground')}">${html}</pre></div>`;
    })
    .join('');
  const css = `
#root{display:flex;gap:20px;width:${BOLD.w}px;padding:28px 32px 32px;background:#F1F0EB}
.col{flex:1}.lab{margin:0 0 10px 4px;font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#6F6A61}
.card{margin:0;padding:22px 24px;border-radius:12px;font-size:13px;line-height:21px;box-shadow:0 0 0 1px rgba(0,0,0,.08),0 10px 30px -12px rgba(0,0,0,.25)}`;
  return page(css, `<div id="root">${cards}</div>`);
}
