# Brand Token Normalization

This file defines the canonical Claude/Anthropic token inputs used by the theme engine.

## Sources

Official references used:
- Anthropic `brand-guidelines` [skill text](https://raw.githubusercontent.com/anthropics/skills/main/skills/brand-guidelines/SKILL.md) (main/accent/background/text anchors).
- Anthropic [visual identity case study reference](https://geist.co/work/anthropic):
  - primary swatches: `#D97757`, `#CC785C`, `#D4A27F`, `#EBDBBC`
  - highlight swatches: `#9B87F5`, `#207FDE`, `#61AAF2`
  - neutral swatches: `#191919`, `#262625`, `#40403E`, `#666663`, `#91918D`, `#BFBFBA`, `#E5E4DF`, `#F0F0EB`, `#FAFAF7`

## Normalized Tokens

```yaml
brandTokens:
  primary: "#C96442"
  secondary: "#D97757"
  accent: "#CC785C"
  neutral:
    paper: "#FAF9F5"
    parchment: "#F0EEE6"
    linen: "#EAE7DF"
    stone: "#D9D5CC"
    smoke: "#A9A39A"
    ash: "#8D877D"
    charcoal: "#6B665F"
    ink: "#1A1917"
  background:
    light: "#FAF9F5"
    lightRaised: "#F0EEE6"
    lightInset: "#EAE7DF"
    dark: "#141413"
    darkRaised: "#1A1917"
    darkInset: "#2B2A27"
  foreground:
    light: "#1A1917"
    lightMuted: "#6B665F"
    lightSubtle: "#8D877D"
    dark: "#EAE7DF"
    darkMuted: "#A9A39A"
    darkSubtle: "#6B665F"
  interactive:
    light: "#CC785C"
    lightHover: "#B85F3D"
    dark: "#D4967E"
    darkHover: "#E0AB96"
    focus: "#CC785C"
  error:
    light: "#A84B3A"
    dark: "#D47563"
  warning:
    light: "#8A6220"
    dark: "#E8C96B"
  success:
    light: "#2E7C4C"
    dark: "#9ACA86"
  info:
    light: "#207FDE"
    dark: "#61AAF2"
  highlights:
    violet: "#9B87F5"
    blue: "#207FDE"
    blueSoft: "#61AAF2"
    terracottaStrong: "#BF4D43"
```

## Deviation Policy

When theme values deviate from base tokens, the only acceptable reasons are:
- contrast correction to meet WCAG targets
- dark/light context adaptation where the same token fails ergonomically
- UI layering needs (borders, surfaces, hover states) that preserve token intent

No decorative hues are introduced without semantic intent.
