#!/usr/bin/env tsx

import { mkdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { compileTheme, defaultOptions } from './src/theme';
import type { Flavor } from './src/theme/palette';

type UiTheme = 'vs' | 'vs-dark' | 'hc-black' | 'hc-light';

const flavors: { flavor: Flavor; label: string; uiTheme: UiTheme }[] = [
  { flavor: 'dark', label: 'Claude Code Dark', uiTheme: 'vs-dark' },
  { flavor: 'dark-high-contrast', label: 'Claude Code Dark High Contrast', uiTheme: 'hc-black' },
  { flavor: 'dark-brand', label: 'Claude Code Dark Brand', uiTheme: 'vs-dark' },
  { flavor: 'light', label: 'Claude Code Light', uiTheme: 'vs' },
  { flavor: 'light-high-contrast', label: 'Claude Code Light High Contrast', uiTheme: 'hc-light' },
  { flavor: 'light-brand', label: 'Claude Code Light Brand', uiTheme: 'vs' },
  { flavor: 'midnight', label: 'Claude Code Midnight', uiTheme: 'vs-dark' },
  { flavor: 'dusk', label: 'Claude Code Dusk', uiTheme: 'vs-dark' },
  { flavor: 'mono-dark', label: 'Claude Code Mono Dark', uiTheme: 'vs-dark' },
  { flavor: 'mono-light', label: 'Claude Code Mono Light', uiTheme: 'vs' },
];

const weights = [
  { suffix: '', labelSuffix: '', emphasizeDeclarations: true },
  { suffix: '-no-bold', labelSuffix: ' (No Bold)', emphasizeDeclarations: false },
];

async function generateThemes() {
  const themesDir = join(process.cwd(), 'themes');
  await mkdir(themesDir, { recursive: true });

  console.log('Generating Claude Code Theme variants...');

  const contributes: { label: string; uiTheme: UiTheme; path: string }[] = [];

  for (const weight of weights) {
    for (const { flavor, label, uiTheme } of flavors) {
      const filename = `claude-code-${flavor}${weight.suffix}.json`;
      const themeLabel = `${label}${weight.labelSuffix}`;
      const theme = compileTheme(
        flavor,
        { ...defaultOptions, emphasizeDeclarations: weight.emphasizeDeclarations },
        themeLabel
      );

      await writeFile(join(themesDir, filename), JSON.stringify(theme, null, 2));
      console.log(`Built ${filename}`);
      contributes.push({ label: themeLabel, uiTheme, path: `./themes/${filename}` });
    }
  }

  const packagePath = join(process.cwd(), 'package.json');
  const pkg = JSON.parse(await readFile(packagePath, 'utf8'));
  pkg.contributes.themes = contributes;
  await writeFile(packagePath, JSON.stringify(pkg, null, 2) + '\n');

  console.log('Theme build complete.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateThemes().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

export default generateThemes;
