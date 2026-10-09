# Loopwise Design System: QA report

The library QA (`figma-with-claude/library-qa.js`) runs read-only on the library file before every publish. Each round
below records what it found, what was fixed and the baseline the next change has to keep.

## Round 1: v0.1.0, 2026-10-09

Scanned: Icons, Actions, Inputs, Selection, Navigation, Feedback, Data display, Overlays, Patterns and Examples, 1,858
layers. The foundation and documentation pages (Cover, Getting Started, Changelog, Color, Typography, Spacing & Radius,
Elevation, Deprecated) are skipped by design.

| Check | First run | After fixes |
|---|---|---|
| Unbound colours | 0 | 0 |
| Unbound spacing | 0 | 0 |
| Unbound radius | 0 | 0 |
| Text without a style | 0 | 0 |
| Contrast below 4.5:1 (3:1 large) | 5 | 0 |
| Default layer names | 10 | 0 |
| Missing descriptions | 0 | 0 |
| Descriptions with entities | 0 | 0 |
| Bad variant names | 0 | 0 |
| Duplicate set names | 0 | 0 |
| Opacity mismatches | 0 | 0 |
| Variables with all scopes | 0 | 0 |
| Variables without WEB code syntax | 0 | 0 |
| **clean** | false | **true** |

Fixes in this round:

- **Contrast.** `text/tertiary` (slate/500, #6B7387) reached only 4.31 to 4.35:1 on tinted fills: the Search Field
  placeholder, Menu Item shortcuts and the Card slot hint. slate/500 is now #646C80: 5.25:1 on white, 4.82:1 on
  bg/subtle, 4.77:1 on bg/danger.
- **Layer names.** Ten frames called Text or Line in Alert, Dialog, Card, Empty State and Menu were renamed (Text block,
  Divider).
- **Avatar Stack.** The overlap was cut from 8 to 4 (`spacing/-4`) so initials are not covered; the unused `spacing/-8`
  was removed.
- **Variant grids.** The Tab Bar and Page Header grids were narrowed to fit their documentation blocks.

**Baseline for the next change: every count 0.**

## Contrast, Light and Dark

Every text and background pair the components use, measured from the token values (WCAG AA: 4.5:1 for body text).

| Text | Background | Light | Dark |
|---|---|---|---|
| text/primary | bg/surface | 17.7 | 16.3 |
| text/secondary | bg/surface | 6.9 | 9.9 |
| text/tertiary | bg/surface | 5.3 | 6.1 |
| text/tertiary | bg/subtle | 4.8 | 5.6 |
| text/brand | bg/surface | 6.2 | 7.8 |
| text/primary | bg/canvas | 17.1 | 17.6 |
| text/secondary | bg/subtle | 6.3 | 9.1 |
| text/on-brand | bg/brand | 6.2 | 6.2 |
| text/on-brand | bg/brand-hover | 8.0 | 4.7 |
| text/on-brand | bg/danger-solid | 5.2 | 5.2 |
| text/inverse | bg/inverse | 17.7 | 16.3 |
| text/brand-inverse | bg/inverse | 7.8 | 7.3 |
| text/brand | bg/selected | 5.5 | 7.3 |
| text/success | bg/success | 6.2 | 6.9 |
| text/warning | bg/warning | 5.5 | 6.9 |
| text/danger | bg/danger | 6.5 | 6.3 |
| text/info | bg/info | 6.3 | 6.6 |
| text/on-accent | bg/accent | 14.6 | 13.3 |

The closest pair is white text on the Dark hover of the brand colour (4.7:1). A new colour token adds its pairs here and
to the contrast table on the library's Color page.

## CSS variables developers need

Nothing is built in code yet, so every published token is new. Developers read the names in Dev Mode (each variable's
WEB code syntax) or here:

- Colour: `--lw-color-bg-*` (24), `--lw-color-text-*` (13), `--lw-color-icon-*` (10), `--lw-color-border-*` (7),
  `--lw-color-control-*` (2), `--lw-color-avatar-*` (10), `--lw-color-effect-*` (3), each with a Light and a Dark value.
- Spacing `--lw-space-0` to `--lw-space-64` and `--lw-space-n4`; radius `--lw-radius-none|xs|sm|md|lg|xl|full`; size
  `--lw-size-icon-*`, `--lw-size-control-*`, `--lw-size-avatar-*`.
- Typography `--lw-font-family-sans|mono`, `--lw-font-weight-*`, `--lw-font-size-*`, `--lw-font-line-height-*`.
- Primitives (`--lw-violet-600` and so on) are hidden from the library but keep their code syntax, for the CSS that
  defines the semantic variables.

A library session that adds a token adds its name to this list.

## Open decisions

1. Code: the web component names (`lw-button` and so on) are planned names; confirm them when the code starts.
2. Requirement annotations: the categories Requirement, Logistics and Question are defined in `rules.md`; confirm the
   colours once the first screen file uses them.
