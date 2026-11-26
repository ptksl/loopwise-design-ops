# Decisions

Draft by Claude from the build. Prateek: rewrite each one in your own words, and drop any you would not defend.

| Decision | Why | Cost |
|---|---|---|
| Bridge shadcn's names (`--primary`) to Loopwise tokens | Any shadcn component we add later is on brand straight away | One more layer to trace |
| Delete variants Loopwise does not have (link, xs) | A smaller set is easier to adopt | More lines differ from upstream |
| Hover and pressed are named tokens, not `primary/80` | They are designed per theme and can be checked for contrast | More tokens |
| Loading uses `aria-disabled`, not `disabled` | `disabled` drops keyboard focus | We block the click ourselves |
| Loading hides the label with opacity | The width holds and the name stays readable | Extra markup |
| `loading` is ignored with `asChild` | Slot needs exactly one child | Links cannot show loading |
| Tabs indicator is one sliding element | It shows where you came from | It measures the DOM, and animates width |
| A hidden semibold label reserves tab width | In Figma the selected tab is 1px wider, so neighbours move | The label renders twice |
| Underline tabs are always 40px | In Figma they go from 38 to 40 on hover, so the row jumps | Differs from Figma until Figma is fixed |
| Dialog opens in 200ms and closes in 120ms | The user has already decided to leave | Two tokens to keep in step |
| Dialog has its own motion tokens | It can be retimed without touching Tabs | One more alias |

## Known gaps

- Motion tokens, button loading, and tab focus and disabled states are not in Figma yet.
- The destructive dialog uses Dialog. Radix AlertDialog may fit better, because it does not close on an outside click.
- Not tested: a real screen reader, reduced motion on a device, Safari and Firefox.
