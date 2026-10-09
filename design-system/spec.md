# Loopwise Design System: spec

Status: **v0.1.0**, 2026-10-09. Library file `mePj303lAcqSyWVjZodZWp`. Owner: Prateek S, lead designer.

Loopwise is a B2B workspace where product teams plan, assign and ship. The design system is crisp, quick and confident:
dense enough for task tables, friendly enough for onboarding, and themable from day one.

## Principles

1. **Tokens first.** Every colour, space, radius, size and type setting is a variable or a style. No loose values.
2. **Dark mode for free.** Components use semantic tokens only; switching the Color collection to Dark re-themes any
   frame.
3. **One component, many states.** States and sizes are variants; text and icons are properties. Never detach.
4. **Accessible by default.** Text pairs pass WCAG AA in Light and Dark, focus is always visible, and status never
   relies on colour alone (an icon or a word goes with it).
5. **Named for people.** Components carry the words the team uses: Button, Badge, Page Header.

## Architecture

**Pages:** Cover, Getting Started, Changelog, `---`, Color, Typography, Spacing & Radius, Elevation, Icons, `---`,
Actions, Inputs, Selection, Navigation, Feedback, Data display, Overlays, `---`, Patterns, Examples, `---`, Deprecated.
Every page holds one `<Page> / documentation` frame, 1440 wide.

**Variable collections**

| Collection | Modes | Variables | Scopes | WEB code syntax |
|---|---|---|---|---|
| Primitives | Value | 70 | none (hidden from publishing) | `var(--lw-<family>-<step>)` |
| Color | Light, Dark | 69 | targeted per group (fills, text, strokes, effects) | `var(--lw-color-<group>-<name>)` |
| Spacing | Value | 15 | gap and padding | `var(--lw-space-<n>)` |
| Radius | Value | 7 | corner radius | `var(--lw-radius-<name>)` |
| Size | Value | 10 | width and height | `var(--lw-size-<name>)` |
| Typography | Value | 24 | font family, style, size, line height | `var(--lw-font-...)` |

**Styles:** 22 text styles (bound to the Typography variables), 5 effect styles (colours bound to `color/effect/*`).

## Tokens

### Colour primitives

| Family | Steps | Role |
|---|---|---|
| violet | 50 #F1F0FF, 100 #E4E1FF, 200 #CBC5FF, 300 #ABA0FF, 400 #8D7BFC, 500 #7259F6, 600 #5E41E8, 700 #4E33C9, 800 #3F2AA2, 900 #2E2178, 950 #1C1450 | Brand |
| slate | 0 #FFFFFF, 25 #FAFBFD, 50 #F4F5F9, 100 #EAECF2, 200 #DADEE7, 300 #BCC2D0, 400 #8F97AA, 500 #646C80, 600 #525A6C, 700 #3C4252, 800 #262A36, 850 #1D2029, 900 #151821, 950 #0D0F15 | Neutrals |
| lime | 50 #F8FEE8, 100 #F2FCD6, 200 #E6F9AD, 300 #D9F57A, 400 #C6EE45, 500 #B5E61D, 600 #8FB812, 700 #6E8F0A, 800 #54700A, 900 #2F3D08 | Accent: highlights, celebration, never behind small white text |
| green | 50 #ECFBF1, 100 #D3F5E0, 300 #6FD69A, 500 #1FA35A, 600 #14874A, 700 #0F6B3B, 900 #0A3D23 | Success |
| amber | 50 #FFF8EB, 100 #FEEDCB, 300 #FBC56A, 500 #F59E0B, 600 #CC7A05, 700 #9A5205, 900 #5C3307 | Warning |
| red | 50 #FEF1F1, 100 #FDDCDD, 300 #F59A9E, 500 #E5484D, 600 #CE2C35, 700 #A8222A, 900 #5E1418 | Danger |
| blue | 50 #EEF6FE, 100 #D7E9FC, 300 #8EC2F5, 500 #2D8CEB, 600 #1B74C5, 700 #155C9E, 900 #0D3560 | Info |
| alpha | ink-6, ink-10, ink-40 (#151821 at 6, 10, 40%), black-40, black-56, black-64, violet-32 | Scrims, shadows, focus ring |

### Semantic colour (Color collection)

Groups and their roles; every token has a Light and a Dark value and a one-line description in Figma.

- `color/bg/*` (24): canvas, surface, surface-raised, subtle, muted, hover, pressed, selected, disabled, inverse, brand,
  brand-hover, brand-pressed, brand-subtle, accent, accent-subtle, success, warning, danger, info, danger-solid,
  danger-solid-hover, danger-solid-pressed, scrim.
- `color/text/*` (13): primary, secondary, tertiary, disabled, inverse, on-brand, on-accent, brand, brand-inverse, success,
  warning, danger, info.
- `color/icon/*` (10): primary, secondary, disabled, inverse, on-brand, brand, success, warning, danger, info.
- `color/border/*` (7): default, subtle, strong, hover, focus, danger, brand.
- `color/control/*` (2): track-off, knob. `color/avatar/*` (10): violet, lime, blue, amber, green, each -bg and -fg.
- `color/effect/*` (3): shadow-soft, shadow-strong, focus-ring.

In Dark, surfaces lift by getting lighter (canvas slate/950, surface slate/900, surface-raised slate/850) and shadows
deepen through the effect tokens.

### Typography

Geist for everything, Geist Mono for IDs, keys and numbers that line up. Headings tighten their tracking as they grow.

| Style | Font | Size / line height | Tracking |
|---|---|---|---|
| Display/Large, Display/Small | Geist SemiBold | 48/56, 36/44 | -3% |
| Heading/1 to 4 | Geist SemiBold | 28/36, 22/30, 18/26, 16/24 | -2%, -1.5%, -1%, -0.5% |
| Body/Large (Regular, Medium) | Geist | 16/26 | 0 |
| Body/Medium (Regular, Medium, SemiBold) | Geist | 14/22 | 0 |
| Body/Small (Regular, Medium, SemiBold) | Geist | 13/20 | 0 |
| Label/Large, Label/Medium | Geist SemiBold, Medium | 14/20 | 0 |
| Label/Small | Geist SemiBold | 12/16 | 0 |
| Label/Caps | Geist SemiBold, uppercase | 11/16 | 6% |
| Caption (Regular, Medium) | Geist | 12/16 | 0 |
| Mono/Medium, Mono/Small | Geist Mono Medium | 13/20, 12/16 | 0 |

### Spacing, radius, size, elevation

- **Spacing:** 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, and -4 for overlapping avatars. 8 inside controls, 12 to
  16 inside cards, 24 to 32 between sections, 48 around a page.
- **Radius:** none 0, xs 4, sm 6, md 8, lg 12, xl 16, full. md for buttons and fields, lg for cards and dialogs, full for
  badges, avatars and pills.
- **Size:** icons 12, 16, 20, 24; controls 28, 36, 40; avatars 24, 32, 40. Controls bind their height.
- **Elevation:** Shadow/XS (selected segments), SM (raised cards), MD (menus, dropdowns, tooltips), LG (dialogs, toasts),
  Focus/Ring (fields). Only floating things get a shadow; cards on the page use a border.
- **Focus:** a 2px border/focus ring 3px outside the control (`Show focus ring` on Button, Icon Button, Checkbox, Radio,
  Switch) or the Focus/Ring style on fields.

### Icons

Material Symbols Rounded, weight 400, 64 icons as components `Icon/<name>`, 24 x 24, one flattened glyph recoloured with
`color/icon/*`.

## Components (v0.1.0)

| Page | Components (variants) |
|---|---|
| Actions | Button (48), Icon Button (36) |
| Inputs | Text Field (10), Search Field (8), Dropdown Panel (2), Select Option (8) |
| Selection | Checkbox (9), Radio (6), Switch (4), Segmented Control (3), Segment (3) |
| Navigation | Tab Bar (6), Tab (6), Nav Item (6), Sidebar |
| Feedback | Badge (12), Alert (4), Toast (3), Tooltip (4), Progress Bar (5), Spinner (3) |
| Data display | Avatar (15), Avatar Stack (6), Stat Card (4), Table Row (4), Table Cell (8), Table |
| Overlays | Menu Item (6), Menu, Dialog (2) |
| Patterns | Page Header (2), Card (2), Slot, Empty State |

Building blocks (Segment, Tab, Nav Item, Select Option, Table Cell, Table Row, Menu Item, Slot) are components that the
larger ones are made of; they are rarely placed on their own. Keys and properties: `figma-with-claude/registry.md`.

## Governance

- **Owner:** the lead designer approves tokens and components; nominated designers may add them in library sessions.
- **Promotion checklist** (anything new enters the library only if all are true): described with a status line;
  token-bound with no hard-coded values; Light and Dark checked; properties follow the standards; all states present;
  contrast checked; library QA at baseline; registry row added.
- **Versioning:** the Changelog page uses MAJOR.MINOR.PATCH; every publish has a row. New things raise the minor
  number, fixes the patch number, breaking changes say "Breaking:".
- **Deprecation:** never delete a published component. Move it to `Deprecated`, start its description with
  `Deprecated.` and name the replacement.

## Decisions made

| Decision | Choice | Why |
|---|---|---|
| Brand direction | SaaS (Loopwise) | Explored side by side with a wealth-management direction; the SaaS direction fits a dense work tool and reads better on dashboards |
| Themes | Light and Dark from day one | Proves the token architecture; every component is checked in both |
| Type | Geist and Geist Mono | Crisp at small sizes, tabular mono for IDs and points |
| Colour | Violet brand, lime accent, cool slate neutrals | Distinct from common blue SaaS palettes; lime is used sparingly |
| Icons | Material Symbols Rounded 400 | Complete, open, matches Geist's rounded terminals |
| Tertiary text | slate/500 darkened to #646C80 | Placeholders and hints pass AA on tinted fills too (4.8:1), not only on white |
| Focus | Visible ring on every interactive component | Keyboard users always see where they are |

## Roadmap

Planned families, each through a library session: Date and time (date picker, date range), Filters (filter button, chips,
filter menu), Drawer, Forms (textarea, field groups), Skeleton loading, Charts (series colours as tokens), and a Code
Connect mapping once the `lw-` components exist in code.
