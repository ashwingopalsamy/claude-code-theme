export interface BrandTokens {
  primary: string;
  secondary: string;
  accent: string;
  neutral: {
    paper: string;
    parchment: string;
    linen: string;
    stone: string;
    smoke: string;
    ash: string;
    charcoal: string;
    ink: string;
  };
  background: {
    light: string;
    lightRaised: string;
    lightInset: string;
    dark: string;
    darkRaised: string;
    darkInset: string;
  };
  foreground: {
    light: string;
    lightMuted: string;
    lightSubtle: string;
    dark: string;
    darkMuted: string;
    darkSubtle: string;
  };
  interactive: {
    light: string;
    lightHover: string;
    dark: string;
    darkHover: string;
    focus: string;
  };
  error: {
    light: string;
    dark: string;
  };
  warning: {
    light: string;
    dark: string;
  };
  success: {
    light: string;
    dark: string;
  };
  info: {
    light: string;
    dark: string;
  };
  highlights: {
    violet: string;
    blue: string;
    blueSoft: string;
    terracottaStrong: string;
  };
}

// Normalized from official Claude/Anthropic references:
// 1) anthropics/skills "brand-guidelines" (main/accent/background/text anchors)
// 2) docs.anthropic.com design-guidelines CSS variables (light/dark UI + status colors)
export const brandTokens: BrandTokens = {
  primary: '#C96442',
  secondary: '#D97757',
  accent: '#CC785C',
  neutral: {
    paper: '#FAF9F5',
    parchment: '#F0EEE6',
    linen: '#EAE7DF',
    stone: '#D9D5CC',
    smoke: '#A9A39A',
    ash: '#8D877D',
    charcoal: '#6B665F',
    ink: '#1A1917',
  },
  background: {
    light: '#FAF9F5',
    lightRaised: '#F0EEE6',
    lightInset: '#EAE7DF',
    dark: '#141413',
    darkRaised: '#1A1917',
    darkInset: '#2B2A27',
  },
  foreground: {
    light: '#1A1917',
    lightMuted: '#6B665F',
    lightSubtle: '#8D877D',
    dark: '#EAE7DF',
    darkMuted: '#A9A39A',
    darkSubtle: '#6B665F',
  },
  interactive: {
    light: '#CC785C',
    lightHover: '#B85F3D',
    dark: '#D4967E',
    darkHover: '#E0AB96',
    focus: '#CC785C',
  },
  error: {
    light: '#A84B3A',
    dark: '#D47563',
  },
  warning: {
    light: '#8A6220',
    dark: '#E8C96B',
  },
  success: {
    light: '#2E7C4C',
    dark: '#9ACA86',
  },
  info: {
    light: '#207FDE',
    dark: '#61AAF2',
  },
  highlights: {
    violet: '#9B87F5',
    blue: '#207FDE',
    blueSoft: '#61AAF2',
    terracottaStrong: '#BF4D43',
  },
};

export interface SyntaxTokens {
  keyword: string;
  type: string;
  function: string;
  parameter: string;
  property: string;
  variable: string;
  constant: string;
  string: string;
  number: string;
  operator: string;
  comment: string;
  regexp: string;
  tag: string;
  attribute: string;
  decorator: string;
  punctuation: string;
  namespace: string;
}

export interface ClaudePalette {
  flavor: Flavor;
  type: 'light' | 'dark';
  chrome: 'neutral' | 'brand';
  highContrast: boolean;
  brand: BrandTokens;
  background: string;
  backgroundAlt: string;
  backgroundMuted: string;
  surface: string;
  surfaceHover: string;
  border: string;
  borderStrong: string;
  foreground: string;
  foregroundMuted: string;
  foregroundSubtle: string;
  accent: string;
  accentHover: string;
  syntax: SyntaxTokens;
  status: {
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  git: {
    added: string;
    modified: string;
    deleted: string;
  };
}

export interface AnsiColors {
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
}

export type Flavor =
  | 'dark'
  | 'dark-high-contrast'
  | 'dark-brand'
  | 'light'
  | 'light-high-contrast'
  | 'light-brand'
  | 'midnight'
  | 'dusk'
  | 'mono-dark'
  | 'mono-light';

const darkPalette: ClaudePalette = {
  flavor: 'dark',
  type: 'dark',
  chrome: 'neutral',
  highContrast: false,
  brand: brandTokens,
  background: brandTokens.background.dark,
  backgroundAlt: brandTokens.background.darkRaised,
  backgroundMuted: brandTokens.background.darkInset,
  surface: '#1F1D1A',
  surfaceHover: '#262420',
  border: '#4A473F',
  borderStrong: '#6B665F',
  foreground: brandTokens.foreground.dark,
  foregroundMuted: brandTokens.foreground.darkMuted,
  foregroundSubtle: brandTokens.foreground.darkSubtle,
  accent: brandTokens.interactive.dark,
  accentHover: brandTokens.interactive.darkHover,
  syntax: {
    keyword: '#E2A48B',
    type: '#AFCCF8',
    function: '#FFC1A6',
    parameter: '#F0CDBA',
    property: '#F6DDCD',
    variable: brandTokens.foreground.dark,
    constant: '#FFB19D',
    string: '#B5E6A0',
    number: '#F4DC90',
    operator: '#E2D8CC',
    comment: '#B8AFA3',
    regexp: '#FBE7AA',
    tag: '#D9645B',
    attribute: '#F6DFC7',
    decorator: brandTokens.highlights.violet,
    punctuation: '#C6BDB2',
    namespace: brandTokens.info.dark,
  },
  status: {
    error: brandTokens.error.dark,
    warning: brandTokens.warning.dark,
    success: brandTokens.success.dark,
    info: brandTokens.info.dark,
  },
  git: {
    added: brandTokens.success.dark,
    modified: brandTokens.warning.dark,
    deleted: brandTokens.error.dark,
  },
};

const darkHighContrastPalette: ClaudePalette = {
  flavor: 'dark-high-contrast',
  type: 'dark',
  chrome: 'neutral',
  highContrast: true,
  brand: brandTokens,
  background: '#11100F',
  backgroundAlt: '#161513',
  backgroundMuted: '#23201D',
  surface: '#1B1916',
  surfaceHover: '#23201D',
  border: '#6B665F',
  borderStrong: '#A9A39A',
  foreground: '#F5F2E9',
  foregroundMuted: '#D9D5CC',
  foregroundSubtle: '#B0AAA0',
  accent: '#E1A087',
  accentHover: '#E8B4A0',
  syntax: {
    keyword: '#F1B79E',
    type: '#C8DCFA',
    function: '#FFD0B8',
    parameter: '#F8D8C9',
    property: '#FFF5E9',
    variable: '#F5F2E9',
    constant: '#FFC1AD',
    string: '#C6F0B3',
    number: '#F8E5A8',
    operator: '#F0E8DC',
    comment: '#D1C8BB',
    regexp: '#FCEEBC',
    tag: '#FFB8A3',
    attribute: '#F9E3CC',
    decorator: '#C9BCFF',
    punctuation: '#E0D7CC',
    namespace: '#8CC4FF',
  },
  status: {
    error: '#F09884',
    warning: '#E8C96B',
    success: '#9ACA86',
    info: '#9EB7E2',
  },
  git: {
    added: '#9ACA86',
    modified: '#E8C96B',
    deleted: '#F09884',
  },
};

const lightPalette: ClaudePalette = {
  flavor: 'light',
  type: 'light',
  chrome: 'neutral',
  highContrast: false,
  brand: brandTokens,
  background: brandTokens.background.light,
  backgroundAlt: brandTokens.background.lightRaised,
  backgroundMuted: brandTokens.background.lightInset,
  surface: '#F3F1E9',
  surfaceHover: '#ECE9DF',
  border: '#D9D5CC',
  borderStrong: '#A9A39A',
  foreground: brandTokens.foreground.light,
  foregroundMuted: brandTokens.foreground.lightMuted,
  foregroundSubtle: brandTokens.foreground.lightSubtle,
  accent: brandTokens.interactive.light,
  accentHover: brandTokens.interactive.lightHover,
  syntax: {
    keyword: '#B84A2A',
    type: '#386290',
    function: '#AE4E30',
    parameter: '#AE6D53',
    property: '#3A6594',
    variable: '#1A1917',
    constant: '#BD5341',
    string: '#2D7F4D',
    number: '#946A1E',
    operator: '#6A645C',
    comment: '#6C655D',
    regexp: '#B07C26',
    tag: '#CC5E54',
    attribute: '#B46344',
    decorator: '#6A5BCC',
    punctuation: '#877C70',
    namespace: brandTokens.highlights.blue,
  },
  status: {
    error: brandTokens.error.light,
    warning: brandTokens.warning.light,
    success: brandTokens.success.light,
    info: brandTokens.info.light,
  },
  git: {
    added: brandTokens.success.light,
    modified: brandTokens.warning.light,
    deleted: brandTokens.error.light,
  },
};

const lightHighContrastPalette: ClaudePalette = {
  flavor: 'light-high-contrast',
  type: 'light',
  chrome: 'neutral',
  highContrast: true,
  brand: brandTokens,
  background: '#F6F3EA',
  backgroundAlt: '#EBE7DC',
  backgroundMuted: '#E1DDD1',
  surface: '#EFEBDD',
  surfaceHover: '#E4DECF',
  border: '#BDB6AA',
  borderStrong: '#8D877D',
  foreground: '#141413',
  foregroundMuted: '#4A473F',
  foregroundSubtle: '#6B665F',
  accent: '#B85F3D',
  accentHover: '#A65132',
  syntax: {
    keyword: '#A5472B',
    type: '#2E66A3',
    function: '#B14E2F',
    parameter: '#9E5F47',
    property: '#31608E',
    variable: '#141413',
    constant: '#AD4C39',
    string: '#2F7750',
    number: '#85611B',
    operator: '#4F4A43',
    comment: '#6A6359',
    regexp: '#9C6E20',
    tag: '#AD4C39',
    attribute: '#A95134',
    decorator: '#5B4DB4',
    punctuation: '#6A6359',
    namespace: '#1B6EBF',
  },
  status: {
    error: '#8F3C2D',
    warning: '#6B4F1B',
    success: '#2F6140',
    info: '#325B86',
  },
  git: {
    added: '#2F6140',
    modified: '#6B4F1B',
    deleted: '#8F3C2D',
  },
};

const darkBrandPalette: ClaudePalette = {
  ...darkPalette,
  flavor: 'dark-brand',
  chrome: 'brand',
  accent: brandTokens.primary,
  accentHover: '#BF5A39',
};

const lightBrandPalette: ClaudePalette = {
  ...lightPalette,
  flavor: 'light-brand',
  chrome: 'brand',
  accent: brandTokens.primary,
  accentHover: '#BF5A39',
};

const midnightPalette: ClaudePalette = {
  ...darkPalette,
  flavor: 'midnight',
  background: '#000000',
  backgroundAlt: '#0A0A09',
  backgroundMuted: '#1A1917',
  surface: '#121110',
  surfaceHover: '#1F1D1A',
  border: '#2B2A27',
  borderStrong: '#4A473F',
  foreground: '#EAE7DF',
  foregroundMuted: '#A9A39A',
  foregroundSubtle: '#6B665F',
  accent: '#D97757',
  accentHover: '#E58F72',
};

const duskPalette: ClaudePalette = {
  ...darkPalette,
  flavor: 'dusk',
  background: '#262624',
  backgroundAlt: '#1F1E1D',
  backgroundMuted: '#30302E',
  surface: '#2B2B29',
  surfaceHover: '#353532',
  border: '#3E3E38',
  borderStrong: '#5E5D57',
  foreground: '#F0EEE6',
  foregroundMuted: '#C2C0B6',
  foregroundSubtle: '#85837C',
  accent: '#D97757',
  accentHover: '#E08A6D',
  syntax: {
    ...darkPalette.syntax,
    comment: '#9C9A92',
    punctuation: '#B5B2A8',
    operator: '#D6D0C4',
  },
};

const monoDarkPalette: ClaudePalette = {
  ...darkPalette,
  flavor: 'mono-dark',
  accent: '#D97757',
  accentHover: '#E58F72',
  syntax: {
    ...darkPalette.syntax,
    keyword: '#D97757',
    tag: '#D97757',
    function: '#F5F2E9',
    type: '#EAE7DF',
    variable: '#D9D5CC',
    parameter: '#D9D5CC',
    property: '#C9C4BA',
    namespace: '#C9C4BA',
    string: '#D4A27F',
    attribute: '#D4A27F',
    decorator: '#D4A27F',
    constant: '#EBDBBC',
    number: '#EBDBBC',
    regexp: '#EBDBBC',
    operator: '#A9A39A',
    punctuation: '#8D877D',
    comment: '#8D877D',
  },
};

const monoLightPalette: ClaudePalette = {
  ...lightPalette,
  flavor: 'mono-light',
  accent: '#CC785C',
  syntax: {
    ...lightPalette.syntax,
    keyword: '#AE4E30',
    tag: '#AE4E30',
    function: '#141413',
    type: '#1A1917',
    variable: '#2B2A27',
    parameter: '#3A3833',
    property: '#4A473F',
    namespace: '#4A473F',
    string: '#8A6220',
    attribute: '#8A6220',
    decorator: '#8A6220',
    constant: '#6B4F1B',
    number: '#6B4F1B',
    regexp: '#6B4F1B',
    operator: '#6B665F',
    punctuation: '#6E6962',
    comment: '#6E6962',
  },
};

const darkAnsi: { normal: AnsiColors; bright: AnsiColors } = {
  normal: {
    black: '#1A1917',
    red: brandTokens.error.dark,
    green: brandTokens.success.dark,
    yellow: brandTokens.warning.dark,
    blue: brandTokens.highlights.blueSoft,
    magenta: brandTokens.highlights.violet,
    cyan: '#8CC4FF',
    white: '#D9D5CC',
  },
  bright: {
    black: '#6B665F',
    red: '#F09884',
    green: '#B6E0A5',
    yellow: '#F2D98F',
    blue: '#A2D2FF',
    magenta: '#C9BCFF',
    cyan: '#BDE0FF',
    white: '#F5F2E9',
  },
};

const darkHighContrastAnsi: { normal: AnsiColors; bright: AnsiColors } = {
  normal: {
    black: '#151311',
    red: '#F09884',
    green: '#B6E0A5',
    yellow: '#F2D98F',
    blue: '#8CC4FF',
    magenta: '#C9BCFF',
    cyan: '#B2D8FF',
    white: '#E0DBD0',
  },
  bright: {
    black: '#6B665F',
    red: '#FFB4A4',
    green: '#B6E0A5',
    yellow: '#F2D98F',
    blue: '#BED0ED',
    magenta: '#DCC6FF',
    cyan: '#C5EAFF',
    white: '#F5F2E9',
  },
};

const lightAnsi: { normal: AnsiColors; bright: AnsiColors } = {
  normal: {
    black: '#1A1917',
    red: brandTokens.error.light,
    green: brandTokens.success.light,
    yellow: brandTokens.warning.light,
    blue: brandTokens.highlights.blue,
    magenta: '#6A5BCC',
    cyan: '#2E5F99',
    white: '#746E64',
  },
  bright: {
    black: '#8D877D',
    red: '#C45F4A',
    green: '#5E8F6D',
    yellow: '#9C7A39',
    blue: '#4F79A8',
    magenta: '#6D5DBD',
    cyan: '#45809E',
    white: '#4A473F',
  },
};

const lightHighContrastAnsi: { normal: AnsiColors; bright: AnsiColors } = {
  normal: {
    black: '#141413',
    red: '#8F3C2D',
    green: '#286945',
    yellow: '#775618',
    blue: '#1B6EBF',
    magenta: '#5B4DB4',
    cyan: '#27598F',
    white: '#6B665F',
  },
  bright: {
    black: '#8D877D',
    red: '#A44E3A',
    green: '#437954',
    yellow: '#826326',
    blue: '#4B7098',
    magenta: '#5D538F',
    cyan: '#3F738C',
    white: '#4A473F',
  },
};

const midnightAnsi: { normal: AnsiColors; bright: AnsiColors } = {
  ...darkAnsi,
  normal: { ...darkAnsi.normal, black: '#2B2A27' },
};

const duskAnsi: { normal: AnsiColors; bright: AnsiColors } = {
  normal: { ...darkAnsi.normal, black: '#30302E' },
  bright: { ...darkAnsi.bright, black: '#746E67' },
};

export const palettes: Record<Flavor, ClaudePalette> = {
  dark: darkPalette,
  'dark-high-contrast': darkHighContrastPalette,
  'dark-brand': darkBrandPalette,
  light: lightPalette,
  'light-high-contrast': lightHighContrastPalette,
  'light-brand': lightBrandPalette,
  midnight: midnightPalette,
  dusk: duskPalette,
  'mono-dark': monoDarkPalette,
  'mono-light': monoLightPalette,
};

export const ansiPalettes: Record<Flavor, { normal: AnsiColors; bright: AnsiColors }> = {
  dark: darkAnsi,
  'dark-high-contrast': darkHighContrastAnsi,
  'dark-brand': darkAnsi,
  light: lightAnsi,
  'light-high-contrast': lightHighContrastAnsi,
  'light-brand': lightAnsi,
  midnight: midnightAnsi,
  dusk: duskAnsi,
  'mono-dark': darkAnsi,
  'mono-light': lightAnsi,
};
