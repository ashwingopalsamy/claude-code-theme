# Contributing

Thanks for contributing to `claude-code-theme`.

## Development Setup

This project uses Node 20+ and pnpm.

```bash
pnpm install --frozen-lockfile
pnpm check
```

## Repository Standards

Changes should follow the same discipline used by official OpenAI and Anthropic OSS repositories:

- clear, scoped pull requests
- reproducible local validation commands
- issue templates for bugs and feature requests
- CI-backed build and quality checks

## Change Guidelines

1. Keep changes role-first.
   - Adjust token intent before adding narrow scope overrides.
2. Preserve accessibility.
   - Run `pnpm contrast` for any color/palette changes.
3. Keep variant behavior consistent.
   - Dark/light/high-contrast should remain semantically aligned.
4. Update docs with behavior changes.
   - Especially `README.md` and `docs/brand-tokens.md`.
5. Use Conventional Commits.

Examples:

- `feat(theme): improve markdown token hierarchy`
- `fix(a11y): increase contrast for light theme strings`
- `docs(readme): clarify installation and activation`

## Pull Request Checklist

Before opening a PR:

- [ ] `pnpm build` passes
- [ ] `pnpm compile` passes
- [ ] `pnpm contrast` passes
- [ ] `pnpm test:theme` passes
- [ ] `pnpm package` succeeds
- [ ] Docs are updated when behavior changes

## Scope Exclusions

This repository is for the VS Code theme extension.

- API/model behavior requests belong upstream.
- Anthropic/OpenAI product bugs should be filed through their official channels.
