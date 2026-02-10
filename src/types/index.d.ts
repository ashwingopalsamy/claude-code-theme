import type { ClaudePalette, AnsiColors, ThemeVariant, BrandTokens } from '../theme/palette';

export interface ThemeOptions {
  enableItalics: boolean;
  italicComments: boolean;
  italicKeywords: boolean;
  emphasizeDeclarations: boolean;
}

export interface ThemeContext {
  variant: ThemeVariant;
  palette: ClaudePalette;
  ansiColors: { normal: AnsiColors; bright: AnsiColors };
  brandTokens: BrandTokens;
  options: ThemeOptions;
}

export interface TextmateRule {
  name?: string;
  scope: string | string[];
  settings: {
    foreground?: string;
    fontStyle?: string;
  };
}

export type TextmateColors = TextmateRule[];

export interface SemanticTokenRule {
  [key: string]: {
    foreground?: string;
    fontStyle?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
  };
}

export interface WorkbenchColors {
  [key: string]: string;
}

export interface CompiledTheme {
  name: string;
  type: 'light' | 'dark';
  colors: WorkbenchColors;
  semanticHighlighting: boolean;
  semanticTokenColors: SemanticTokenRule;
  tokenColors: TextmateColors;
}
