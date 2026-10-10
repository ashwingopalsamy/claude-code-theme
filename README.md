<p align="center"><img src="./logo.png" width="96" alt="Claude Code Theme logo"></p>
<h1 align="center">Claude Code Theme</h1>
<p align="center">warm, calm themes for long sessions with claude.<br>10 flavors · bold or no-bold · VS Code, Cursor, Windsurf</p>
<p align="center"><a href="https://github.com/ashwingopalsamy/claude-code-theme/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/ashwingopalsamy/claude-code-theme/actions/workflows/ci.yml/badge.svg"></a> <a href="https://marketplace.visualstudio.com/items?itemName=ashwingopalsamy.claude-code-theme"><img alt="Marketplace Version" src="https://img.shields.io/visual-studio-marketplace/v/ashwingopalsamy.claude-code-theme?label=Marketplace"></a> <a href="https://marketplace.visualstudio.com/items?itemName=ashwingopalsamy.claude-code-theme"><img alt="Marketplace Installs" src="https://img.shields.io/visual-studio-marketplace/i/ashwingopalsamy.claude-code-theme"></a> <a href="https://open-vsx.org/extension/ashwingopalsamy/claude-code-theme"><img alt="Open VSX Version" src="https://img.shields.io/open-vsx/v/ashwingopalsamy/claude-code-theme?label=Open%20VSX"></a> <a href="https://open-vsx.org/extension/ashwingopalsamy/claude-code-theme"><img alt="Open VSX Downloads" src="https://img.shields.io/open-vsx/dt/ashwingopalsamy/claude-code-theme"></a></p>

<p align="center"><img src="./assets/hero.png" alt="Claude Code Theme flavors"></p>

## flavors

<table align="center">
  <tr>
    <td align="center"><img src="./assets/shots/dark.png" alt="Dark"><br><b>Dark</b> · the default. ink + clay</td>
    <td align="center"><img src="./assets/shots/light.png" alt="Light"><br><b>Light</b> · ivory paper</td>
  </tr>
  <tr>
    <td align="center"><img src="./assets/shots/midnight.png" alt="Midnight"><br><b>Midnight</b> · true black, for OLED</td>
    <td align="center"><img src="./assets/shots/dusk.png" alt="Dusk"><br><b>Dusk</b> · claude.ai after dark</td>
  </tr>
  <tr>
    <td align="center"><img src="./assets/shots/mono-dark.png" alt="Mono Dark"><br><b>Mono Dark</b> · focus mode. less noise</td>
    <td align="center"><img src="./assets/shots/mono-light.png" alt="Mono Light"><br><b>Mono Light</b> · focus mode, daylight</td>
  </tr>
  <tr>
    <td align="center"><img src="./assets/shots/dark-brand.png" alt="Dark Brand"><br><b>Dark Brand</b> · clay chrome</td>
    <td align="center"><img src="./assets/shots/light-brand.png" alt="Light Brand"><br><b>Light Brand</b> · clay chrome, light</td>
  </tr>
  <tr>
    <td align="center"><img src="./assets/shots/dark-high-contrast.png" alt="Dark High Contrast"><br><b>Dark High Contrast</b> · max legibility</td>
    <td align="center"><img src="./assets/shots/light-high-contrast.png" alt="Light High Contrast"><br><b>Light High Contrast</b> · max legibility</td>
  </tr>
</table>

<p align="center"><img src="./assets/swatches.png" alt="syntax palettes"></p>

## install

**VS Code** → `ext install ashwingopalsamy.claude-code-theme`

**Cursor · Windsurf · VSCodium** → search "Claude Code Theme" (via [Open VSX](https://open-vsx.org/extension/ashwingopalsamy/claude-code-theme))

then `⌘K ⌘T` (`Ctrl+K Ctrl+T`) → type **claude**.

## no bold?

every flavor ships a **(No Bold)** twin.

<p align="center"><img src="./assets/bold-vs-nobold.png" alt="bold vs no bold"></p>

## make it yours

```jsonc
{
  "workbench.colorTheme": "Claude Code Dark",
  "editor.fontFamily": "Geist Mono, JetBrains Mono, monospace",
  "editor.tokenColorCustomizations": {
    "[Claude Code Dark]": { "comments": { "fontStyle": "italic" } }
  }
}
```

<sub>not affiliated with Anthropic · [MIT](./LICENSE) · [changelog](./CHANGELOG.md) · [contributing](./CONTRIBUTING.md)</sub>
