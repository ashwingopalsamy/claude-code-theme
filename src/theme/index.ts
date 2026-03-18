import { palettes, ansiPalettes, brandTokens, type ThemeVariant } from './palette';
import type { ThemeContext, ThemeOptions, CompiledTheme } from '../types';
import { getTokenColors } from './tokenColors';
import { getSemanticTokens } from './semanticTokens';
import { getUiColors } from './uiColors';

export const defaultOptions: ThemeOptions = {
  enableItalics: false,
  italicComments: true,
  italicKeywords: true,
  emphasizeDeclarations: true,
};

const themeNames: Record<ThemeVariant, string> = {
  dark: 'Claude Code Dark',
  'dark-high-contrast': 'Claude Code Dark High Contrast',
  'dark-brand': 'Claude Code Dark Brand',
  light: 'Claude Code Light',
  'light-high-contrast': 'Claude Code Light High Contrast',
  'light-brand': 'Claude Code Light Brand',
  'dark-no-bold': 'Claude Code Dark (No Bold)',
  'dark-high-contrast-no-bold': 'Claude Code Dark High Contrast (No Bold)',
  'dark-brand-no-bold': 'Claude Code Dark Brand (No Bold)',
  'light-no-bold': 'Claude Code Light (No Bold)',
  'light-high-contrast-no-bold': 'Claude Code Light High Contrast (No Bold)',
  'light-brand-no-bold': 'Claude Code Light Brand (No Bold)',
};

export function compileTheme(
  variant: ThemeVariant = 'dark',
  options: ThemeOptions = defaultOptions
): CompiledTheme {
  const palette = palettes[variant];
  const ansiColors = ansiPalettes[variant];

  const context: ThemeContext = {
    variant,
    palette,
    ansiColors,
    brandTokens,
    options,
  };

  return {
    name: themeNames[variant],
    type: palette.type,
    colors: getUiColors(context),
    semanticHighlighting: true,
    semanticTokenColors: getSemanticTokens(context),
    tokenColors: getTokenColors(context),
  };
}
