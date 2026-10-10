import { createHighlighter, type Highlighter } from 'shiki';
import { alpha, type Palette, type ThemeJson } from './theme.ts';

export const FILE = 'agent.ts';

export const CODE = `import { setTimeout as sleep } from "node:timers/promises";
import type { Tool, StreamEvent } from "./types";

type Options = { model: string; signal?: AbortSignal };

const FILE_REF = /@([\\w./-]+\\.(?:ts|go|md))\\b/g;
const MAX_RETRIES = 3;

@injectable()
export class AgentRunner {
  constructor(private readonly tools: Map<string, Tool>) {}

  async *run(prompt: string, opts: Options): AsyncGenerator<StreamEvent> {
    const refs = [...prompt.matchAll(FILE_REF)].map((m) => m[1]);
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        yield* this.stream(prompt, { ...opts, refs });
        return;
      } catch (err) {
        if (!isRetryable(err) || opts.signal?.aborted) throw err;
        // exponential backoff, capped at four seconds
        const delay = Math.min(250 * 2 ** attempt, 4_000);
        await sleep(delay, undefined, { signal: opts.signal });
        console.warn(\`retry \${attempt + 1}/\${MAX_RETRIES} in \${delay}ms\`);
      }
    }
  }
}`;

const L = CODE.split('\n');
const lineOf = (needle: string) => L.findIndex((l) => l.includes(needle)) + 1;
const WORD = 'MAX_RETRIES';
const wordHits = (skip: number): Record<number, [number, number][]> =>
  Object.fromEntries(
    L.flatMap((l, i) => {
      const cols = [...l.matchAll(new RegExp(WORD, 'g'))].map((m) => [m.index!, m.index! + WORD.length] as [number, number]);
      return cols.length && i + 1 !== skip ? [[i + 1, cols]] : [];
    }),
  );

/** 1-based line numbers and 0-based columns used by the editor decorations. */
export const EDITOR = {
  current: lineOf('const delay'), // cursor line, also carries the ghost text
  ghostFrom: L[lineOf('const delay') - 1].indexOf('Math.min(') + 'Math.min('.length,
  selLine: lineOf('attempt < ' + WORD),
  selection: [L[lineOf('attempt < ' + WORD) - 1].indexOf(WORD), L[lineOf('attempt < ' + WORD) - 1].indexOf(WORD) + WORD.length] as [number, number],
  hits: wordHits(lineOf('attempt < ' + WORD)),
  added: [lineOf('isRetryable'), lineOf('exponential'), lineOf('const delay'), lineOf('await sleep'), lineOf('console.warn')],
  modified: [lineOf('attempt < ' + WORD)],
};
/** Crop of the sample used by the bold vs no-bold comparison (1-based, inclusive). */
export const CROP = [lineOf('@injectable'), lineOf('isRetryable')] as const;

export async function createHL(themes: ThemeJson[]): Promise<Highlighter> {
  return createHighlighter({ themes: themes as never[], langs: ['ts'] });
}

export interface Seg {
  text: string;
  color: string;
  style: number; // Shiki FontStyle flags: 1 italic, 2 bold, 4 underline, 8 strikethrough
  skipBrackets: boolean;
}

/** Highlights CODE into per-line segments (one per TextMate scope run). */
export function highlight(hl: Highlighter, theme: ThemeJson): Seg[][] {
  const out = hl.codeToTokens(CODE, { lang: 'ts', theme: theme.name, includeExplanation: 'scopeName' } as never);
  return out.tokens.map((line) =>
    line.flatMap((tok) =>
      ((tok.explanation ?? [{ content: tok.content, scopes: [] }]) as { content: string; scopes: { scopeName: string }[] }[]).map((part) => ({
        text: part.content,
        color: tok.color ?? '',
        style: (tok.fontStyle as number) > 0 ? (tok.fontStyle as number) : 0,
        // strings, comments, regexes and ${} expressions are not bracket-pair colorized
        skipBrackets: part.scopes.some((s) => /^(string|comment|template|meta\.template)|regex/.test(s.scopeName)),
      })),
    ),
  );
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

interface LineOpts {
  /** Selection range [from, to) in columns. */
  sel?: [number, number];
  /** Columns from which the remainder is ghost text, with a cursor before it. */
  ghostFrom?: number;
  /** Other occurrences of the selected word. */
  hits?: [number, number][];
}

/**
 * Renders highlighted lines to HTML. Bracket depth colors (editorBracketHighlight.*)
 * run across the whole document, as VS Code's bracket pair colorization does.
 */
export function linesHtml(lines: Seg[][], pal: Palette, opts: Record<number, LineOpts> = {}): string[] {
  const brackets = [1, 2, 3, 4, 5, 6].map((i) => pal(`editorBracketHighlight.foreground${i}`, '#0000'));
  const ghost = pal('editorGhostText.foreground', 'editorLineNumber.foreground');
  const sel = pal('editor.selectionBackground');
  const hit = pal('editor.selectionHighlightBackground', alpha(sel.slice(0, 7), 0.15));
  let depth = 0;
  return lines.map((segs, li) => {
    const o = opts[li + 1] ?? {};
    let col = 0;
    let html = '';
    const cursor = () => `<i class="cursor"></i>`;
    for (const seg of segs) {
      // split each segment on bracket characters and decoration edges
      const cuts = new Set([0, seg.text.length]);
      [...seg.text].forEach((ch, i) => { if (!seg.skipBrackets && '()[]{}'.includes(ch)) { cuts.add(i); cuts.add(i + 1); } });
      for (const edge of [o.sel?.[0], o.sel?.[1], o.ghostFrom, ...(o.hits ?? []).flat()])
        if (edge !== undefined && edge > col && edge < col + seg.text.length) cuts.add(edge - col);
      const pts = [...cuts].sort((a, b) => a - b);
      for (let k = 0; k < pts.length - 1; k++) {
        const text = seg.text.slice(pts[k], pts[k + 1]);
        const start = col + pts[k];
        let color = seg.color;
        if (!seg.skipBrackets && text.length === 1 && '()[]{}'.includes(text)) {
          const open = '([{'.includes(text);
          if (!open) depth = Math.max(0, depth - 1);
          color = brackets[depth % 6] !== '#0000' ? brackets[depth % 6] : color;
          if (open) depth++;
        }
        const ghosted = o.ghostFrom !== undefined && start >= o.ghostFrom;
        let style = `color:${ghosted ? ghost : color}`;
        if (!ghosted && seg.style & 2) style += ';font-weight:700';
        if (!ghosted && seg.style & 1) style += ';font-style:italic';
        if (seg.style & 4 || seg.style & 8) style += `;text-decoration:${seg.style & 4 ? 'underline' : 'line-through'}`;
        const inSel = o.sel && start >= o.sel[0] && start < o.sel[1];
        const inHit = o.hits?.some(([a, b]) => start >= a && start < b);
        if (inSel) style += `;background:${sel};border-radius:2px`;
        else if (inHit) style += `;background:${hit};border-radius:2px`;
        if (o.ghostFrom === start) html += cursor();
        html += `<span style="${style}">${esc(text)}</span>`;
      }
      col += seg.text.length;
    }
    if (o.ghostFrom !== undefined && o.ghostFrom >= col) html += cursor();
    return html;
  });
}
