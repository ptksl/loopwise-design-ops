# Library authoring: adding to the Loopwise Design System

For **library sessions**. A designer (the lead designer, or a designer the lead nominates) adds or changes something in
the library file **Loopwise Design System** (key `mePj303lAcqSyWVjZodZWp`) with Claude. Claude follows this file; the
designer reads it to know what to expect. Nobody else has to be involved: the design engineer is only needed for the
exception below.

## When this route applies

Use it for **new design**: a new component, a new variant or state, a new colour, text style or other token, a new icon,
or a redesign of something that exists in the product. Developers build it afterwards, so the library may be ahead of the
code.

**Not this route:** something that already exists in the product and has to match it exactly, or a library that no
longer matches the product because the code changed. Reproducing those needs the product's code, so it is a
request-from-code issue for the design engineer (Part H of `designer-guide.md`). Claude asks once, before it starts: "Is
this new design, or does it already exist in the product and has to look the same?" A redesign counts as new design.

## The flow (Claude, in this order)

1. **Ask and read.** Ask the question above. Read `registry.md` (components, glossary, properties) and look at the
   closest existing component in the library with `use_figma`: its variant properties, layer names, token bindings and
   description. New work copies the structure of the nearest component.
2. **Compose before you create.** Try to express the need with existing components, variants and tokens first. A new
   component is justified only when composition cannot do it. A new variant of an existing set beats a new set.
3. **Show the library plan and wait for OK.** One table, one row per thing to add: name, kind (component, variant,
   state, token, text style, icon), properties and variants, tokens it binds (existing ones, or new ones with the names
   you propose and their Light and Dark values), the library page it goes on, and the status line for its description.
   Say what you reused and why the rest is new. Do not build before the designer says OK.
4. **Load the skills** `figma-use` and `figma-generate-library` (from the Figma plugin, or read them with
   `get_figma_skill`: `skill://figma/figma-use/SKILL.md` and `skill://figma/figma-generate-library/SKILL.md`), then
   build in the library file: tokens first, then the component, then the documentation on its page. Return every node
   id.
5. **QA gate.** Run `library-qa.js` (set `PAGE_NAMES` to the pages you changed for a quick run; the variable checks
   always cover the whole file), fix what it reports, run it again, and render every variant in Light and in Dark to
   look at it. The report must stay at the baseline below. Then report: what was added (components, variants, styles,
   variables, with their node ids), the Changelog text, the registry row, and anything the designer should look at.
6. **Stop before publishing.** Publishing is done by a person in Figma (Part G of the guide). Tell the designer what the
   publish dialog should list: the things you reported, plus every component that holds one of them as a nested
   instance (Figma lists those as Modified too: changing Badge also lists Stat Card, Table Cell, Table Row, Table and
   Page Header). Work those out from where the changed component is used, and say that nothing else, and no variable you
   did not touch, should be there.
7. **After the publish**, when the designer says "published":
   - Confirm with `search_design_system` in a file that has the library added that the new component or token is found.
     If it is not, the publish has not happened yet: say so and stop.
   - Add the Changelog row (below).
   - Refresh the repository: the registry row (key, properties, words people use), the counts and the date at the top of
     `registry.md`, the glossary, the "Designed ahead of code" table, the token list in `design-system/qa-report.md`,
     and the generated key tables of `check.js` (run `list-library-keys.js` on the library file, replace the block
     between `BEGIN GENERATED KEYS` and `END GENERATED KEYS`, and compare its counts with the registry). Without this
     the check reports the new component as foreign.
   - Run the check on the screen file (read-only) and report the summary.
   - Commit and push only when the designer asks.

## Standards a library component meets

**Tokens**
- Every fill, stroke, padding, gap, corner radius and fixed height is bound to a variable (or a style). Nothing
  hard-coded.
- Reuse existing variables. A new colour needs a primitive (in Primitives: scopes none, the exact value) and a Color
  token with a **Light and a Dark value**, targeted scopes (never all scopes), a description and a WEB code syntax
  `var(--lw-color-<group>-<name>)`. Text and its background must reach 4.5:1 in both modes (3:1 for 18px and up): add
  the pair to the contrast table on the Color page. Add the token to the list in `design-system/qa-report.md`.
- A bound colour carries its alpha in the variable, not in the paint: the paint's own opacity is ignored. Pass the
  resolved colour to `setBoundVariableForPaint`, or server renders show black.
- Text uses a library text style (Geist, or Geist Mono for IDs and numbers). The styles bind their family, weight, size
  and line height to the Typography collection. A range of text with its own font (a bold word inside a sentence) loses
  the style link: avoid it or ask for a style.
- Shadows use the effect styles Shadow/XS, SM, MD and LG; keyboard focus uses the Focus/Ring style or a 2px border/focus
  ring 3px outside the control behind a `Show focus ring` property. Do not invent a shadow.

**Structure and names**
- Auto layout everywhere; a swappable body is an auto-layout component (an instance of a plain frame cannot hug).
- Component sets are Title Case names with no prefix. Variants are named `Property=Value, Property=Value` with the
  property names the library already uses: `Type`, `Size`, `State`, `Selected`, `Checked`, `Content`, `Placement`,
  `Value`, `Trend`, `Style`, `Color`, `Count`, `Options`, `Tabs`.
- Properties: a boolean is `Show <thing>`; text properties are named for their content (`Label`, `Title`, `Value`);
  icons are instance-swap properties (never one variant per icon). A nested component people need to edit is an exposed
  instance.
- Every layer has a real name (no `Frame 12`, no `Text`). Set frames have corner radius 0 and a dashed border/default
  stroke.
- Put the set on the page of its family: Actions, Inputs, Selection, Navigation, Feedback, Data display, Overlays or
  Patterns (or start a new page for a new family, before the `---` that follows Overlays). A page is one frame named
  `<Page> / documentation`, 1440 wide, bound to color/bg/canvas: a `Page header` (Label/Caps, Display/Small and a
  Body/Large/Regular paragraph), then one block per component, 1344 wide, holding a Heading/2 title, its usage text in
  Body/Medium/Regular, the property list in Mono/Small, the variant grid with row and column labels, and an "In use" row
  of instances. Copy the block of a component that is like yours.

**Description** (shown to everyone who uses it, and to developers in Dev Mode)
- Plain words, no quotes, apostrophes or ampersands (the setter turns them into entities).
- What it is in one sentence, when to use it and when not, its variants, then a status line:
  `Status: designed in v0.2, not built in code yet. Code: lw-<name>.` or, once built, `Status: built. Code: <selector>.`

**Icons** are Material Symbols Rounded, weight 400, named `Icon/<ligature name>`, 24 x 24, one flattened glyph named
`Glyph` whose fill is color/icon/primary, description `Material Symbols Rounded glyph <name>. Code:
material-symbols-rounded with the text <name>.`

**Changing something already published**
- Prefer additive changes: a new variant, a new property, a new component. They do not disturb screens that exist.
- Renaming or removing a variant, a property or a layer people override, or restructuring a set, is a **breaking
  change**: say so in the plan, start the Changelog text with "Breaking:", and tell the team before it is published.
- Never delete a published component: files that use it would break. Move it to the page `Deprecated`, start its
  description with `Deprecated.` and name the component to use instead.

**The Changelog row** (page Changelog, block Releases, newest at the bottom): clone the last `Row x.y.z` frame, rename
it `Row <version>`, and fill the four texts: version, date, what changed, `Claude with <the designer's name>`. The version
text must contain only `x.y.z`: `list-library-keys.js` reads the highest one. New things raise the middle number
(0.2.0, also for a breaking change); a fix with nothing new raises the last (0.1.1).

## When developers have built it

A component whose status says `designed in vX.Y, not built in code yet` stays that way until the product has it. When the
designer says it is built (give the selector), Claude changes the status line to `Status: built. Code: <selector>.`, takes
its row out of "Designed ahead of code" in `registry.md`, and adds the description change to the next publish. If the
built version differs from the design, that is a design decision for the designer: change the library or ask the
developers to change the code.

## Quirks of the Figma plugin API (so Claude does not rediscover them)

- Calls run one at a time; `setCurrentPageAsync` once per call; a failed call rolls back. Pages that are not current can
  be read and changed after `page.loadAsync()`.
- Load every font before writing text, and the style's own font after applying a text style. Style names are exact:
  Geist uses `SemiBold`.
- `resize()` on a text node resets `textAutoResize`: resize first, then set `textAutoResize = 'HEIGHT'`.
- `clone()` of a variant drops the links between its layers and the set's properties: re-link them.
- Reading a property a node type does not have throws; read optional properties through a try/catch.
- `combineAsVariants` stacks every variant at (0,0) and gives the set a corner radius: lay the variants out on a grid,
  resize the set to fit, and set its radius to 0.
- `setBoundVariableForPaint` keeps whatever colour you passed it: pass the resolved colour, or server renders show black.
- Icons: a text node in Material Symbols Rounded (size 24, line height 24, width 24) flattened with `figma.flatten`
  gives a correctly placed glyph; set its constraints to Scale so instances can be resized to 16 or 20.
- A frame previews Dark with `setExplicitVariableModeForCollection(colorCollection, darkModeId)`; instances inside
  follow.
- Component descriptions are HTML-escaped; keep them plain.

## The baseline

`library-qa.js` on the library (2026-10-09, v0.1.0, 1,858 layers on 10 pages) reports **0 for every count**: no unbound
colours, spacing or radius, no text without a style, no contrast below the limit, no default names, no missing
descriptions, no bad variant names, no duplicate sets, no opacity mismatches, no variable with all scopes or without
code syntax. A change keeps every count at 0. If a count ever has to stay above 0 for a reason, write the reason here and
in the latest round of `design-system/qa-report.md`.
