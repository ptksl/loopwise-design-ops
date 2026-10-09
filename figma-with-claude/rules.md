# Figma with Claude: rules for designers

Last updated: 2026-10-09. Lead designer: Prateek S. A design engineer is needed only for exceptions (something that
exists in the product and has to be reproduced from its code).

Claude edits our Figma files through the Figma connector. Without rules it tends to build its own components instead of
reusing the library. These rules make it check first, show you what it found, and wait for your OK. They also make it
put each screen's requirements on the canvas as annotations, so developers read them in Dev Mode.

These rules are for **screen sessions**: building and reviewing a screen file. Adding to the design system itself, when
a screen needs something new, is a **library session** with its own rules in
[library-authoring.md](library-authoring.md); a designer starts one by saying "Library session: add <name>".

The library is **Loopwise Design System**. It is the only library a screen file uses.

## Set up once (Claude Code in the Claude desktop app)

The full step-by-step guide is [designer-guide.md](designer-guide.md). In short:

1. Clone this repository and open that folder in the **Code** tab of the Claude desktop app (Select folder).
   `CLAUDE.md` loads these rules for you, so there is nothing to paste.
2. In the Code tab click **+**, then **Connectors**, and connect **Figma** with the Figma account that has a Full seat
   and edit access to the file you work in.
3. In your Figma file open Assets, click the Libraries icon (the book), find **Loopwise Design System** and Add to file.
   Remove every other library. Claude only finds the library in a file where it is added.
4. Start each working day with a pull (GitHub Desktop: Fetch origin, then Pull origin) so the registry and the check
   match the published library.
5. Paste the Figma file URL into the first message of a session.

## How a session goes

1. You: "Build the <screen> in <file URL>. Requirements: <one per line, or a link>."
2. Claude shows a reuse table: each UI element, with the library component (name and key) or NONE.
3. You check the table and reply OK, or correct it. Anything marked NONE is a NEW PATTERN. Claude asks one question:
   is it new design, or does it already exist in the product? New design you add to the library yourself in a library
   session, then use it; something that exists in the product and has to look the same is a request to the design
   engineer. Either way Claude carries on with the closest library component and a Question annotation.
4. Claude builds from library instances only and adds your requirements as annotations on the parts they describe,
   then reports: instances used, local components created (should be 0), hard-coded fills (should be 0), annotations
   added per frame.
5. Say "run the check" for a read-only scan of the file for stray local components and hard-coded values.

Starting a screen: copy the frame **Example / Project tasks · Light** from the library's Examples page (Sidebar, Page
Header with tabs, Stat Cards, Table) and change it, instead of rebuilding the shell.

## Requirement annotations

Each screen's requirements live on the canvas as native Figma annotations, pinned to the layer they describe, so
designers see them in Design mode and developers in Dev Mode. Send the requirements with the request.

- Three annotation categories: **Requirement** (yellow) for a requirement, **Logistics** (orange) for a question or
  limit for engineering, **Question** (blue) for a product question or something for later. Claude creates a category
  if the file does not have it yet.
- One requirement per annotation, in your words. A requirement about the whole screen is pinned to the frame.
- Claude ends every annotation it writes with a last line `Claude for <your first name>`, and only ever edits or
  deletes annotations that end that way. Annotations written by people are never touched. After you change a
  requirement, say "update the annotations".

## Rule block (Claude Code reads it from here through CLAUDE.md)

```
You edit Figma files for Loopwise through the Figma connector. Figma is the system of record.
The Loopwise Design System is the only source of components, variables and styles.

Before you start
1. Before any use_figma call, load the Figma skills figma-use and figma-generate-design. If they
   are not already loaded, read them with get_figma_skill (skill://figma/figma-use/SKILL.md and
   skill://figma/figma-generate-design/SKILL.md).
2. Work only in the file I give you, and only on the frames or pages I name. Call get_libraries
   for the file. Use Loopwise Design System. Tell me if any other library is added. In a screen
   session never edit the library file itself (Loopwise Design System, key mePj303lAcqSyWVjZodZWp)
   and never publish a library: a change to the library is a library session
   (library-authoring.md).

Reuse first
3. Before adding or swapping any component, make a REUSE TABLE, one row per UI element:
   element -> library component (name + key) or NONE. Check the registry (registry.md in this
   repository) first; if a name is not in the registry, check its glossary, then run
   search_design_system, before you write NONE. Also list matching components already in this file.
4. Show me the table and wait for my OK. Do not build until I say so. You may skip the table
   for edits that add or swap no components (for example changing text).
5. Never create a component (no createComponent), never detach an instance, and never draw a
   stand-in for a component. If a row is NONE, stop and tell me what is missing as NEW PATTERN,
   with the closest existing component. A missing icon is a NEW PATTERN too: give its Material
   Symbols name. Then ask me one question: is it new design, or does it already exist in the
   product and has to look the same? New design: offer a library session and carry on with the
   closest component and a Question annotation "Question: new component needed: <name>". Exists
   in the product: draft the request (.github/ISSUE_TEMPLATE/request-from-code.yml) for me to file
   and leave a Question annotation "Question: exists in the product, not in the library yet:
   <name>". Do not build the missing piece either way.
6. If a close component lacks a variant, use the closest one and tell me. Do not rebuild it.
7. Never duplicate a component that already exists in this file or in the library.

Building
8. Build only from library component instances, variables and library text styles. Set Type, Size
   and State and the instance properties (Label, Show ... icon, icon swaps) instead of editing
   inner layers. No hard-coded hex or pixel values when a variable or style exists; if none exists,
   say so. Read the description of a component before you use it. Frames you create default to a
   white fill: bind it to color/bg/canvas or clear it.
9. Desktop frames, 1440 wide unless I say otherwise. Light theme by default. For Dark, set the
   Color collection's mode on the frame to Dark; never recolour a layer by hand. No phone or
   tablet frames unless I ask.
10. Use placeholder data only, never real customer names, people or numbers. This includes
    annotations: swap a real name or number in a requirement for a placeholder and tell me.

Requirement annotations
11. For every screen you build or change, add the requirements I gave you as native Figma
    annotations (node.annotations) in the category Requirement; create the categories Requirement
    (yellow), Logistics (orange) and Question (blue) if they are missing. If I gave no
    requirements, add none and say so.
12. One requirement per annotation, in my words: a short statement, sub-points on separate lines.
    Do not invent, merge or reword requirements. If one is unclear, add a Question annotation that
    starts "Question:" and ask me in your report. A question or limit for engineering is a
    Logistics annotation that starts "Logistics:".
13. Pin each annotation to the layer it describes; a requirement about the whole screen goes on the
    frame. End every annotation you write with a last line "Claude for <my first name>" (take it
    from the handle whoami returns, or ask me once).
14. When you change a screen that already has annotations, edit only the ones that end with
    "Claude for ...": update the text when a requirement changed, add one for a new requirement,
    delete one whose requirement I removed. Never edit or delete an annotation someone else wrote.

When you finish
15. Report: library instances used, local components created (must be 0), hard-coded fills
    (must be 0), every NEW PATTERN, and the annotations: per frame, how many you added, updated and
    deleted, plus every Question annotation that needs my answer.
16. When I say "run the check", read check.js (in this repository), run it with use_figma on the
    file I name (it is read-only; never on the library file) and report its summary. For each
    non-zero item name the layers and say how to fix it.
```

## If it still builds duplicates

- Pull the latest from GitHub, then check the registry date. If the library was published since and the registry is
  older, the library session that published it was not finished (step 7 of library-authoring.md): finish it.
- In the file, open Assets, then Libraries, "This file": Loopwise Design System should be the only library added.
- Tell Claude: "Stop. List the local components you created and which library component each should have been." Then
  say "run the check".
- Send the file link to the lead designer.
