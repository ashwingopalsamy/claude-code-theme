#!/usr/bin/env tsx

import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { compileTheme, defaultOptions, italicOptions } from './src/theme';
import type { ThemeVariant } from './src/theme/palette';
import type { ThemeOptions } from './src/types';

interface BuildTarget {
  variant: ThemeVariant;
  options: ThemeOptions;
  filename: string;
}

const targets: BuildTarget[] = [
  {
    variant: 'dark',
    options: defaultOptions,
    filename: 'claude-code-dark.json',
  },
  {
    variant: 'dark',
    options: italicOptions,
    filename: 'claude-code-dark-italic.json',
  },
  {
    variant: 'dark-high-contrast',
    options: defaultOptions,
    filename: 'claude-code-dark-high-contrast.json',
  },
  {
    variant: 'light',
    options: defaultOptions,
    filename: 'claude-code-light.json',
  },
  {
    variant: 'light',
    options: italicOptions,
    filename: 'claude-code-light-italic.json',
  },
  {
    variant: 'light-high-contrast',
    options: defaultOptions,
    filename: 'claude-code-light-high-contrast.json',
  },
];

async function generateThemes() {
  const themesDir = join(process.cwd(), 'themes');
  await mkdir(themesDir, { recursive: true });

  console.log('Generating Claude Code Theme variants...');

  for (const target of targets) {
    const theme = compileTheme(target.variant, target.options);
    const destination = join(themesDir, target.filename);

    await writeFile(destination, JSON.stringify(theme, null, 2));
    console.log(`Built ${target.filename}`);
  }

  console.log('Theme build complete.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateThemes().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

export default generateThemes;
