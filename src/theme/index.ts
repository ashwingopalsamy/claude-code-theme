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
  light: 'Claude Code Light',
  'light-high-contrast': 'Claude Code Light High Contrast',
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
