# loopwise-design-ops

Rules, registry, checks and the design-system spec that make Claude build Loopwise screens only from the Loopwise
Design System in Figma, instead of drawing its own components, and that let the designers grow that design system
themselves.

**Designers: start with [figma-with-claude/designer-guide.md](figma-with-claude/designer-guide.md).** You clone this
repository and open it in the **Code** tab of the Claude desktop app; `CLAUDE.md` loads the rules, so there is nothing
to paste.

## How it works

Figma holds the designs and the library. This repository holds the instructions, the component list and the scripts
that tell Claude how to use that library. GitHub keeps one shared copy, so every designer's Claude follows the same
rules and knows the same components.

```
Screen session                         Library session
(screen file, library instances only)  (library file: plan, OK, build, QA)
        |                                       |
  NEW PATTERN? ---- new design --------------> designer publishes in Figma
        |                                       |
  run the check (clean: true)          Claude updates registry.md + check.js keys
                                                |
                                       commit and push  ->  everyone pulls
```

- **Pull** every morning, so your Claude knows every component that was published.
- **Commit and push** after a library session, so everyone else's Claude does too.
- If you skip either, Claude reports a published component as a NEW PATTERN and the check reports it as foreign.

## Who does what

- **Prateek S, lead designer**, drives the whole process: the screens, what goes into the design system, adding it with
  Claude, publishing the library, keeping this repository current. He nominates the designers who may add to the
  library.
- **Designers** build screens in screen sessions, and add to the library in library sessions when nominated.
- **A design engineer** is needed only for exceptions: reproducing something that already exists in the product from
  its code, and bringing the library back in step when the code changed. Everything new in design is made in the
  library first, and developers build it afterwards.

## Contents

Root
- `CLAUDE.md`: what Claude Code reads when a session starts in this folder: screen sessions (the default), library
  sessions (adding to the design system) and the exceptions.
- `.github/ISSUE_TEMPLATE/request-from-code.yml`: the form for the exceptions that need the product's code.

`figma-with-claude/`
- `designer-guide.md`: the step-by-step guide for designers, with a short maintainer runbook.
- `rules.md`: the rules and the Rule block Claude follows in a screen session, including requirement annotations.
- `library-authoring.md`: how a library session works: compose before you create, the library plan, the standards a
  library component meets, the QA baseline and what to do after a publish.
- `registry.md`: component keys, properties, a glossary and what is designed ahead of code, for the **Loopwise Design
  System** (v0.1.0, 2026-10-09: 29 component sets, 5 single components, 64 icons).
- `check.js`: a read-only script Claude runs through `use_figma` on a screen file. It proves that every instance, style
  and variable comes from the design system and lists local components, hard-coded colours, text without a library
  style, detached copies and other libraries that are added to the file.
- `library-qa.js`: a read-only script Claude runs on the library file itself before every publish: unbound values, text
  without a style, contrast, default names, descriptions, variant names, scopes and code syntax.
- `list-library-keys.js`: run it on the library file after each publish and paste its output over the generated key
  tables inside `check.js` (Claude does this at the end of a library session).

`design-system/`
- `spec.md`: the architecture, tokens, components, principles and governance of the system.
- `qa-report.md`: the library QA results, the contrast table for Light and Dark, and the CSS variables developers need.

## Keeping this repository current (end of every library session)

1. The designer publishes the library in Figma (guide, Part G), then tells Claude "published".
2. Claude confirms the new component is found, adds a row to the library's Changelog page, updates `registry.md` (keys,
   properties, counts, date, glossary, "Designed ahead of code"), runs `figma-with-claude/list-library-keys.js` with
   `use_figma` on the library file and replaces the block between `BEGIN GENERATED KEYS` and `END GENERATED KEYS` in
   `check.js`, updates the token list in the QA report, and runs the check on the screen file.
3. The designer reviews the diff in GitHub Desktop, commits and pushes. The other designers pull and update the library
   in their files.

## Facts

- Library file: **Loopwise Design System**, key `mePj303lAcqSyWVjZodZWp`, version **v0.1.0** (2026-10-09). The check
  compares library names, so the Figma file must carry exactly that name. Publishing needs a Full seat and edit access
  to the file.
- Key tables in `check.js`: generated 2026-10-09 from v0.1.0, digest `8038b7256e734` (34 components, 64 icons,
  27 styles, 5 published variable collections; Primitives is hidden from publishing).
- `library-qa.js` on v0.1.0: 1,858 layers on 10 pages, every count 0. That is the baseline: a change must keep it at 0.
- Themes: Light and Dark are modes of the Color collection. A frame switches theme by its variable mode; nothing is
  recoloured by hand.
- Source of truth: for what exists in the product today, the product's code: the library follows it. For new design, the
  library: designers design in it first and developers build from it. Those components say `designed in vX.Y, not built
  in code yet` in their description and are listed in `registry.md` under "Designed ahead of code".
