import { compileTheme } from '../src/theme';
import { ansiPalettes, palettes, type ThemeVariant } from '../src/theme/palette';

interface ContrastCheck {
  label: string;
  foreground: string;
  background: string;
  minimum: number;
}

interface OverlayCheck {
  label: string;
  overlay: string;
  background: string;
  minimum: number;
}

interface HueDistanceCheck {
  label: string;
  first: string;
  second: string;
  minimumDistance: number;
}

type Rgba = [number, number, number, number];
type Rgb = [number, number, number];

function hexToRgba(color: string): Rgba {
  const normalized = color.replace('#', '');

  if (normalized.length !== 6 && normalized.length !== 8) {
    throw new Error(`Invalid color value "${color}"`);
  }

  const value = normalized.length === 6 ? `${normalized}ff` : normalized;

  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
    parseInt(value.slice(6, 8), 16) / 255,
  ];
}

function composite(foreground: Rgba, background: Rgba): Rgba {
  const [fr, fg, fb, fa] = foreground;
  const [br, bg, bb, ba] = background;

  const outAlpha = fa + (ba * (1 - fa));

  if (outAlpha === 0) {
    return [0, 0, 0, 0];
  }

  const outRed = ((fr * fa) + (br * ba * (1 - fa))) / outAlpha;
  const outGreen = ((fg * fa) + (bg * ba * (1 - fa))) / outAlpha;
  const outBlue = ((fb * fa) + (bb * ba * (1 - fa))) / outAlpha;

  return [outRed, outGreen, outBlue, outAlpha];
}

function toOpaqueRgb(color: string, fallbackBackground: string = '#000000'): Rgb {
  const rgba = hexToRgba(color);

  if (rgba[3] >= 1) {
    return [rgba[0], rgba[1], rgba[2]];
  }

  const background = hexToRgba(fallbackBackground);
  const flattened = composite(rgba, background);
  return [flattened[0], flattened[1], flattened[2]];
}

function channelToLinear(value: number): number {
  const normalized = value / 255;
  if (normalized <= 0.03928) {
    return normalized / 12.92;
  }
  return Math.pow((normalized + 0.055) / 1.055, 2.4);
}

function luminance([red, green, blue]: Rgb): number {
  return (
    (0.2126 * channelToLinear(red)) +
    (0.7152 * channelToLinear(green)) +
    (0.0722 * channelToLinear(blue))
  );
}

function contrastRatio(foreground: string, background: string): number {
  const fg = toOpaqueRgb(foreground, background);
  const bg = toOpaqueRgb(background, '#000000');
  const light = Math.max(luminance(fg), luminance(bg));
  const dark = Math.min(luminance(fg), luminance(bg));
  return (light + 0.05) / (dark + 0.05);
}

function overlayContrast(overlay: string, background: string): number {
  const composited = composite(hexToRgba(overlay), hexToRgba(background));
  const compositedHex = `#${Math.round(composited[0]).toString(16).padStart(2, '0')}${Math.round(composited[1]).toString(16).padStart(2, '0')}${Math.round(composited[2]).toString(16).padStart(2, '0')}`;
  return contrastRatio(compositedHex, background);
}

function hue(color: string): number {
  const [rRaw, gRaw, bRaw] = toOpaqueRgb(color);
  const r = rRaw / 255;
  const g = gRaw / 255;
  const b = bRaw / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) {
    return 0;
  }

  let value = 0;

  if (max === r) {
    value = ((g - b) / delta) % 6;
  } else if (max === g) {
    value = ((b - r) / delta) + 2;
  } else {
    value = ((r - g) / delta) + 4;
  }

  const degrees = value * 60;
  return degrees < 0 ? degrees + 360 : degrees;
}

function hueDistance(first: string, second: string): number {
  const difference = Math.abs(hue(first) - hue(second));
  return Math.min(difference, 360 - difference);
}

function reportVariant(variant: ThemeVariant): { failed: boolean; lines: string[] } {
  const palette = palettes[variant];
  const ansi = ansiPalettes[variant];
  const compiled = compileTheme(variant);
  const colors = compiled.colors;
  const isLight = palette.type === 'light';

  const contrastChecks: ContrastCheck[] = [
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
    {
      label: 'Terminal foreground',
      foreground: colors['terminal.foreground'],
      background: colors['terminal.background'],
      minimum: 7,
    },
    {
      label: 'Terminal ANSI white',
      foreground: ansi.normal.white,
      background: colors['terminal.background'],
      minimum: isLight ? 4.5 : 7,
    },
    {
      label: 'Terminal ANSI bright white',
      foreground: ansi.bright.white,
      background: colors['terminal.background'],
      minimum: isLight ? 7 : 10,
    },
    {
      label: 'Terminal ANSI bright black',
      foreground: ansi.bright.black,
      background: colors['terminal.background'],
      minimum: 3,
    },
    {
      label: 'Terminal ANSI magenta',
      foreground: ansi.normal.magenta,
      background: colors['terminal.background'],
      minimum: 3.5,
    },
    {
      label: 'Terminal ANSI cyan',
      foreground: ansi.normal.cyan,
      background: colors['terminal.background'],
      minimum: 3.5,
    },
    {
      label: 'Terminal ANSI bright magenta',
      foreground: ansi.bright.magenta,
      background: colors['terminal.background'],
      minimum: 3.5,
    },
    {
      label: 'Terminal ANSI bright cyan',
      foreground: ansi.bright.cyan,
      background: colors['terminal.background'],
      minimum: 3.5,
    },
  ];

  const overlayChecks: OverlayCheck[] = [
    {
      label: 'Editor selection overlay visibility',
      overlay: colors['editor.selectionBackground'],
      background: colors['editor.background'],
      minimum: 1.1,
    },
    {
      label: 'Editor find-match overlay visibility',
      overlay: colors['editor.findMatchBackground'],
      background: colors['editor.background'],
      minimum: 1.2,
    },
    {
      label: 'List active selection overlay visibility',
      overlay: colors['list.activeSelectionBackground'],
      background: colors['sideBar.background'],
      minimum: 1.08,
    },
    {
      label: 'Terminal selection overlay visibility',
      overlay: colors['terminal.selectionBackground'],
      background: colors['terminal.background'],
      minimum: 1.08,
    },
  ];

  const hueChecks: HueDistanceCheck[] = [
    {
      label: 'ANSI magenta vs cyan separation',
      first: ansi.normal.magenta,
      second: ansi.normal.cyan,
      minimumDistance: 20,
    },
    {
      label: 'ANSI bright magenta vs bright cyan separation',
      first: ansi.bright.magenta,
      second: ansi.bright.cyan,
      minimumDistance: 20,
    },
  ];

  const lines = [`${variant}`];
  let failed = false;

  for (const check of contrastChecks) {
    const ratio = contrastRatio(check.foreground, check.background);
    const pass = ratio >= check.minimum;
    failed = failed || !pass;
    lines.push(`  ${pass ? 'PASS' : 'FAIL'}  ${check.label}: ${ratio.toFixed(2)} (min ${check.minimum.toFixed(2)})`);
  }

  for (const check of overlayChecks) {
    const ratio = overlayContrast(check.overlay, check.background);
    const pass = ratio >= check.minimum;
    failed = failed || !pass;
    lines.push(`  ${pass ? 'PASS' : 'FAIL'}  ${check.label}: ${ratio.toFixed(2)} (min ${check.minimum.toFixed(2)})`);
  }

  for (const check of hueChecks) {
    const distance = hueDistance(check.first, check.second);
    const pass = distance >= check.minimumDistance;
    failed = failed || !pass;
    lines.push(`  ${pass ? 'PASS' : 'FAIL'}  ${check.label}: ${distance.toFixed(1)}deg (min ${check.minimumDistance}deg)`);
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
