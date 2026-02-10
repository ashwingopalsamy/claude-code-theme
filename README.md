# Claude Code Theme

[![CI](https://github.com/ashwingopalsamy/claude-code-theme/actions/workflows/ci.yml/badge.svg)](https://github.com/ashwingopalsamy/claude-code-theme/actions/workflows/ci.yml)
[![Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/ashwingopalsamy.claude-code-theme?label=Marketplace)](https://marketplace.visualstudio.com/items?itemName=ashwingopalsamy.claude-code-theme)
[![Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/ashwingopalsamy.claude-code-theme)](https://marketplace.visualstudio.com/items?itemName=ashwingopalsamy.claude-code-theme)

Claude-inspired VS Code themes built for high legibility and long coding sessions.

- Maintainer: Ashwin Gopalsamy
- Repository: https://github.com/ashwingopalsamy/claude-code-theme
- Marketplace: https://marketplace.visualstudio.com/items?itemName=ashwingopalsamy.claude-code-theme

## Install (VS Code Marketplace)

Install directly from the Extensions panel:

1. Open Extensions (`Ctrl/Cmd+Shift+X`).
2. Search for `Claude Code Theme`.
3. Install the extension from publisher `ashwingopalsamy`.

Or install from CLI:

```bash
code --install-extension ashwingopalsamy.claude-code-theme
```

No VSIX file is required for normal installation.

## Theme Variants

This extension ships four variants:

1. Claude Code Dark
2. Claude Code Dark High Contrast
3. Claude Code Light
4. Claude Code Light High Contrast

| Variant | Best for |
| --- | --- |
| Claude Code Dark | Everyday coding with balanced contrast |
| Claude Code Dark High Contrast | Maximum separation on dark backgrounds |
| Claude Code Light | Warm daytime coding without white glare |
| Claude Code Light High Contrast | Strong contrast in bright environments |

Activate a theme:

1. Open Command Palette.
2. Run `Preferences: Color Theme`.
3. Pick any `Claude Code ...` variant.

## Why This Theme Feels Better

- Brighter syntax where it matters, without neon glare.
- Clearer JSON, Markdown, and Go token separation.
- Semantic + TextMate hierarchy tuned for readability, not noise.
- Full workbench theming for consistent UI/context contrast.
- WCAG-oriented checks are part of development and CI.

Language tuning highlights:

- JSON: keys, strings, numbers, and punctuation are easier to scan at a glance.
- Markdown: headings, emphasis, code spans, and links are visually distinct.
- Go: declarations, types, methods, constants, and structs separate cleanly.

## Accessibility Snapshot

Latest local contrast run (`February 10, 2026`) via `pnpm contrast`:

| Theme | Editor text | Comment | Keyword | String |
| --- | --- | --- | --- | --- |
| Claude Code Dark | 14.92 | 8.51 | 8.70 | 12.98 |
| Claude Code Dark High Contrast | 16.98 | 11.49 | 10.87 | 14.95 |
| Claude Code Light | 16.68 | 5.45 | 4.92 | 4.69 |
| Claude Code Light High Contrast | 16.61 | 5.34 | 5.35 | 4.88 |

## Design System Inputs

Color references are documented in `docs/brand-tokens.md`.

Primary source references:

- Anthropic brand-guidelines skill text:
  - https://raw.githubusercontent.com/anthropics/skills/main/skills/brand-guidelines/SKILL.md
- Anthropic identity case study:
  - https://geist.co/work/anthropic

This project is independent and not affiliated with Anthropic.

## Development

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm package
```

## Marketplace Publishing (Maintainers)

One-time setup:

1. Create/verify the publisher at https://marketplace.visualstudio.com/manage/publishers/
2. Generate a Marketplace Personal Access Token with `Marketplace (Manage)` scope.
3. Add token as GitHub repository secret: `VSCE_PAT`.

Release flow:

1. Bump `version` in `package.json`.
2. Run `pnpm check` locally.
3. Create and push a matching tag (example: `v0.1.1`).

```bash
git tag v0.1.1
git push origin v0.1.1
```

Tag push triggers `.github/workflows/publish.yml`, which validates, packages, and publishes to Marketplace.

Manual fallback:

```bash
pnpm exec vsce publish --pat "$VSCE_PAT"
```

## Contributing

See `CONTRIBUTING.md`.

## Security

See `SECURITY.md`.

## Support

See `SUPPORT.md`.

## License

MIT
