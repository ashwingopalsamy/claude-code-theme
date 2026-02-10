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

export const italicOptions: ThemeOptions = {
  enableItalics: true,
  italicComments: true,
  italicKeywords: true,
  emphasizeDeclarations: true,
};

const themeNames: Record<ThemeVariant, { regular: string; italic: string }> = {
  dark: {
    regular: 'Claude Code Dark',
    italic: 'Claude Code Dark Italic',
  },
  'dark-high-contrast': {
    regular: 'Claude Code Dark High Contrast',
    italic: 'Claude Code Dark High Contrast',
  },
  light: {
    regular: 'Claude Code Light',
    italic: 'Claude Code Light Italic',
  },
  'light-high-contrast': {
    regular: 'Claude Code Light High Contrast',
    italic: 'Claude Code Light High Contrast',
  },
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

  const useItalicName = options.enableItalics && !variant.includes('high-contrast');
  const nameSet = themeNames[variant];

  return {
    name: useItalicName ? nameSet.italic : nameSet.regular,
    type: palette.type,
    colors: getUiColors(context),
    semanticHighlighting: true,
    semanticTokenColors: getSemanticTokens(context),
    tokenColors: getTokenColors(context),
  };
}
