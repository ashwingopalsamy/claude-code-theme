# Claude Code Theme

A code theme system for VS Code, designed for clarity, endurance, and semantic meaning.

Maintainer: Ashwin Gopalsamy  
Canonical repository: https://github.com/ashwingopalsamy/claude-code-theme

## Inspiration and Credit

This project is respectfully inspired by [claude-vscode-theme](https://github.com/alvinunreal/awesome-claude/tree/main/claude-vscode-theme).

What changed here:
- formalized Claude/Anthropic brand tokens as first-class inputs
- added light themes built from first principles (not dark inversion)
- rebuilt syntax and semantic mappings around token roles
- expanded UI parity across dark/light/high-contrast variants

This project is independent and not affiliated with Anthropic.

## Theme Lineup

| Theme | Type | Notes |
| --- | --- | --- |
| Claude Code Dark | Dark | Baseline dark theme for daily use |
| Claude Code Dark Italic | Dark | Same palette, selective italic emphasis |
| Claude Code Dark High Contrast | Dark | Higher separation for low-visibility setups |
| Claude Code Light | Light | Warm paper-like light theme |
| Claude Code Light Italic | Light | Light theme with selective italics |
| Claude Code Light High Contrast | Light | Stronger contrast while staying warm |

## Design Philosophy

- Semantic meaning over decoration
- Hierarchy through controlled contrast, not saturation noise
- Long-session comfort over novelty
- Consistent token roles across languages
- UI should support code, not compete with it

## Claude Brand Alignment

The palette system is normalized from official Claude/Anthropic-owned references.

Token model:
- `primary`
- `secondary`
- `accent`
- `neutral`
- `background`
- `foreground`
- `interactive`
- `error`
- `warning`
- `success`

See `/docs/brand-tokens.md` for source links and exact values.

## Dark vs Light Intent

Dark themes:
- warm low-glare backgrounds
- restrained accents for semantic differentiation
- high-contrast variant increases separation without neon color

Light themes:
- warm paper neutrals (no pure white editor background)
- reduced saturation except for semantic emphasis
- comments remain recessed but readable in long daylight sessions

## Accessibility

- WCAG 2.1 AA baseline across core code/text roles
- AAA targeted for editor foreground where feasible
- contrast checks are script-validated in CI/local workflows

Run the report:

```bash
pnpm contrast
```

Latest local report (`February 10, 2026`):

| Theme | Editor text | Comment | Keyword | String |
| --- | --- | --- | --- | --- |
| Claude Code Dark | 14.92 | 6.79 | 7.43 | 9.80 |
| Claude Code Dark High Contrast | 16.98 | 10.02 | 9.81 | 12.85 |
| Claude Code Light | 16.68 | 6.49 | 4.91 | 4.86 |
| Claude Code Light High Contrast | 16.61 | 6.24 | 6.36 | 5.92 |

## Language and Token Coverage

Explicitly tuned for:
- Go
- TypeScript / JavaScript
- Python
- Java
- Rust
- HTML / CSS
- JSON / YAML
- Markdown
- SQL

Coverage includes:
- TextMate scopes
- semantic tokens
- semantic modifiers (`readonly`, `deprecated`, `async`, `declaration`, `static`)
- selective italic usage only in italic variants

## Repository Structure

```text
.
├── build.ts
├── scripts/
│   └── contrast-report.ts
├── src/
│   └── theme/
│       ├── index.ts
│       ├── palette.ts
│       ├── semanticTokens.ts
│       ├── tokenColors.ts
│       ├── tokens/
│       │   └── index.ts
│       └── uiColors.ts
├── themes/
│   ├── claude-code-dark.json
│   ├── claude-code-dark-italic.json
│   ├── claude-code-dark-high-contrast.json
│   ├── claude-code-light.json
│   ├── claude-code-light-italic.json
│   └── claude-code-light-high-contrast.json
└── docs/
    └── brand-tokens.md
```

## Screenshot Placeholders

- Dark theme screenshot placeholder: `assets/screenshot-dark-placeholder.svg`
- Light theme screenshot placeholder: `assets/screenshot-light-placeholder.svg`

## Development

```bash
pnpm install
pnpm build
pnpm compile
pnpm contrast
```

## Contributing

1. Open an issue before large theme-direction changes.
2. Keep changes role-first: token intent before scope patching.
3. Add or update contrast checks when changing palette values.
4. Use Conventional Commits.
5. Keep pull requests focused and reviewable.

## Roadmap

- Add snapshot-based visual regression checks for the six bundled themes.
- Add test fixtures for each explicitly supported language.
- Publish JetBrains port after token-role parity is validated.
- Add optional low-contrast mode for projection environments.

## License

MIT
