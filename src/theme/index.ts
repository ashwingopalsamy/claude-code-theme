import { palettes, ansiPalettes, brandTokens, type Flavor } from './palette';
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

export function compileTheme(
  flavor: Flavor = 'dark',
  options: ThemeOptions = defaultOptions,
  name: string = flavor
): CompiledTheme {
  const palette = palettes[flavor];
  const ansiColors = ansiPalettes[flavor];

  const context: ThemeContext = {
    flavor,
    palette,
    ansiColors,
    brandTokens,
    options,
  };

  return {
    name,
    type: palette.type,
    colors: getUiColors(context),
    semanticHighlighting: true,
    semanticTokenColors: getSemanticTokens(context),
    tokenColors: getTokenColors(context),
  };
}
