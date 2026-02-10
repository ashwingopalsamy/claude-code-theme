import { palettes, type ThemeVariant } from '../src/theme/palette';

interface ContrastCheck {
  label: string;
  foreground: string;
  background: string;
  minimum: number;
}

function hexToRgb(color: string): [number, number, number] {
  const normalized = color.replace('#', '');
  const value = normalized.length === 8 ? normalized.slice(0, 6) : normalized;
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function channelToLinear(value: number): number {
  const normalized = value / 255;
  if (normalized <= 0.03928) {
    return normalized / 12.92;
  }
  return Math.pow((normalized + 0.055) / 1.055, 2.4);
}

function luminance(color: string): number {
  const [r, g, b] = hexToRgb(color);
  const red = channelToLinear(r);
  const green = channelToLinear(g);
  const blue = channelToLinear(b);

  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
}

function contrastRatio(foreground: string, background: string): number {
  const fg = luminance(foreground);
  const bg = luminance(background);
  const light = Math.max(fg, bg);
  const dark = Math.min(fg, bg);
  return (light + 0.05) / (dark + 0.05);
}

function reportVariant(variant: ThemeVariant): { failed: boolean; lines: string[] } {
  const palette = palettes[variant];
  const checks: ContrastCheck[] = [
    {
      label: 'Editor foreground',
      foreground: palette.foreground,
      background: palette.background,
      minimum: 7,
    },
    {
      label: 'Comment',
      foreground: palette.syntax.comment,
      background: palette.background,
      minimum: 4.5,
    },
    {
      label: 'Keyword',
      foreground: palette.syntax.keyword,
      background: palette.background,
      minimum: 4.5,
    },
    {
      label: 'Function',
      foreground: palette.syntax.function,
      background: palette.background,
      minimum: 4.5,
    },
    {
      label: 'String',
      foreground: palette.syntax.string,
      background: palette.background,
      minimum: 4.5,
    },
    {
      label: 'Number',
      foreground: palette.syntax.number,
      background: palette.background,
      minimum: 4.5,
    },
    {
      label: 'Error diagnostic',
      foreground: palette.status.error,
      background: palette.background,
      minimum: 4.5,
    },
    {
      label: 'Warning diagnostic',
      foreground: palette.status.warning,
      background: palette.background,
      minimum: 4.5,
    },
    {
      label: 'Success diagnostic',
      foreground: palette.status.success,
      background: palette.background,
      minimum: 4.5,
    },
  ];

  const lines = [`${variant}`];
  let failed = false;

  for (const check of checks) {
    const ratio = contrastRatio(check.foreground, check.background);
    const pass = ratio >= check.minimum;
    failed = failed || !pass;
    lines.push(`  ${pass ? 'PASS' : 'FAIL'}  ${check.label}: ${ratio.toFixed(2)} (min ${check.minimum.toFixed(1)})`);
  }

  return { failed, lines };
}

let hasFailure = false;

for (const variant of Object.keys(palettes) as ThemeVariant[]) {
  const report = reportVariant(variant);
  if (report.failed) {
    hasFailure = true;
  }
  report.lines.forEach((line) => console.log(line));
}

if (hasFailure) {
  process.exitCode = 1;
}
