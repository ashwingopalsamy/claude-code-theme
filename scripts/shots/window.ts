import { EDITOR, FILE, linesHtml, type Seg } from './sample.ts';
import { page, palette, type Flavor } from './theme.ts';

export const WIN = { w: 1440, h: 900 };

// ---------------------------------------------------------------- icons (24px grid, stroke)

const PATHS: Record<string, string> = {
  files: '<path d="M14.5 3.5H8A1.5 1.5 0 0 0 6.5 5v14A1.5 1.5 0 0 0 8 20.5h8a1.5 1.5 0 0 0 1.5-1.5V8.5z"/><path d="M14.5 3.5v5h5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
  scm: '<circle cx="7" cy="5.5" r="2"/><circle cx="7" cy="18.5" r="2"/><circle cx="17.5" cy="9" r="2"/><path d="M7 7.5v9M17.5 11c0 4-5.5 3.5-10.5 6.5"/>',
  run: '<path d="M8 5.5v13l10.5-6.5z"/>',
  ext: '<rect x="4" y="12" width="7.5" height="7.5" rx="1.3"/><rect x="12.5" y="12" width="7.5" height="7.5" rx="1.3"/><rect x="4" y="3.5" width="7.5" height="7.5" rx="1.3"/><path d="m16.2 3 4 4-4 4-4-4z"/>',
  user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-3.6 3.5-5.5 7-5.5s6.2 1.9 7 5.5"/>',
  gear: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  right: '<path d="m9.5 6 6 6-6 6"/>',
  down: '<path d="m6 9.5 6 6 6-6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  warn: '<path d="M12 4 3 19.5h18z"/><path d="M12 10v4.5M12 17v.2"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/>',
  err: '<circle cx="12" cy="12" r="8.5"/><path d="m9 9 6 6M15 9l-6 6"/>',
  up: '<path d="M12 19V6M6.5 11.5 12 6l5.5 5.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  fwd: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  sync: '<path d="M20 11.5A8 8 0 0 0 5.6 7L4 9M4 4v5h5M4 12.5A8 8 0 0 0 18.4 17l1.6-2M20 20v-5h-5"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15zM10 20.5a2 2 0 0 0 4 0"/>',
  remote: '<path d="m9 7-5 5 5 5M15 7l5 5-5 5"/>',
  dots: '<circle cx="5.5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="18.5" cy="12" r="1.2" fill="currentColor"/>',
  sideL: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M9.5 5v14"/>',
  panel: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M3.5 14h17"/>',
  sideR: '<rect x="3.5" y="5" width="17" height="14" rx="2"/><path d="M14.5 5v14"/>',
  spark: '<path d="M12 3.5c.7 4.6 2.4 6.3 7 7-4.6.7-6.3 2.4-7 7-.7-4.6-2.4-6.3-7-7 4.6-.7 6.3-2.4 7-7z" fill="currentColor"/>',
  file: '<path d="M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V7.5z"/><path d="M14 3.5v4h4"/>',
};
const ic = (name: string, size = 16, sw = 1.5) =>
  `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${PATHS[name]}</svg>`;

// ---------------------------------------------------------------- static content

const TREE: { d: number; name: string; dir?: 'open' | 'closed'; git?: 'M' | 'U' | 'A' | 'D' | 'C' | 'I'; sel?: boolean }[] = [
  { d: 0, name: 'src', dir: 'open' },
  { d: 1, name: 'core', dir: 'open' },
  { d: 2, name: FILE, git: 'M', sel: true },
  { d: 2, name: 'backoff.ts', git: 'U' },
  { d: 2, name: 'legacy-runner.ts', git: 'D' },
  { d: 2, name: 'stream.ts', git: 'C' },
  { d: 1, name: 'tools', dir: 'closed' },
  { d: 1, name: 'types.ts' },
  { d: 0, name: 'test', dir: 'open' },
  { d: 1, name: 'agent.test.ts', git: 'M' },
  { d: 1, name: 'backoff.test.ts', git: 'A' },
  { d: 0, name: '.gitignore', git: 'I' },
  { d: 0, name: 'package.json' },
];
const TABS = [
  { name: FILE, active: true, dirty: true },
  { name: 'backoff.ts' },
  { name: 'agent.test.ts' },
];
const CRUMBS = ['src', 'core', FILE, 'AgentRunner', 'run'];

// ---------------------------------------------------------------- window

/** Mock editor window: every color comes from the theme's `colors`. */
export function windowHtml(flavor: Flavor, lines: Seg[][]): string {
  const p = palette(flavor.json.colors);
  const git = { M: p('gitDecoration.modifiedResourceForeground'), U: p('gitDecoration.untrackedResourceForeground'), A: p('gitDecoration.addedResourceForeground', 'gitDecoration.untrackedResourceForeground'), D: p('gitDecoration.deletedResourceForeground'), C: p('gitDecoration.conflictingResourceForeground'), I: p('gitDecoration.ignoredResourceForeground') };
  const ansi = (n: string) => p(`terminal.ansi${n}`);
  const v: Record<string, string> = {
    fg: p('foreground', 'editor.foreground'),
    desc: p('descriptionForeground', 'sideBar.foreground'),
    cb: p('contrastBorder', '#0000'),
    // title bar
    'title-bg': p('titleBar.activeBackground', 'sideBar.background'),
    'title-fg': p('titleBar.activeForeground', 'sideBar.foreground'),
    'title-bd': p('titleBar.border', 'sideBar.border'),
    'cc-bg': p('commandCenter.background', 'input.background'),
    'cc-fg': p('commandCenter.foreground', 'titleBar.activeForeground'),
    'cc-bd': p('commandCenter.border', 'sideBar.border'),
    // activity bar
    'act-bg': p('activityBar.background', 'sideBar.background'),
    'act-fg': p('activityBar.foreground', 'sideBar.foreground'),
    'act-off': p('activityBar.inactiveForeground', 'descriptionForeground'),
    'act-ind': p('activityBar.activeBorder', 'focusBorder'),
    'act-bd': p('activityBar.border', 'sideBar.border'),
    'badge-bg': p('activityBarBadge.background', 'badge.background'),
    'badge-fg': p('activityBarBadge.foreground', 'badge.foreground'),
    // side bar
    'side-bg': p('sideBar.background'),
    'side-fg': p('sideBar.foreground', 'foreground'),
    'side-bd': p('sideBar.border'),
    'side-title': p('sideBarTitle.foreground', 'sideBar.foreground'),
    'sec-bg': p('sideBarSectionHeader.background', 'sideBar.background'),
    'sec-fg': p('sideBarSectionHeader.foreground', 'sideBarTitle.foreground'),
    'sec-bd': p('sideBarSectionHeader.border', 'sideBar.border'),
    'sel-bg': p('list.activeSelectionBackground', 'list.inactiveSelectionBackground'),
    'sel-fg': p('list.activeSelectionForeground', 'list.inactiveSelectionForeground', 'sideBar.foreground'),
    'guide': p('tree.indentGuidesStroke', 'editorIndentGuide.background1'),
    // tabs
    'tabs-bg': p('editorGroupHeader.tabsBackground', 'sideBar.background'),
    'tabs-bd': p('editorGroupHeader.tabsBorder', 'tab.border'),
    'tab-bd': p('tab.border', 'sideBar.border'),
    'tab-on-bg': p('tab.activeBackground', 'editor.background'),
    'tab-on-fg': p('tab.activeForeground', 'foreground'),
    'tab-on-top': p('tab.activeBorderTop', 'focusBorder'),
    'tab-off-bg': p('tab.inactiveBackground', 'editorGroupHeader.tabsBackground'),
    'tab-off-fg': p('tab.inactiveForeground', 'descriptionForeground'),
    'crumb-bg': p('breadcrumb.background', 'editor.background'),
    'crumb-fg': p('breadcrumb.foreground', 'descriptionForeground'),
    'crumb-on': p('breadcrumb.focusForeground', 'breadcrumb.activeSelectionForeground', 'foreground'),
    // editor
    'ed-bg': p('editor.background'),
    'ed-fg': p('editor.foreground'),
    'ln': p('editorLineNumber.foreground'),
    'ln-on': p('editorLineNumber.activeForeground', 'editor.foreground'),
    'cur-bg': p('editor.lineHighlightBackground', '#0000'),
    'cur-bd': p('editor.lineHighlightBorder', '#0000'),
    cursor: p('editorCursor.foreground', 'foreground'),
    'ig': p('editorIndentGuide.background1', 'editorWhitespace.foreground'),
    'g-add': p('editorGutter.addedBackground', 'gitDecoration.addedResourceForeground'),
    'g-mod': p('editorGutter.modifiedBackground', 'gitDecoration.modifiedResourceForeground'),
    'ov-add': p('editorOverviewRuler.addedForeground', 'editorGutter.addedBackground'),
    'ov-mod': p('editorOverviewRuler.modifiedForeground', 'editorGutter.modifiedBackground'),
    'scroll': p('scrollbarSlider.background', '#7774'),
    // chat
    'req-bg': p('chat.requestBackground', 'sideBar.background'),
    'req-bd': p('chat.requestBorder', 'sideBar.border'),
    'slash-bg': p('chat.slashCommandBackground', 'textPreformat.background'),
    'slash-fg': p('chat.slashCommandForeground', 'textLink.foreground'),
    'pre-bg': p('textPreformat.background', 'textCodeBlock.background', '#7772'),
    'pre-fg': p('textPreformat.foreground', 'foreground'),
    'av-bg': p('chat.avatarBackground', 'badge.background'),
    'av-fg': p('chat.avatarForeground', 'badge.foreground'),
    'ln-add': p('chat.linesAddedForeground', 'gitDecoration.addedResourceForeground'),
    'ln-rem': p('chat.linesRemovedForeground', 'gitDecoration.deletedResourceForeground'),
    'edited': p('chat.editedFileForeground', 'gitDecoration.modifiedResourceForeground'),
    'in-bg': p('input.background'),
    'in-fg': p('input.foreground', 'foreground'),
    'in-bd': p('input.border', 'chat.requestBorder', 'sideBar.border'),
    'in-ph': p('input.placeholderForeground', 'descriptionForeground'),
    'btn-bg': p('button.background'),
    'btn-fg': p('button.foreground'),
    // panel + terminal
    'pan-bg': p('panel.background', 'sideBar.background'),
    'pan-bd': p('panel.border', 'sideBar.border'),
    'pan-on': p('panelTitle.activeForeground', 'foreground'),
    'pan-off': p('panelTitle.inactiveForeground', 'descriptionForeground'),
    'pan-ind': p('panelTitle.activeBorder', 'focusBorder'),
    'term-bg': p('terminal.background', 'panel.background'),
    'term-fg': p('terminal.foreground', 'foreground'),
    'term-cur': p('terminalCursor.foreground', 'editorCursor.foreground'),
    'badge2-bg': p('badge.background'),
    'badge2-fg': p('badge.foreground'),
    green: ansi('Green'), red: ansi('Red'), yellow: ansi('Yellow'), blue: ansi('Blue'), magenta: ansi('Magenta'), cyan: ansi('Cyan'), dim: ansi('BrightBlack'),
    // status bar
    'st-bg': p('statusBar.background'),
    'st-fg': p('statusBar.foreground'),
    'st-bd': p('statusBar.border', '#0000'),
    'st-rem-bg': p('statusBarItem.remoteBackground', 'statusBar.background'),
    'st-rem-fg': p('statusBarItem.remoteForeground', 'statusBar.foreground'),
  };
  const vars = Object.entries(v).map(([k, c]) => `--${k}:${c}`).join(';');

  const opts: Parameters<typeof linesHtml>[2] = {
    [EDITOR.current]: { ghostFrom: EDITOR.ghostFrom },
    [EDITOR.selLine]: { sel: EDITOR.selection },
    ...Object.fromEntries(Object.entries(EDITOR.hits).map(([l, hits]) => [l, { hits }])),
  };
  const code = linesHtml(lines, p, opts)
    .map((html, i) => {
      const n = i + 1;
      const indent = lines[i].map((s) => s.text).join('').search(/\S/);
      const bar = EDITOR.added.includes(n) ? 'add' : EDITOR.modified.includes(n) ? 'mod' : '';
      return `<div class="row${n === EDITOR.current ? ' cur' : ''}"><span class="num">${n}</span><span class="gut ${bar}"></span>` +
        `<span class="cw"><i class="ig" style="width:${Math.max(indent, 0)}ch"></i><span class="code mono">${html}</span></span></div>`;
    })
    .join('');

  const tree = TREE.map((r) => {
    const guides = Array.from({ length: r.d }, (_, i) => `<i class="tg" style="left:${16 + i * 12}px"></i>`).join('');
    const arrow = r.dir ? ic(r.dir === 'open' ? 'down' : 'right', 14, 1.6) : '<span class="ph"></span>';
    const color = r.git ? `color:${git[r.git]};` : '';
    const deco = r.git === 'D' ? 'text-decoration:line-through;' : '';
    return `<div class="tr${r.sel ? ' sel cbd' : ''}" style="padding-left:${8 + r.d * 12}px">${guides}${arrow}<span class="nm" style="${color}${deco}">${r.name}</span>${r.git && r.git !== 'I' ? `<b class="gs" style="color:${git[r.git]}">${r.git}</b>` : ''}</div>`;
  }).join('');

  const tabs = TABS.map((t) => `<div class="tab${t.active ? ' on' : ''}"><span>${t.name}</span>${t.dirty ? '<i class="dirty"></i>' : ic('x', 14, 1.6)}</div>`).join('');
  const crumbs = CRUMBS.map((c, i) => `<span class="${i === CRUMBS.length - 1 ? 'on' : ''}">${c}</span>`).join(ic('right', 12, 1.8));
  const activity = [['files', 1], ['search', 0], ['scm', 0], ['run', 0], ['ext', 0]]
    .map(([n, on]) => `<div class="ab${on ? ' on' : ''}">${ic(n as string, 24, 1.4)}${n === 'scm' ? '<b class="badge">3</b>' : ''}</div>`)
    .join('');
  const chip = (t: string) => `<span class="slash">${t}</span>`;
  const termLine = (icon: string, color: string, text: string, rest = '') =>
    `<div class="tl">${ic(icon, 13, 2)}<span style="color:var(--${color})">${text}</span><span class="dm">${rest}</span></div>`;

  const css = `
:root{${vars}}
#root{width:${WIN.w}px;height:${WIN.h}px;display:grid;grid-template-rows:38px 1fr 24px;background:var(--ed-bg);color:var(--fg);font-size:13px;overflow:hidden;position:relative}
.ic{flex:none;display:block}
.cbd{box-shadow:inset 0 0 0 1px var(--cb)}
/* title bar */
.title{position:relative;display:flex;align-items:center;justify-content:space-between;padding:0 14px 0 16px;background:var(--title-bg);color:var(--title-fg);border-bottom:1px solid var(--title-bd)}
.lights{display:flex;gap:8px}.lights i{width:12px;height:12px;border-radius:50%}
.pill{position:absolute;left:50%;top:6px;transform:translateX(-50%);width:440px;height:26px;border-radius:7px;background:var(--cc-bg);color:var(--cc-fg);border:1px solid var(--cc-bd);display:flex;align-items:center;justify-content:center;gap:8px;font-size:12.5px}
.pill .ic{opacity:.7}
.tbr{display:flex;gap:14px;align-items:center;opacity:.72}
.nav{display:flex;gap:12px;margin-left:22px;opacity:.55}
.lt{display:flex;align-items:center}
/* main row */
.main{display:flex;min-height:0}
.activity{width:48px;flex:none;background:var(--act-bg);border-right:1px solid var(--act-bd);display:flex;flex-direction:column;align-items:center}
.ab{position:relative;width:48px;height:48px;display:grid;place-items:center;color:var(--act-off)}
.ab.on{color:var(--act-fg)}.ab.on::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--act-ind)}
.badge{position:absolute;right:7px;bottom:7px;min-width:16px;height:16px;border-radius:8px;padding:0 4px;background:var(--badge-bg);color:var(--badge-fg);font:600 10px/16px 'Geist',sans-serif;text-align:center}
.act-end{margin-top:auto;display:flex;flex-direction:column}
.side{width:240px;flex:none;background:var(--side-bg);color:var(--side-fg);border-right:1px solid var(--side-bd);display:flex;flex-direction:column}
.stitle{height:35px;display:flex;align-items:center;justify-content:space-between;padding:0 12px 0 20px;font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--side-title)}
.shead{display:flex;align-items:center;gap:2px;height:24px;padding:0 8px;background:var(--sec-bg);color:var(--sec-fg);border-top:1px solid var(--sec-bd);font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase}
.tree{padding:4px 0}
.tr{position:relative;display:flex;align-items:center;height:22px;padding-right:12px}
.tr.sel{background:var(--sel-bg);color:var(--sel-fg)}
.tr .ic{opacity:.6;margin-right:2px}.ph{width:16px;flex:none}
.tg{position:absolute;top:0;bottom:0;width:1px;background:var(--guide)}
.nm{flex:1;white-space:nowrap}.gs{font-size:11.5px;font-weight:600;margin-left:8px}
.sbot{margin-top:auto}
/* editor column */
.center{flex:1;min-width:0;display:flex;flex-direction:column}
.tabs{height:36px;flex:none;display:flex;background:var(--tabs-bg);border-bottom:1px solid var(--tabs-bd)}
.tab{position:relative;display:flex;align-items:center;gap:10px;padding:0 12px 0 16px;background:var(--tab-off-bg);color:var(--tab-off-fg);border-right:1px solid var(--tab-bd);font-size:13px}
.tab.on{background:var(--tab-on-bg);color:var(--tab-on-fg)}.tab.on::before{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:var(--tab-on-top)}
.tab .ic{opacity:.0}.tab.on .ic{opacity:.55}
.dirty{width:8px;height:8px;margin:0 3px;border-radius:50%;background:currentColor}
.crumbs{height:26px;flex:none;display:flex;align-items:center;gap:4px;padding:0 16px;background:var(--crumb-bg);color:var(--crumb-fg);font-size:12px}
.crumbs .on{color:var(--crumb-on)}.crumbs .ic{opacity:.6}
.editor{position:relative;flex:1;min-height:0;background:var(--ed-bg);padding-top:6px;overflow:hidden;font-size:13px}
.row{display:flex;height:20px;line-height:20px}
.row.cur{background:var(--cur-bg);box-shadow:inset 0 0 0 1px var(--cur-bd)}
.num{width:48px;flex:none;text-align:right;color:var(--ln);font:12.5px/20px 'Geist Mono',monospace;padding-right:12px}
.cur .num{color:var(--ln-on)}
.gut{width:12px;flex:none;position:relative}.gut.add::after,.gut.mod::after{content:"";position:absolute;left:1px;top:0;bottom:0;width:3px;border-radius:1.5px}
.gut.add::after{background:var(--g-add)}.gut.mod::after{background:var(--g-mod)}
.cw{position:relative}
.ig{position:absolute;left:0;top:0;height:20px;background:repeating-linear-gradient(90deg,var(--ig) 0 1px,transparent 1px 2ch);font:13px 'Geist Mono',monospace}
.code{position:relative;font-size:13px;white-space:pre}
.cursor{display:inline-block;width:2px;height:16px;margin:0 -1px;vertical-align:-3px;background:var(--cursor)}
.rule{position:absolute;right:0;top:0;bottom:0;width:14px}
.rule i{position:absolute;right:2px;width:4px;height:8px;border-radius:1px}
.thumb{position:absolute;right:0;top:0;width:10px;height:70%;background:var(--scroll);border-radius:5px 0 0 5px;opacity:.55}
/* panel */
.panel{height:192px;flex:none;background:var(--pan-bg);border-top:1px solid var(--pan-bd);display:flex;flex-direction:column}
.ptabs{height:35px;flex:none;display:flex;align-items:stretch;padding:0 12px;gap:18px;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--pan-off)}
.ptabs>span{display:flex;align-items:center;gap:6px;border-bottom:1px solid transparent;margin-bottom:-1px}
.ptabs .on{color:var(--pan-on);border-bottom-color:var(--pan-ind)}
.pb{padding:0 5px;border-radius:8px;background:var(--badge2-bg);color:var(--badge2-fg);font:600 10px/16px 'Geist',sans-serif;letter-spacing:0}
.pr{margin-left:auto;display:flex;align-items:center;gap:12px;opacity:.7;color:var(--pan-on)}
.term{flex:1;background:var(--term-bg);color:var(--term-fg);padding:10px 16px;font:12.5px/19px 'Geist Mono',monospace;font-variant-ligatures:none;overflow:hidden}
.tl{display:flex;align-items:center;gap:8px;white-space:pre}.tl .dm{color:var(--dim)}.tl .ic{margin-left:2px}
.tl .ic:first-child{color:inherit}
.tcur{display:inline-block;width:7px;height:15px;background:var(--term-cur);vertical-align:-3px}
/* chat */
.chat{width:320px;flex:none;background:var(--side-bg);color:var(--side-fg);border-left:1px solid var(--side-bd);display:flex;flex-direction:column}
.chead{height:35px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 12px 0 16px;font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--side-title)}
.chead .tbr{opacity:.65;gap:10px}
.msgs{flex:1;padding:6px 14px 0;display:flex;flex-direction:column;gap:16px;overflow:hidden}
.bubble{background:var(--req-bg);border:1px solid var(--req-bd);border-radius:8px;padding:10px 12px;line-height:1.55}
.who{display:flex;align-items:center;gap:8px;font-weight:600;font-size:12.5px;margin-bottom:8px}
.av{width:20px;height:20px;border-radius:50%;background:var(--av-bg);color:var(--av-fg);display:grid;place-items:center}
.reply{line-height:1.6;color:var(--side-fg)}
.code2{font:12px 'Geist Mono',monospace;background:var(--pre-bg);color:var(--pre-fg);border-radius:4px;padding:1px 5px}
.slash{background:var(--slash-bg);color:var(--slash-fg);border-radius:3px;box-shadow:-4px 0 0 0 var(--slash-bg),4px 0 0 0 var(--slash-bg);margin:0 4px}
.steps{display:flex;flex-direction:column;gap:5px;margin:-2px 0 10px;color:var(--desc);font-size:12.5px}.steps div{display:flex;align-items:center;gap:7px}.steps .ic{opacity:.6}.steps span{color:var(--side-fg)}
.edited{display:flex;align-items:center;gap:8px;margin-top:12px;padding:7px 10px;border:1px solid var(--req-bd);border-radius:6px;font-size:12.5px}
.edited .f{color:var(--edited);font-weight:500}.edited .a{color:var(--ln-add);margin-left:auto;font:12px 'Geist Mono',monospace}.edited .r{color:var(--ln-rem);font:12px 'Geist Mono',monospace}
.compose{padding:12px 14px 14px}
.box{background:var(--in-bg);border:1px solid var(--in-bd);border-radius:10px;padding:10px 12px 8px}
.box p{line-height:1.6;color:var(--in-fg);min-height:42px}
.box .cur2{display:inline-block;width:1.5px;height:15px;background:var(--cursor);vertical-align:-3px}
.tools{display:flex;align-items:center;justify-content:space-between;margin-top:8px;color:var(--in-ph);font-size:12px}
.tools .l{display:flex;align-items:center;gap:6px}
.send{width:26px;height:26px;border-radius:50%;background:var(--btn-bg);color:var(--btn-fg);display:grid;place-items:center}
/* status bar */
.status{display:flex;align-items:center;justify-content:space-between;background:var(--st-bg);color:var(--st-fg);border-top:1px solid var(--st-bd);font-size:12px}
.status>div{display:flex;height:100%;align-items:center}
.status .it{display:flex;align-items:center;gap:5px;padding:0 9px;height:100%}
.status .rem{background:var(--st-rem-bg);color:var(--st-rem-fg);padding:0 12px}`;

  const body = `<div id="root">
<div class="title"><div class="lt"><div class="lights"><i style="background:#FF5F57"></i><i style="background:#FEBC2E"></i><i style="background:#28C840"></i></div><div class="nav">${ic('back', 15)}${ic('fwd', 15)}</div></div>
  <div class="pill cbd">${ic('search', 14)}<span>agent-runtime</span></div>
  <div class="tbr">${ic('sideL', 17)}${ic('panel', 17)}${ic('sideR', 17)}${ic('user', 17)}</div></div>
<div class="main">
  <div class="activity">${activity}<div class="act-end"><div class="ab">${ic('user', 24, 1.4)}</div><div class="ab">${ic('gear', 24, 1.4)}</div></div></div>
  <div class="side"><div class="stitle"><span>Explorer</span>${ic('dots', 16)}</div>
    <div class="shead">${ic('down', 14, 1.8)}agent-runtime</div><div class="tree">${tree}</div>
    <div class="sbot"><div class="shead">${ic('right', 14, 1.8)}Outline</div><div class="shead">${ic('right', 14, 1.8)}Timeline</div></div></div>
  <div class="center">
    <div class="tabs">${tabs}</div>
    <div class="crumbs">${crumbs}</div>
    <div class="editor">${code}<div class="thumb"></div><div class="rule"><i style="top:150px;background:var(--ov-add)"></i><i style="top:236px;background:var(--ov-mod)"></i></div></div>
    <div class="panel"><div class="ptabs"><span>Problems<b class="pb">2</b></span><span>Output</span><span>Debug Console</span><span class="on">Terminal</span>
      <div class="pr">${ic('plus', 15)}${ic('down', 15)}${ic('x', 15)}</div></div>
      <div class="term">
        <div class="tl"><span style="color:var(--blue)">~/agent-runtime</span><span><span class="dm">git:(</span><span style="color:var(--magenta)">feat/backoff</span><span class="dm">)</span> $ pnpm test</span></div>
        ${termLine('check', 'green', 'agent.test.ts', '  (9 tests)  41ms')}
        ${termLine('check', 'green', 'backoff.test.ts', '  (4 tests)  12ms')}
        ${termLine('x', 'red', 'abort.test.ts', '  cancels pending sleep')}
        ${termLine('warn', 'yellow', 'retry budget exhausted', '  after 3 attempts')}
        ${termLine('info', 'blue', '13 passed, 1 failed', '  (14)')}
        <div class="tl"><span style="color:var(--blue)">~/agent-runtime</span><span><span class="dm">git:(</span><span style="color:var(--magenta)">feat/backoff</span><span class="dm">)</span> $ <i class="tcur"></i></span></div>
      </div></div>
  </div>
  <div class="chat"><div class="chead"><span>Chat</span><div class="tbr">${ic('plus', 15)}${ic('dots', 16)}${ic('x', 15)}</div></div>
    <div class="msgs">
      <div class="bubble cbd">Make the stream handler in ${chip('@' + FILE)} retry on 429s with exponential backoff. Keep the abort signal working.</div>
      <div><div class="who"><span class="av">${ic('spark', 12)}</span>Assistant</div>
        <div class="steps"><div>${ic('file', 14)}Read <span>${FILE}</span></div><div>${ic('file', 14)}Read <span>types.ts</span></div></div>
        <div class="reply">I wrapped <span class="code2">stream()</span> in a retry loop: three attempts, delays doubling from 250&nbsp;ms up to a 4&nbsp;s cap, and the abort signal now reaches <span class="code2">sleep</span> too.
        <div class="edited">${ic('file', 14)}<span class="f">${FILE}</span><span class="a">+9</span><span class="r">−1</span></div></div></div>
      <div class="bubble cbd">Run the tests.</div>
      <div><div class="who"><span class="av">${ic('spark', 12)}</span>Assistant</div>
        <div class="reply">13 passed, 1 failed. <span class="code2">abort.test.ts</span> still waits out the full delay, so the signal is not reaching the sleep yet.</div></div>
    </div>
    <div class="compose"><div class="box cbd"><p>Fix it, then extend the test in ${chip('@backoff.ts')}<i class="cur2"></i></p>
      <div class="tools"><div class="l">${ic('plus', 15)}<span>Edit automatically</span>${ic('down', 12, 1.8)}</div><div class="send">${ic('up', 14, 2)}</div></div></div></div>
  </div>
</div>
<div class="status"><div><span class="it rem">${ic('remote', 14)}</span><span class="it">${ic('scm', 14)}feat/backoff</span><span class="it">${ic('sync', 13)}</span><span class="it">${ic('err', 13)}0 ${ic('warn', 13)}2</span></div>
  <div><span class="it">Ln ${EDITOR.current}, Col ${EDITOR.ghostFrom + 1}</span><span class="it">Spaces: 2</span><span class="it">UTF-8</span><span class="it">TypeScript</span><span class="it">${ic('bell', 14)}</span></div></div>
</div>`;

  return page(css, body);
}
