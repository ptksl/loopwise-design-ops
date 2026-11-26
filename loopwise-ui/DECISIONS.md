# Decisions

| Decision | Why | Cost |
|---|---|---|
| Point shadcn's names (`--primary`) at Loopwise tokens | Any shadcn component added later is on brand straight away | One more layer to trace |
| Hover and pressed are named tokens, not `primary/80` | They are designed for each theme and can be checked for contrast | More tokens |
| A loading button keeps keyboard focus | It uses `aria-disabled`, because `disabled` drops focus | The click is blocked in code |
| A loading button keeps its width | The label fades out but stays in place, so nothing jumps | Extra markup |
| Tabs have one sliding indicator | It shows where you came from | It measures the selected tab in the browser |
| The selected tab's bold width is reserved | In Figma the selected tab is 1px wider, so its neighbours move | The label renders twice, once hidden |
| Underline tabs are always 40px | In Figma they grow from 38 to 40 on hover, so the row jumps | Differs from Figma until Figma is fixed |
| Dialog opens in 200ms and closes in 120ms | The user has already decided to leave | Two values to keep in step |
| Dialog has its own motion tokens | It can be retimed without touching Tabs | One more alias |

## Known gaps

- Motion tokens, button loading, and tab focus and disabled states are not in Figma yet.
- The destructive dialog uses Dialog. Radix AlertDialog may fit better, because it does not close on an outside click.
- Not tested: a real screen reader, reduced motion on a device, Safari and Firefox.
