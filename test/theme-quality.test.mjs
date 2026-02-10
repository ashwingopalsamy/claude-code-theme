import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

const themeFiles = {
  dark: 'claude-code-dark.json',
  'dark-high-contrast': 'claude-code-dark-high-contrast.json',
  light: 'claude-code-light.json',
  'light-high-contrast': 'claude-code-light-high-contrast.json',
};

const requiredWorkbenchKeys = [
  'contrastBorder',
  'contrastActiveBorder',
  'widget.border',
  'selection.background',
  'sash.hoverBorder',
  'button.border',
  'button.secondaryBorder',
  'checkbox.background',
  'checkbox.foreground',
  'checkbox.border',
  'radio.activeForeground',
  'dropdown.listBackground',
  'inputOption.hoverBackground',
  'inputValidation.errorForeground',
  'inputValidation.warningForeground',
  'inputValidation.infoForeground',
  'scrollbar.background',
  'scrollbar.shadow',
  'list.activeSelectionIconForeground',
  'list.inactiveSelectionIconForeground',
  'list.focusOutline',
  'list.inactiveFocusOutline',
  'list.dropBackground',
  'list.focusAndSelectionOutline',
  'list.filterMatchBackground',
  'list.filterMatchBorder',
  'editorLineNumber.dimmedForeground',
  'editorMultiCursor.primary.foreground',
  'editorMultiCursor.primary.background',
  'editorMultiCursor.secondary.foreground',
  'editorMultiCursor.secondary.background',
  'editor.selectionForeground',
  'editor.findMatchBorder',
  'editor.findMatchHighlightBorder',
  'editor.selectionHighlightBorder',
  'editor.stackFrameHighlightBackground',
  'editor.focusedStackFrameHighlightBackground',
  'editor.linkedEditingBackground',
  'editorUnicodeHighlight.background',
  'editorUnicodeHighlight.border',
  'peekViewEditor.matchHighlightBackground',
  'peekViewResult.selectionBackground',
  'peekViewResult.selectionForeground',
  'peekViewEditor.matchHighlightBorder',
  'panel.dropBorder',
  'panelSection.border',
  'panelSection.dropBackground',
  'panelSectionHeader.background',
  'statusBarItem.remoteBackground',
  'statusBarItem.remoteForeground',
  'statusBarItem.errorBackground',
  'statusBarItem.warningBackground',
  'statusBar.focusBorder',
  'tab.activeBorder',
  'tab.activeModifiedBorder',
  'tab.unfocusedActiveBorder',
  'tab.lastPinnedBorder',
  'tab.selectedForeground',
  'tab.selectedBorderTop',
  'tab.unfocusedInactiveModifiedBorder',
  'editorGroup.dropBackground',
  'editorGroupHeader.noTabsBackground',
  'menu.selectionBorder',
  'commandCenter.border',
  'commandCenter.activeBorder',
  'notificationLink.foreground',
  'activityBar.activeFocusBorder',
  'activityBarTop.foreground',
  'activityBarTop.activeBorder',
  'activityBarTop.dropBorder',
  'sideBar.dropBackground',
  'terminal.border',
  'terminal.selectionBackground',
  'terminal.selectionForeground',
  'terminal.dropBackground',
  'terminal.tab.activeBorder',
  'terminalCommandDecoration.defaultBackground',
  'terminalCommandDecoration.successBackground',
  'terminalCommandDecoration.errorBackground',
  'terminalOverviewRuler.cursorForeground',
  'terminalStickyScroll.background',
  'chat.requestBorder',
  'chat.requestBackground',
  'chat.requestBubbleBackground',
  'chat.slashCommandBackground',
  'chat.avatarBackground',
  'chat.linesAddedForeground',
  'chat.linesRemovedForeground',
  'inlineChat.background',
  'inlineChat.border',
  'inlineChatInput.background',
  'inlineChatInput.border',
  'inlineChatDiff.inserted',
  'inlineChatDiff.removed',
  'interactive.activeCodeBorder',
  'interactive.inactiveCodeBorder',
  'mergeEditor.change.word.background',
  'mergeEditor.conflict.unhandledFocused.border',
  'mergeEditor.conflict.input1.background',
  'mergeEditor.conflict.input2.background',
  'notebook.cellBorderColor',
  'notebook.cellHoverBackground',
  'notebookStatusSuccessIcon.foreground',
  'notebookStatusErrorIcon.foreground',
  'debugToolBar.background',
  'debugExceptionWidget.background',
  'debugTokenExpression.name',
  'testing.runAction',
  'testing.iconFailed',
  'testing.iconPassed',
  'testing.iconErrored',
  'testing.peekBorder',
  'testing.coveredBackground',
  'editorGhostText.foreground',
  'editorGhostText.background',
  'editorInlayHint.foreground',
  'editorInlayHint.background',
  'editorStickyScroll.background',
  'editorStickyScrollHover.background',
  'editorOverviewRuler.bracketMatchForeground',
  'editorOverviewRuler.findMatchForeground',
];

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 8 ? normalized.slice(0, 6) : normalized;
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function channelToLinear(value) {
  const normalized = value / 255;
  if (normalized <= 0.03928) {
    return normalized / 12.92;
  }
  return Math.pow((normalized + 0.055) / 1.055, 2.4);
}

function luminance(color) {
  const [r, g, b] = hexToRgb(color);
  return (
    (0.2126 * channelToLinear(r)) +
    (0.7152 * channelToLinear(g)) +
    (0.0722 * channelToLinear(b))
  );
}

function contrastRatio(foreground, background) {
  const fg = luminance(foreground);
  const bg = luminance(background);
  const light = Math.max(fg, bg);
  const dark = Math.min(fg, bg);
  return (light + 0.05) / (dark + 0.05);
}

function hue(color) {
  const [rRaw, gRaw, bRaw] = hexToRgb(color);
  const r = rRaw / 255;
  const g = gRaw / 255;
  const b = bRaw / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) {
    return 0;
  }

  let value = 0;

  if (max === r) {
    value = ((g - b) / delta) % 6;
  } else if (max === g) {
    value = ((b - r) / delta) + 2;
  } else {
    value = ((r - g) / delta) + 4;
  }

  const degrees = value * 60;
  return degrees < 0 ? degrees + 360 : degrees;
}

function hueDistance(first, second) {
  const difference = Math.abs(hue(first) - hue(second));
  return Math.min(difference, 360 - difference);
}

for (const [variant, file] of Object.entries(themeFiles)) {
  const filePath = join(root, 'themes', file);
  const theme = JSON.parse(readFileSync(filePath, 'utf8'));
  const colors = theme.colors;

  assert.ok(colors, `${variant}: missing colors map`);

  for (const key of requiredWorkbenchKeys) {
    assert.ok(key in colors, `${variant}: missing workbench color "${key}"`);
  }

  assert.ok(Object.keys(colors).length >= 300, `${variant}: expected at least 300 workbench colors`);
  assert.ok(theme.tokenColors.length >= 81, `${variant}: expected at least 81 TextMate token rules`);
  assert.ok(Object.keys(theme.semanticTokenColors).length >= 37, `${variant}: expected at least 37 semantic token rules`);

  const terminalBackground = colors['terminal.background'];
  const ansiWhite = colors['terminal.ansiWhite'];
  const ansiBrightWhite = colors['terminal.ansiBrightWhite'];
  const ansiBrightBlack = colors['terminal.ansiBrightBlack'];
  const minimumWhiteContrast = variant.startsWith('light') ? 4.5 : 7;
  const minimumBrightWhiteContrast = variant.startsWith('light') ? 7 : 10;

  assert.ok(
    contrastRatio(ansiWhite, terminalBackground) >= minimumWhiteContrast,
    `${variant}: ANSI white contrast is too low`
  );
  assert.ok(
    contrastRatio(ansiBrightWhite, terminalBackground) >= minimumBrightWhiteContrast,
    `${variant}: ANSI bright white contrast is too low`
  );
  assert.ok(
    contrastRatio(ansiBrightBlack, terminalBackground) >= 3,
    `${variant}: ANSI bright black contrast is too low`
  );

  const brightDistance = hueDistance(colors['terminal.ansiBrightMagenta'], colors['terminal.ansiBrightCyan']);
  assert.ok(brightDistance >= 20, `${variant}: ANSI bright magenta/cyan hues are too close`);
}

console.log('Theme quality assertions passed.');
