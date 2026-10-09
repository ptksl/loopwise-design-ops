# Designer guide: Figma, Claude Code and the Loopwise Design System

For: Prateek S, lead designer, and the designers he works with. Last updated: 2026-10-09 (library v0.1.0).

Read Part 0 to 2 once. Do Part A to C once (about an hour). Part D is your daily routine for screens, Part E proves a
file is clean, Part F keeps you current, Part G is how you add to the design system yourself, Part H is the one
exception that needs a design engineer, Part I fixes common problems.

## 0. The idea in one minute

- One Figma library, **Loopwise Design System**, holds every component, colour, text style, spacing value and icon, in
  Light and Dark. New design is made in it first; developers build from it.
- You build every screen **only from that library**. You never draw your own button and never detach an instance.
- **Claude Code** (the Code tab of the Claude desktop app) does the building with you. This repository holds the rules,
  the component list, the library standards and the checks. Claude reads them by itself when you open the folder.
- When a screen needs something the library does not have, Claude says **NEW PATTERN**, stops, and asks one question:
  is it new design, or does it already exist in the product?
  - **New design** (nearly always, including a redesign): you add it to the library yourself in a **library session**
    (Part G), publish it, then use it.
  - **Exists in the product and has to look exactly the same**: it is reproduced from the product's code by a design
    engineer (Part H).
- Before every handoff you run **the check** on the screen file. It has to say `clean: true`. Before every library
  publish you run **the library QA**.

```
Screen (screen session: library instances only)
          |
   NEW PATTERN: new design, or already in the product?
          |                                   |
     new design                          exists in the product
          |                                   |
   Library session (Part G):            GitHub request -> design engineer (Part H)
   plan, OK, build, QA, you publish     reproduces it from the code
          |
   update your file + refresh the repository -> use it -> run the check
```

## 1. Who does what

| Person | Does |
|---|---|
| Prateek S, lead designer | Runs the design system end to end: builds and reviews screens, decides what goes into the library, adds it with Claude, publishes it, keeps this repository current, chooses who else may add to the library |
| Designers | Build screens in screen sessions. Add to the library only when nominated |
| Design engineer | Exceptions only: reproduces something that exists in the product from its code, and brings the library back in step when the code changed |
| Figma admin | Seats, folder access and which libraries are on by default |

## 2. Before you start: access checklist

- [ ] **Figma seat.** A Full seat on the Figma plan that owns the library file (a Dev or View seat cannot edit).
- [ ] **Library.** You can open **Loopwise Design System** and, if you add to it, edit it.
- [ ] **GitHub.** Write access to this repository: you commit and push after a library session.
- [ ] **Claude.** A Claude plan that includes Claude Code (the free plan has no Code tab).

## Part A. GitHub: get the repository

1. Install **GitHub Desktop** (`https://desktop.github.com`) and sign in.
2. **Clone** this repository (File, Clone repository) into a normal folder such as `Documents/Loopwise/loopwise-design-ops`.
   Not a folder that iCloud, OneDrive or Dropbox syncs.
3. **Pull before every working day**: Fetch origin, then Pull origin if it offers to.
4. **What changes in this folder.** In a library session Claude changes `registry.md`, the generated block of `check.js`
   and the QA report; you commit those. Nothing else changes by hand. If you think a rule is wrong, ask Claude to propose
   the change and read the diff before you commit.
5. **Commit and push.** In GitHub Desktop read each changed file, write a summary such as
   `Library v0.2.0: Date Picker (registry, check keys)`, click **Commit to main**, then **Push origin**. If the push is
   rejected because someone else pushed first: Fetch origin, Pull origin, Push origin.
6. Optional: with Git installed you can say "pull the latest" or "commit and push" to Claude instead. Claude commits and
   pushes only when you ask.

## Part B. Claude Code in the Claude desktop app

1. Install the Claude desktop app and sign in. Open the **Code** tab.
2. Choose **Local**, click **Select folder** and pick this repository's folder. Claude reads `CLAUDE.md`: you paste
   nothing.
3. Click **+** next to the prompt box, then **Connectors**, and connect **Figma** with your Figma account.
4. Test the connection: `Run whoami with the Figma connector and show me the plans.` You should see your Full seat.
5. Test the rules: `What are the rules for building in Figma in this folder?` Claude should mention the reuse table, the
   registry, the library only, requirement annotations, and that missing components are added in a library session.
6. Good habits: one screen or one change per session; a library session is always its own session. Figma's version
   history takes you back from anything.

## Part C. Create a screen file

1. In the Figma file browser, open the team folder for the feature, **+ Create**, **Design**, and name the file after the
   feature (for example `Loopwise · Q4 Launch`).
2. **Add the library**: Assets, the Libraries icon, **Loopwise Design System**, **Add to file**. Remove every other
   library. "This file" must list only Loopwise Design System.
3. **Pages**: a `Thumbnail` page, a `---` divider, one page per feature area, another `---`, then `Sandbox`.
4. **Start from the example**: copy **Example / Project tasks · Light** from the library's Examples page into a feature
   page and change it. It is built only from library instances.
5. **Run the check** on the file (Part E). It must say `clean: true`.
6. **Save a version** (File, Save to version history) at each milestone.

## Part D. A normal working session (screens)

1. Pull the repository (A3). In Figma, accept the library update if one is waiting (Part F).
2. Start a new Claude Code session on this folder for each screen.
3. Send the request with the link to the page or section, and the requirements, one per line:

   ```
   Build the Project tasks screen in https://www.figma.com/design/<file>?node-id=<section>
   Start from Example / Project tasks · Light.
   Requirements:
   - The page title is Q4 Launch with an On track status
   - The table shows Task, Status, Assignee, Due and Points
   - Selecting rows shows a bulk action toast
   ```

4. Claude shows a **reuse table**: every element next to the library component it will use, or NONE. Read it. A NONE is a
   **NEW PATTERN**: say `new design` and start a library session (Part G), or `exists in the product` and file the
   request (Part H). Reply `OK` or correct a row. Claude does not build until you say OK.
5. Claude builds from library instances, variables and text styles only, adds each requirement as an annotation on the
   part it describes, and reports: instances used, local components created (0), hard-coded fills (0), every NEW
   PATTERN, the annotations added and any Question that needs your answer.
6. Ask for changes in plain words. After you change a requirement, say `update the annotations`.
7. To preview Dark, ask Claude to switch the frame's Color mode to Dark, or do it yourself in the right panel
   (Appearance, the variable mode). Never recolour by hand.
8. When the screen is done: `run the check on <file link>`, fix what it lists, save a version, and mark the section
   **Ready for dev**.

## Part E. Prove the file only references the design system

Type `run the check on <file link>`. Claude runs `check.js` read-only and reports:

| Field | Means | Fix |
|---|---|---|
| `clean` | Everything below is zero | Done |
| `foreignInstances` | An instance from another library | Swap it for the Loopwise component, or ask Claude to rebuild the frame |
| `localComponents`, `instancesOfLocalComponents` | A component made inside this file, and its instances | Swap the instances for library components, delete the local component |
| `possibleDetached` | A frame named like a library component that is not an instance | Delete it and place the real instance |
| `hardCodedColours` | A raw colour instead of a variable (also inside instances) | Bind it to the colour token, or reset the instance's overrides |
| `textWithoutLibraryStyle` | Text with no library text style | Apply the matching style |
| `foreignOrLocalStylesUsed`, `foreignOrLocalVariablesUsed` | A style or variable not from the design system | Replace it with the library one |
| `localStylesInFile`, `localVariableCollections` | Styles or variables the file owns | Delete them once nothing uses them |
| `otherLibrariesOn` | Another library is added | Remove it from the file |
| `stoppedEarly` | The run hit its limit (`notScanned` lists the rest) | Run those pages next |

If a component you just published shows as foreign, the key tables are behind: finish the library session (G7), or pull.

## Part F. Keep the design system up to date

1. **Update the library in your file**: Libraries icon, Updates tab, **Update all**, at the start of each day.
2. **Pull the repository** (A3), so Claude's component list and the check match the published library.
3. **Read what changed**: the last row of the library's Changelog page. "Breaking:" means existing screens can change.

## Part G. Add new UI elements to the design system yourself

1. **Start a library session** in a new Claude Code session on this folder:

   ```
   Library session: add <name> to the design system.
   What it is: <one sentence>
   Used on: <the screen>
   States and sizes: <default, hover, disabled, small and large, with or without an icon, ...>
   Figma: <link to the frame that needs it>
   ```

2. **Read the plan, then say OK.** Claude first tries to compose it from what exists. The plan lists every component,
   variant, token (with Light and Dark values), page and status line. Check that the name is what people will call it,
   that it is not a second version of something that exists, and that every value is a token.
3. **Claude builds it** in the library file: tokens, component, documentation on its page.
4. **Look at it in Light and Dark, and run the library QA** (`Run the library QA`). Every count must stay at 0.
5. **Publish it yourself** in Figma: Libraries icon, This file, **Publish...**. Read the list "Changes (n of n)": it must
   hold what Claude reported plus the components that contain it as a nested instance, nothing else. Write a
   description such as `v0.2.0: Date Picker (new).`, click **Publish**, keep the window visible until it finishes.
6. **Update your screen file** (Part F).
7. **Tell Claude `published`.** It confirms the component can be found, adds the Changelog row, updates `registry.md`,
   regenerates the key tables in `check.js`, updates the QA report and runs the check on your screen file. Then
   `commit and push`, and tell the other designers to pull and update.
8. **Use it**: `Use the new <name> on <frame link>` and replace the Question annotation.

Changing something already published: new variants, properties and components are additive and safe. Renaming or
removing a variant, a property or a layer people override is a **breaking change**: the Changelog says "Breaking:" and
the team hears about it before the publish. Never delete a published component: it moves to `Deprecated`.

## Part H. The one exception: something that exists in the product

Only when something exists in the product today, has to look exactly the same, and the library lacks it, or when the
product changed and the library no longer matches it.

1. Do not draw a stand-in. Use the closest library component and a Question annotation:
   `Question: exists in the product, not in the library yet: <name>. Request: <issue number>.`
2. File the request: GitHub, Issues, New issue, **Bring something from the product's code**. Claude can draft it:
   `draft a request from code for <name>`.
3. The design engineer reproduces it from the code in a library session, a designer publishes it, the repository is
   refreshed, and the issue closes with a link and a Changelog row.

## Part I. When something goes wrong

| What you see | Do this |
|---|---|
| Claude cannot find a component | Add Loopwise Design System to the file; pull; check that the library session was published |
| Claude draws its own copy | Start a session on this folder itself; say `Stop. List the local components you created.` then `run the check` |
| `whoami` shows the wrong account | Settings, Connectors, Figma: disconnect and connect with the right account |
| Claude reports a rate limit | Figma limits connector calls per seat (on a paid Full seat about 200 a day): wait, or split the work into smaller requests |
| The publish dialog lists something you did not change | Do not publish. Open the library's version history and ask Claude to explain each change |
| The library QA reports more than 0 | Ask Claude to fix the layers it lists, then run it again |
| A screen changed after a library update | Restore from version history, read the Changelog row, then fix the library or the screen |
| Push is rejected | Fetch origin, Pull origin, Push origin |

## Part J. The rules in ten lines

1. Screens: library instances, library variables, library text styles. Nothing else.
2. Read the reuse table before you say OK.
3. A NONE row is a NEW PATTERN. New design: add it to the library yourself. Exists in the product: request from code.
4. In a screen session never detach, never create a component, never edit the library file.
5. In a library session compose before you create, read the plan before you say OK, keep the library QA at 0.
6. You publish by hand, with only your own changes in the dialog. Then let Claude refresh the repository, commit, push.
7. Light by default, Dark by switching the frame's mode. Never recolour by hand.
8. Desktop frames, 1440 wide.
9. Placeholder data only. Requirements go on the canvas as annotations: say `update the annotations` when they change.
10. Update the library and pull the repository every day. Run the check before every handoff.

## Appendix. Prompts to copy

```
Run whoami with the Figma connector and show me the plans.
Build the <screen> in <link>. Start from Example / Project tasks · Light. Requirements: <one per line>
Show me which library component each element of <frame link> uses.
Switch <frame link> to Dark.
Update the annotations on <frame link>: the requirements are now <list>.
Run the check on <file link>.
Pull the latest from GitHub and tell me what changed.

Library session: add <name> to the design system. What it is: <...> Used on: <...> States and sizes: <...>
Run the library QA.
Published. Finish the library session.
<Name> is built in code, the selector is <selector>.
Commit and push.
Draft a request from code for <name>.
```
