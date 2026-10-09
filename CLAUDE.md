# loopwise-design-ops: instructions for Claude

This repository is the rulebook for building Loopwise screens in Figma with Claude, and for growing the design system
those screens are built from. The Figma library is **Loopwise Design System** (file key `mePj303lAcqSyWVjZodZWp`). The
designers drive the whole process: Prateek S is the lead designer and decides what goes into the library, adds it,
publishes it and keeps this repository current. A design engineer is needed only for the exception below. New here?
The step-by-step guide is `figma-with-claude/designer-guide.md`.

## Who is asking

Treat the user as a **designer**. There are two kinds of session. Say which one you are in if it is not obvious.

### Screen sessions (the default): build and review screens

A designer builds or reviews a screen file (a working file for a feature or a sprint). Follow the Rule block in
@figma-with-claude/rules.md for every Figma task, exactly as written. In short: read `figma-with-claude/registry.md`
first, show a REUSE TABLE and wait for an OK, build only from library instances, variables and styles, never create or
detach a component, put the requirements on the canvas as annotations, use placeholder data, and finish with the
report.

Also:

- Before the first Figma call of a session, run `whoami` and `get_libraries` for the file. Stop and tell the user if
  their seat on the plan that owns the file is not Full, if Loopwise Design System is not added to the file, or if any
  other library is added.
- Never edit the library file `mePj303lAcqSyWVjZodZWp` and never publish a library in a screen session.
- **When a row is NONE (a NEW PATTERN), ask one question:** "Is this new design, or does it already exist in the product
  and has to look the same?" Do not build it in the screen file and do not draw a stand-in, whatever the answer.
  - New design, or a redesign: offer a library session ("I can add it to the design system first and then use it here.
    Open a new session and say: Library session: add <name>"). Carry on with the closest library component and a
    Question annotation `Question: new component needed: <name>` until it is published.
  - Exists in the product and must match it: this needs the product's code, which designers do not have. Draft the
    request from `.github/ISSUE_TEMPLATE/request-from-code.yml` for the designer to file, leave a Question annotation
    `Question: exists in the product, not in the library yet: <name>. Request: <issue number>.`, and carry on with the
    closest library component.
- In a screen session do not edit, commit or push any file in this repository. Reading is fine. When asked to "pull the
  latest", run `git pull --ff-only` and summarise what changed with `git log --oneline`.
- "Run the check on <Figma URL>": read `figma-with-claude/check.js`, run it with `use_figma` on that file (it is
  read-only; set PAGE_IDS to a few pages for a big file), and report the `summary` as a short table. If
  `summary.stoppedEarly` is true, run the pages listed in `notScanned` next (PAGE_IDS takes their ids) and combine the
  results. For each non-zero item list the layer names and how to fix it (Part E of the guide). Say plainly when
  `summary.clean` is false. If the file is the library itself, refuse: the check is for working files (the library has
  its own QA, below). If `keysFrom` is older than the library version in `registry.md`, tell the user to pull the
  latest first.
- Use placeholder data only. Never put real customer names, people or numbers into Figma, into annotations or into
  this repository.

### Library sessions: add or change something in the design system

Start one when the user asks to add or change a component, variant, state, token, text style or icon in the library
("Library session: add <name>"), or accepts your offer after a NEW PATTERN. A library session works in the library file
only; it never touches a screen file. The lead designer and the designers the lead nominated do these; Figma decides who
may edit the file, so if a write fails with a permission error, stop and tell the user to ask the lead designer.

Follow @figma-with-claude/library-authoring.md exactly. In short: ask whether it is new design or already in the product
(if it is already in the product and must match it, it is not a library session: draft the request as above); run
`whoami` and read `registry.md`; look at the nearest component in the library; try to compose it from what exists before
creating anything; show a library plan table and wait for the designer's OK; load the skills `figma-use` and
`figma-generate-library`; build tokens first (a Light and a Dark value for every new colour), then the component, then
its documentation on its page; run the library QA and compare it with the baseline; stop and let the designer publish
(Part G of the guide); after the designer says "published", add the Changelog row and refresh this repository.

- **"Run the library QA"**: read `figma-with-claude/library-qa.js`, run it with `use_figma` on the library file (it is
  read-only; set PAGE_NAMES to the pages that changed for a quick run) and report `summary` as a short table next to the
  baseline in `library-authoring.md`. List every item that is above the baseline with its layer name.
- Never publish on your own. Publishing is done by a person in the Figma app, who must see which changes are in the
  dialog; an interrupted publish can leave the library half published.
- After the publish you may edit, in this repository: `figma-with-claude/registry.md` (rows, counts, date, glossary,
  "Designed ahead of code"), the generated block of `figma-with-claude/check.js` (run
  `figma-with-claude/list-library-keys.js` on the library file and replace the block between `BEGIN GENERATED KEYS` and
  `END GENERATED KEYS`), the token list in `design-system/qa-report.md` and the baseline numbers there and in
  `library-authoring.md` if they changed. Commit and push only when the designer says so, with a message that names the
  library version.
- If the designer wants a rule changed, propose the change to `rules.md`, `library-authoring.md` or this file and show
  the diff; edit only after they agree.

### Exceptions (design engineer)

Only when something has to be reproduced from the product's code: an element that exists in the product today and is
not in the library, or a library that no longer matches the product because the code changed. The design engineer does
these in a library session that has the product repository open: read the code, build the piece in the library from the
code's real values (and set the status line of its description to `Status: built. Code: <selector>.`), run the library
QA, then a designer publishes it like any library change, you refresh this repository as above, and the engineer closes
the GitHub issue with a link and a Changelog row. The code wins whenever the product and the library disagree about
something that exists in the product today; components marked `designed in vX.Y, not built in code yet` are ahead of
the code on purpose.

## Where things are

- `figma-with-claude/rules.md`: the rules and the Rule block for screen sessions.
- `figma-with-claude/library-authoring.md`: how a library session works, the standards a library component meets and the
  QA baseline.
- `figma-with-claude/registry.md`: every library component with its key, properties and the words people use for it,
  plus what is designed ahead of code.
- `figma-with-claude/check.js`: the read-only check that proves a screen file only references the design system.
- `figma-with-claude/library-qa.js`: the read-only QA of the library file itself, run before every publish.
- `figma-with-claude/list-library-keys.js`: regenerates the key tables inside `check.js` after a publish.
- `figma-with-claude/designer-guide.md`: the guide for designers (GitHub, Claude Code, screen files, screens, adding to
  the design system, updates, exceptions, verification).
- `design-system/`: the spec and the QA report (contrast results, the CSS variables developers need, the QA baseline).
- `.github/ISSUE_TEMPLATE/request-from-code.yml`: the form for the exceptions that need the product's code.
