# Carbon Alpine

A Neos CMS package for integrating Alpine.js and a curated set of Alpine plugins, UI components, and custom extensions through the Carbon asset pipeline.

This package bundles the Alpine runtime, optional feature modules, and plugin-specific scripts in a configurable way so you can include only the pieces you need on a page.

## Features

- Alpine.js core integration for Neos
- Optional plugin loading for AJAX, anchor, clipboard, collapse, focus, intersect, mask, morph, persist, resize, and sort
- Optional UI components such as combobox, dialog, disclosure, listbox, menu, popover, radio, switch, and tabs
- Custom extension helpers for anchors, counters, fetch, focus, tooltip, tash, and typewriter
- Configurable page-level inclusion via Neos settings
- Support for both classic script bundles and ES module bundles
- Build pipeline powered by esbuild

## Requirements

- Neos CMS
- Carbon.IncludeAssets
- Node.js and pnpm for local development/building of frontend assets

## Installation

Install the package with Composer:

```bash
composer require carbon/alpine
```

If you want to enable automatic inclusion of the Alpine scripts across all pages, add the following to your Neos configuration:

```yaml
Neos:
  Neos:
    fusion:
      autoInclude:
        Carbon.Alpine: true
```

## Configuration

The default settings are defined in [Configuration/Settings.Alpine.yaml](Configuration/Settings.Alpine.yaml).

```yaml
Carbon:
  Alpine:
    includeOnPage: true
    useModules: true

    Main: true
    Files:
      Plugins:
        Ajax: false
        Anchor: false
        Clipboard: false
        Collapse: false
        Focus: false
        Intersect: false
        Mask: false
        Morph: false
        Persist: false
        Resize: false
        Sort: false
      UI:
        Combobox: false
        Dialog: false
        Disclosure: false
        ListBox: false
        Menu: false
        Popover: false
        Radio: false
        Switch: false
        Tabs: false
      Custom:
        Anchor: false
        Counter: false
        Fetch: false
        Focus: false
        Tash: false
        Tooltip: false
        TypeWriter: false
```

### Settings explained

- `includeOnPage`: includes the Alpine asset collection on the page automatically
- `useModules`: renders the files as ES modules (`.mjs`) instead of classic script files (`.js`)
- `Main`: includes the main Alpine bundle
- `Files`: enables or disables individual plugin, UI, and custom asset files

## Usage

Once enabled, the package injects the generated script assets into the page through the Fusion integration. You can then use Alpine directives in your templates, for example:

```html
<div x-data="{ open: false }">
  <button x-on:click="open = !open">Toggle</button>
  <div x-show="open">Content</div>
</div>
```

The package is designed to work well with Carbon-based Neos frontends and keeps the asset loading flexible and explicit.

## Project Structure

```text
Resources/
  Private/
    Assets/        # Source assets for bundling
    Bundled/       # Built plugin/module bundles
    Fusion/        # Fusion prototypes used for script inclusion
    Source/        # TypeScript/JS source files
  Public/
    Modules/       # ESM output
    Scripts/       # Classic script output
Configuration/
  Settings.Alpine.yaml
```

## Development

Install dependencies:

```bash
pnpm install
```

Build the package:

```bash
pnpm build
```

Run the watch mode during development:

```bash
pnpm watch
```

The build pipeline is configured in [build.mjs](build.mjs) and generates both script and module bundles for the public resources.

## License

This package is distributed under the project license defined by the package configuration.

## Maintainer

This package is part of the Carbon package ecosystem for Neos CMS.
