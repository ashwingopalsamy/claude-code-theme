# Claude Code Theme

[![CI](https://github.com/ashwingopalsamy/claude-code-theme/actions/workflows/ci.yml/badge.svg)](https://github.com/ashwingopalsamy/claude-code-theme/actions/workflows/ci.yml)

Independent VS Code theme extension inspired by Claude/Anthropic visual language, with semantic token discipline, full workbench coverage, and WCAG-oriented validation.

- Maintainer: Ashwin Gopalsamy
- Repository: https://github.com/ashwingopalsamy/claude-code-theme

## Theme Set

This extension ships four variants:

1. Claude Code Dark
2. Claude Code Dark High Contrast
3. Claude Code Light
4. Claude Code Light High Contrast

## Design Goals

- semantic meaning over decorative color noise
- stable role hierarchy across languages
- warm, low-glare backgrounds for long sessions
- explicit accessibility checks in development/CI
- independent implementation, not a copied fork

This project is independent and not affiliated with Anthropic.

## Color System

The palette is token-first and documented in `/docs/brand-tokens.md`.

Reference inputs include:

- Anthropic brand-guidelines skill:
  - https://raw.githubusercontent.com/anthropics/skills/main/skills/brand-guidelines/SKILL.md
- Anthropic identity case study:
  - https://geist.co/work/anthropic

## Installation

### Install from source VSIX

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm package
code --install-extension ./claude-code-theme-0.1.0.vsix --force
```

### Activate in VS Code

1. Open Command Palette.
2. Run `Preferences: Color Theme`.
3. Select one of the `Claude Code ...` variants.

## Development

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm package
```

## Accessibility Snapshot

Latest local contrast run (`February 10, 2026`) via `pnpm contrast`:

| Theme | Editor text | Comment | Keyword | String |
| --- | --- | --- | --- | --- |
| Claude Code Dark | 14.92 | 8.51 | 8.70 | 12.98 |
| Claude Code Dark High Contrast | 16.98 | 11.49 | 10.87 | 14.95 |
| Claude Code Light | 16.68 | 5.45 | 4.92 | 4.69 |
| Claude Code Light High Contrast | 16.61 | 5.34 | 5.35 | 4.88 |

## Repository Layout

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── docs/
│   └── brand-tokens.md
├── scripts/
│   └── contrast-report.ts
├── src/
│   └── theme/
├── themes/
│   ├── claude-code-dark.json
│   ├── claude-code-dark-high-contrast.json
│   ├── claude-code-light.json
│   └── claude-code-light-high-contrast.json
├── CONTRIBUTING.md
├── SECURITY.md
└── SUPPORT.md
```

## Project Standards

This repository follows an OpenAI/Anthropic-style open-source baseline:

- structured issue templates and PR template
- CI workflow that validates build, compile, contrast, and packaging
- explicit contribution and security policy docs
- reproducible release packaging via `pnpm package`

## Contributing

See `/CONTRIBUTING.md`.

## Security

See `/SECURITY.md`.

## Support

See `/SUPPORT.md`.

## License

MIT
