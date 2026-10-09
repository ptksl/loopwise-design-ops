# Component registry: Loopwise Design System

Library file: **Loopwise Design System**, key `mePj303lAcqSyWVjZodZWp`, **v0.1.0** (2026-10-09).
Library key for `search_design_system` (`includeLibraryKeys`): read it from `get_libraries` on a file that has the
library added, and write it here after the first publish.
Last updated: 2026-10-09. Lead designer: Prateek S, who adds to and publishes the library.
Contents: 29 component sets and 5 single components (34 rows below), 64 icons, 22 text styles, 5 effect styles,
195 variables in 6 collections (Primitives hidden from publishing).

`get_libraries` and `search_design_system` only see a library that is **added to the file** (Assets, Libraries icon,
Loopwise Design System, Add to file), so turning it on is part of setup; importing by key works without it. After each
publish: refresh this file's date and counts, add a row to the library's Changelog page and regenerate the key tables of
`check.js` with `list-library-keys.js` (otherwise the check reports a new component as foreign).

## How Claude uses this file

1. Find the element in the table (or the glossary below), import by key
   (`figma.importComponentSetByKeyAsync(key)` for a set, `importComponentByKeyAsync(key)` for a single component).
2. Set the variant properties (`Type`, `Size`, `State`, ...) and the instance properties (`Label`, `Show ... icon`,
   icon swaps). Never edit inner layers when a property exists, never detach. Exposed instances (listed below) are
   edited through their own properties.
3. If the element is not here, it is a NEW PATTERN: stop and report it, ask whether it is new design or already in the
   product, and do not draw it. New design is added to the library in a library session (`library-authoring.md`);
   something that exists in the product is a request-from-code issue.
4. Themes: Light and Dark are the two modes of the Color collection. Switch a frame's mode to preview Dark; never
   recolour a layer by hand.

## Components

Properties: variants are shown as `Name[a|b|c]`, instance properties as `Name(text)`, `Name(bool)`, `Name(swap)`.
Every set is token-bound; every value is a variable or a style. Code names are the planned web components.

### Actions

| Component | Key | Use for | Properties |
|---|---|---|---|
| Button | `d27417f7b15c4a6853b9c895bef614f5799a1ee5` | Any action. One Primary per view; Secondary for supporting actions; Ghost in toolbars and dense rows; Danger only to confirm a destructive action. Not for navigation (use a link). Code `lw-button` | Type[Primary\|Secondary\|Ghost\|Danger]; Size[Large 40\|Medium 36\|Small 28]; State[Default\|Hover\|Pressed\|Disabled]; Label(text); Show leading icon(bool); Leading icon(swap); Show trailing icon(bool); Trailing icon(swap); Show focus ring(bool) |
| Icon Button | `8611c29e963f60fddd2db46ab74409896c7240e1` | Icon-only action: close, more actions, row actions, toolbar tools. Always with a Tooltip naming the action. Code `lw-icon-button` | Type[Primary\|Secondary\|Ghost]; Size[Large\|Medium\|Small]; State[Default\|Hover\|Pressed\|Disabled]; Icon(swap); Show focus ring(bool) |

### Inputs

| Component | Key | Use for | Properties |
|---|---|---|---|
| Text Field | `0e1183d41f9a5efce09b124e6279aafd9a1ac20a` | A typed or picked value. A select is a Text Field with trailing icon expand_more that opens a Dropdown Panel; a date field uses calendar_month. Code `lw-text-field` | State[Default\|Hover\|Focused\|Error\|Disabled]; Content[Empty\|Filled]; Label(text); Show label(bool); Show required(bool); Placeholder(text); Value(text); Helper text(text); Show helper(bool); Show leading icon(bool); Leading icon(swap); Show trailing icon(bool); Trailing icon(swap) |
| Search Field | `40d60475e2df987f2541f8cebb7d23a8e40db624` | Find or filter in a list, table or dropdown. Medium 36 in toolbars and sidebars, Small 28 inside a Dropdown Panel. Code `lw-search-field` | Size[Medium\|Small]; State[Default\|Focused]; Content[Empty\|Filled]; Placeholder(text); Value(text); Show shortcut(bool); Shortcut(text) |
| Dropdown Panel | `7c23ac66a03ff8da222c400f0d1b2cfc4b05f227` | The open list under a select, a filter button or an autocomplete. Single closes on pick; Multi has checkboxes and an Apply footer; search when there are more than 7 options. Code `lw-dropdown` | Type[Single\|Multi]; Show search(bool); Show footer(bool) |
| Select Option | `4458857a6c2c3f8c3a53de3db6a494e6f8ee4ba4` | One row in a Dropdown Panel. Normally used through Dropdown Panel | Type[Text\|Checkbox]; State[Default\|Hover\|Selected\|Disabled]; Label(text); Show icon(bool); Icon(swap) |

### Selection

| Component | Key | Use for | Properties |
|---|---|---|---|
| Checkbox | `cfc5a9885d394bd63e2480231d97e8e8f76d50d9` | An option applied later with a button; row selection in a table (Show label off). Indeterminate is a partial select-all. Code `lw-checkbox` | Checked[Unchecked\|Checked\|Indeterminate]; State[Default\|Hover\|Disabled]; Label(text); Show label(bool); Show focus ring(bool) |
| Radio | `db235f8d5f9afcdf5ae7f85296e001a68c6a2dc6` | One choice from two to five visible options. Code `lw-radio` | Selected[False\|True]; State[Default\|Hover\|Disabled]; Label(text); Show label(bool); Show focus ring(bool) |
| Switch | `83c57cf27e7fb607ee3b06f2f64982c95e7da35c` | A setting that applies immediately. If it needs Save, use a Checkbox. Code `lw-switch` | Selected[Off\|On]; State[Default\|Disabled]; Label(text); Show label(bool); Show focus ring(bool) |
| Segmented Control | `3f812943390eccb49b485a2ace192cca09e0f015` | Switch between views of the same content: Board, List, Timeline. Not page navigation (Tab Bar), not a form choice (Radio). Code `lw-segmented-control` | Options[2\|3\|4]; set the label, icon and Selected state on each Segment |
| Segment | `74d1eaef3dafc20ef2128651c1da2414b9e7b268` | Part of Segmented Control | State[Default\|Hover\|Selected]; Label(text); Show icon(bool); Icon(swap) |

### Navigation

| Component | Key | Use for | Properties |
|---|---|---|---|
| Tab Bar | `460a277a565d8a624d0a1d745acbd23054143794` | Sections of one page with different content: Overview, Tasks, Docs. Pill in toolbars and cards, Underline under a Page Header. Code `lw-tabs` | Type[Pill\|Underline]; Tabs[3\|4\|5]; set the label, count and Selected state on each Tab |
| Tab | `f5199bed00b225cf52f00d9dea694cb8c9a5f0a4` | Part of Tab Bar | Type[Pill\|Underline]; State[Default\|Hover\|Selected]; Label(text); Show count(bool); Count(text) |
| Sidebar | `2a1d501c08d756be7e9088fa74e14dee710296a5` | The 240 wide navigation of every signed-in screen: workspace, search, sections, projects, account. Single component. Code `lw-sidebar` | Workspace(text); Name(text); Role(text); mark the current page on its Nav Item |
| Nav Item | `8136341fdc8f990d5ffcdfef422527fdaada2e8e` | One Sidebar entry. Icon for main sections, Project for projects with a colour dot | Type[Icon\|Project]; State[Default\|Hover\|Selected]; Label(text); Icon(swap); Show count(bool); Count(text) |

### Feedback

| Component | Key | Use for | Properties |
|---|---|---|---|
| Badge | `35aa5ee2db046d701fef0300704e48cfbe3a64dd` | A short status or category on a row, card or header: Done, In review, Blocked, Beta. Not clickable. Choose the type by meaning. Code `lw-badge` | Type[Neutral\|Brand\|Success\|Warning\|Danger\|Info]; Size[Small 20\|Medium 24]; Label(text); Show icon(bool); Icon(swap) |
| Alert | `6566a629f0137295f5a94b814328bf352357dcd4` | An inline message that stays with a section of the page. Not for the result of an action (Toast) or a field error (under the field). Code `lw-alert` | Type[Info\|Success\|Warning\|Danger]; Title(text); Message(text); Show title(bool); Show action(bool); Show close(bool); Action is an exposed Button |
| Toast | `deb848d216d636b891e635413cf18754878f0119` | The result of something the person just did, bottom left, 5 seconds, optional Undo. Code `lw-toast` | Type[Default\|Success\|Danger]; Message(text); Show action(bool); Action label(text); Show close(bool) |
| Tooltip | `dc6136c15bcbec4f0f77f3fd8cd7e17e9d6133c7` | Names an icon-only control or shows cut-off text, on hover and focus. Never required information. Code `lw-tooltip` | Placement[Top\|Bottom\|Left\|Right]; Text(text) |
| Progress Bar | `6ca589c0e4b4ad9caef67986ee396ffa8346aace` | Known progress: a checklist, a project, an upload. 320 wide, resize to the container. Code `lw-progress-bar` | Value[0\|25\|50\|75\|100]; Label(text); Show header(bool) |
| Spinner | `39b31a1a22646ec10c68a33e042da2a5b6fe0d4b` | Work of unknown length. Small 16 in buttons and fields, Medium 24 in panels, Large 40 for a section. Code `lw-spinner` | Size[Small\|Medium\|Large] |

### Data display

| Component | Key | Use for | Properties |
|---|---|---|---|
| Avatar | `9f2e201414805171c864b8c29b8793ee81cb4b72` | A person or team as initials on one of five tints; the same person keeps the same colour. Code `lw-avatar` | Color[Violet\|Lime\|Blue\|Amber\|Green]; Size[Small 24\|Medium 32\|Large 40]; Initials(text); Show status(bool) |
| Avatar Stack | `175e92d2d827ec0fa23e09a24d21c6fbbfc9badf` | The people on a project, task or document: up to four avatars and a +N count. Code `lw-avatar-stack` | Count[2\|3\|4]; Overflow[False\|True]; Overflow count(text); change each person through its Avatar instance |
| Stat Card | `a3fb58e957342bfb32cc3ec087560f3354e01fc9` | One headline number with its change. Choose the trend by whether the change is good (fewer open tasks is Positive). Code `lw-stat-card` | Trend[Positive\|Negative\|Neutral\|Progress]; Label(text); Value(text); Caption(text); Show caption(bool); Show info(bool); Delta is an exposed Badge |
| Table | `7426371e3b05e0ebd020ef0d050f7e026ba47ab1` | A ready task table: a header row and five body rows. Single component. Code `lw-table` | add or remove Table Row instances; edit cells through their exposed Checkbox, Badge, Avatar and Action instances |
| Table Row | `27662b680ead1e46178d08dad44ca2a19172e5ca` | One header or body row; stretches with the table | Type[Header\|Body]; State[Default\|Hover\|Selected] |
| Table Cell | `52ece3793317a2c58394c5ecb97f1e9a4214639b` | One cell: Header (with sort), Text, Lead (ID and title), Badge, Avatar (with name), Numeric (mono, right aligned), Checkbox, Actions | Type[Header\|Text\|Lead\|Badge\|Avatar\|Numeric\|Checkbox\|Actions]; Text(text); ID(text); Show ID(bool); Show sort(bool); Label(text); Title(text); Name(text); Number(text) |

### Overlays

| Component | Key | Use for | Properties |
|---|---|---|---|
| Menu | `9f7d00036f8297bad5aa353e6d148a12f9e29737` | The actions on one object, opened from a more_horiz or more_vert Icon Button. Under 8 items, Destructive last after the divider. Single component. Code `lw-menu` | edit items through each Menu Item instance |
| Menu Item | `ebc36181848b363c3b8f0fbfc3d29f6b0764aef2` | One action in a Menu | Type[Default\|Destructive]; State[Default\|Hover\|Disabled]; Label(text); Show icon(bool); Icon(swap); Show shortcut(bool); Shortcut(text) |
| Dialog | `a945fda35e4dc547a9fa6b04ec417a9681503ebe` | A decision or a short input without leaving the page. Destructive names the action on a Danger button. Show it on color/bg/scrim. Code `lw-dialog` | Type[Default\|Destructive]; Title(text); Body(text); Show close(bool); Cancel and Confirm are exposed Buttons |

### Patterns

| Component | Key | Use for | Properties |
|---|---|---|---|
| Page Header | `9a0eb6c29e98f8f2afdedc06b72f774e6edc905b` | The top of every page: breadcrumb, title, status Badge, people and up to two actions. Tabs adds an underline Tab Bar. Code `lw-page-header` | Type[Default\|Tabs]; Title(text); Parent(text); Show breadcrumb(bool); Show status(bool); Show people(bool); Show actions(bool); Status, Secondary action and Primary action are exposed |
| Card | `f75f8d1afdac72a0154ae769a15d69400b7d8f30` | A self-contained group: a project, a summary, a widget. Outlined on the page, Elevated when it floats. No cards inside cards. Code `lw-card` | Style[Outlined\|Elevated]; Title(text); Description(text); Show description(bool); Show menu(bool); Content(swap); Show footer(bool); Meta(text) |
| Slot | `2845b695affefd5ebbef3262598443728e6b86b1` | The placeholder body of a Card; swap it through the Card's Content property. Not used on its own | none |
| Empty State | `b3097e2994f8a462ffaf1a43a31afd546ad64704` | A list, table or board with nothing to show yet: what will appear and the action that fills it. Code `lw-empty-state` | Title(text); Description(text); Icon(swap); Show actions(bool); Show secondary action(bool); actions are exposed Buttons |

A ready screen: the frames **Example / Project tasks · Light** and **Example / Project tasks · Dark** on the library's
Examples page (Sidebar, Page Header with tabs, four Stat Cards, Table and a Toast). Copy one into your file and edit; it is
a frame, not a component.

## Icons

One component per icon, named `Icon/<name>`, 24 x 24, used through an instance-swap property (never one variant per
icon). Names are the Material Symbols Rounded ligature names, so a developer can copy the name. Recolour an icon through
its `Glyph` layer with a `color/icon/*` token; size it 16, 20 or 24 with the `size/icon-*` tokens.

add, all_inclusive (the Loopwise mark), arrow_back, arrow_downward, arrow_forward, arrow_upward, attach_file, block, bolt,
calendar_month, chat_bubble, check, check_circle, chevron_left, chevron_right, close, content_copy, dark_mode, dashboard,
delete, description, download, drag_indicator, edit, error, expand_less, expand_more, filter_list, flag, folder, group,
help, home, inbox, info, ios_share, label, light_mode, link, lock, logout, more_horiz, more_vert, notifications,
open_in_new, person, person_add, progress_activity, remove, schedule, search, settings, sort, star, swap_vert,
trending_down, trending_up, unfold_more, upload, view_kanban, view_list, visibility, visibility_off, warning.

A glyph that is not in the list is a NEW PATTERN (icon): report the Material Symbols name; do not draw it or import
another icon pack.

## Tokens

Never hard-code a value. Variable collections:

| Collection | Modes | Variables | Contents |
|---|---|---|---|
| Primitives | Value | 70 | violet, slate, lime, green, amber, red, blue scales and alpha colours. Hidden from publishing, scopes empty |
| Color | Light, Dark | 69 | `color/bg/*` (24), `color/text/*` (13), `color/icon/*` (10), `color/border/*` (7), `color/control/*` (2), `color/avatar/*` (10), `color/effect/*` (3) |
| Spacing | Value | 15 | `spacing/0` to `spacing/64`, plus `spacing/-4` for the Avatar Stack overlap |
| Radius | Value | 7 | `radius/none`, `xs` 4, `sm` 6, `md` 8, `lg` 12, `xl` 16, `full` |
| Size | Value | 10 | `size/icon-xs` to `icon-lg` (12 to 24), `size/control-sm\|md\|lg` (28, 36, 40), `size/avatar-sm\|md\|lg` (24, 32, 40) |
| Typography | Value | 24 | `font/family/*`, `font/weight/*`, `font/size/*`, `font/line-height/*`: the text styles are bound to these |

Text styles: Display/Large and Small, Heading/1 to 4, Body/Large (Regular, Medium), Body/Medium and Body/Small (Regular,
Medium, SemiBold), Label/Large, Medium, Small and Caps, Caption (Regular, Medium), Mono/Medium and Mono/Small. Effect
styles: Shadow/XS, SM, MD, LG and Focus/Ring; their colours are the `color/effect/*` tokens, so they deepen in Dark.
WEB code syntax is `var(--lw-...)` on every published variable.

## Glossary: what people call things

| People say | Use |
|---|---|
| button, CTA, action | Button (Primary once per view) |
| icon button, close button, kebab, three-dot button | Icon Button (Ghost, more_vert or more_horiz) + Menu |
| input, textbox, form field, select box, date field | Text Field (select: trailing icon expand_more; date: calendar_month) |
| search, search bar, command search | Search Field |
| dropdown, picker, autocomplete list, filter list | Dropdown Panel (rows are Select Option) |
| checkbox, tick box | Checkbox |
| radio, option button | Radio |
| toggle, on/off | Switch |
| segmented control, view switch, board/list toggle | Segmented Control |
| tabs, tab strip, sub-nav | Tab Bar |
| sidebar, left nav, navigation | Sidebar (entries are Nav Item) |
| pill, tag, chip, status, label | Badge |
| banner, callout, notice, inline message | Alert |
| snackbar, notification, confirmation message | Toast |
| hint, hover text | Tooltip |
| progress, completion bar | Progress Bar |
| loader, loading | Spinner |
| profile picture, user image, initials | Avatar |
| assignees, people on a row, owners | Avatar Stack |
| KPI, metric, stat, headline number | Stat Card |
| list, grid, data table, task list | Table (rows Table Row, cells Table Cell) |
| context menu, action menu, overflow menu | Menu (items are Menu Item) |
| modal, popup, confirmation | Dialog |
| page title, header, breadcrumb | Page Header |
| tile, panel, widget, box | Card |
| zero state, no data, no results | Empty State |
| dark mode, dark theme | set the Color collection to Dark on the frame |

## Designed ahead of code

Components, variants and tokens that library sessions added as **new design**: the library has them and the product
does not yet, so developers build them from the library. Each has `Status: designed in vX.Y, not built in code yet.` as
the status line of its description. When developers have built one, change the status line to `Status: built. Code:
<selector>.` and remove its row here.

| Component or token | Library version | Planned code name |
|---|---|---|
| All 34 components and every token of v0.1.0 | v0.1.0 | the `lw-` names in the tables above; tokens use their WEB code syntax |

## Exists in the product, not in the library yet

Nothing yet. If a screen needs something that exists in the product today and is missing here, it is a request-from-code
issue (`.github/ISSUE_TEMPLATE/request-from-code.yml`).
