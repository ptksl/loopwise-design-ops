// Loopwise library key listing. READ-ONLY. Run it with use_figma on the LIBRARY file (key mePj303lAcqSyWVjZodZWp)
// after every publish. It returns `region`: the block of check.js between "BEGIN GENERATED KEYS" and
// "END GENERATED KEYS". Replace that block in check.js with it, then run the check on a test file.
// It also returns the counts (compare them with registry.md) and a digest of the tables.
for (const p of figma.root.children) await p.loadAsync();

const comps = {};
let sets = 0, singles = 0, icons = 0;
for (const p of figma.root.children) {
  for (const n of p.findAll(n => n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent && n.parent.type !== 'COMPONENT_SET'))) {
    comps[n.key] = n.name;
    if (n.type === 'COMPONENT_SET') sets++; else if (/^Icon\//.test(n.name)) icons++; else singles++;
  }
}
const styles = {};
for (const s of [...await figma.getLocalTextStylesAsync(), ...await figma.getLocalEffectStylesAsync(), ...await figma.getLocalPaintStylesAsync(), ...await figma.getLocalGridStylesAsync()]) styles[s.key] = s.name;
const colls = {};
for (const c of await figma.variables.getLocalVariableCollectionsAsync()) if (!c.hiddenFromPublishing) colls[c.key] = c.name;

// Version = the highest x.y.z row on the Changelog page.
let version = 'unknown';
const log = figma.root.children.find(p => p.name === 'Changelog');
if (log) {
  await log.loadAsync();
  const found = log.findAll(n => n.type === 'TEXT' && /^\d+\.\d+\.\d+$/.test(n.characters.trim())).map(n => n.characters.trim());
  found.sort((a, b) => { const x = a.split('.').map(Number), y = b.split('.').map(Number); return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]; });
  if (found.length) version = 'v' + found[found.length - 1];
}
const date = new Date().toISOString().slice(0, 10);

const cyrb53 = (str, seed = 0) => { let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed; for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); } h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909); return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16); };
const sortEntries = o => Object.entries(o).sort((a, b) => { const ai = a[1].indexOf('Icon/') === 0, bi = b[1].indexOf('Icon/') === 0; if (ai !== bi) return ai ? 1 : -1; return a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]); });
const block = (title, o) => 'const ' + title + ' = {\n' + sortEntries(o).map(([k, v]) => '  ' + JSON.stringify(k) + ': ' + JSON.stringify(v)).join(',\n') + '\n};';
const lines = [];
for (const [k, v] of Object.entries(comps)) lines.push('c|' + k + '|' + v);
for (const [k, v] of Object.entries(styles)) lines.push('s|' + k + '|' + v);
for (const [k, v] of Object.entries(colls)) lines.push('v|' + k + '|' + v);
lines.sort();
const digest = cyrb53(lines.join('\n'));

const region = [
  '// BEGIN GENERATED KEYS (library ' + version + ', ' + date + '): do not edit by hand, regenerate with list-library-keys.js',
  "const KEYS_FROM = '" + version + ", " + date + "';",
  "const KEYS_DIGEST = '" + digest + "';",
  block('DS_COMPONENTS', comps),
  block('DS_STYLES', styles),
  block('DS_COLLECTIONS', colls),
  '// END GENERATED KEYS'
].join('\n');

return { version, date, counts: { componentSets: sets, singleComponents: singles, icons, styles: Object.keys(styles).length, variableCollections: Object.keys(colls).length }, digest, region };
