// Loopwise library check. READ-ONLY: it changes nothing in the file.
// Say "run the check" and Claude pastes this whole script into use_figma for the file you name.
//
// It proves, for a working file (a screen file, a scratch file), that
//   1. every component instance comes from the Loopwise Design System (not another library, not a local copy),
//   2. the file has no local components, styles or variable collections,
//   3. there are no hard-coded colours, no text without a library text style and no foreign variables or
//      styles, also inside instances (overrides),
//   4. which libraries are added to the file (libraries that publish variables) and which library components the file uses.
// It does not judge layout, content or whether a screen is right, and it cannot see an added library that
// publishes no variables (look at Assets, Libraries, This file for that). Do not run it on the library file itself:
// the library has its own QA (library-qa.js).
//
// PAGE_IDS: pages to scan, empty = every page. CAP keeps a run under about half a minute (8,000 nodes take about 10 seconds).
// When a run stops early it lists the pages it did not reach in notScanned, with their ids: run those next with PAGE_IDS.
// DEEP: also look inside instances for overrides (a changed colour, a text without its style). Slower; leave it on.
// The key tables between BEGIN and END are generated from the library: after every publish regenerate them with
// list-library-keys.js (see registry.md). A new library component that is missing from the tables is reported as
// foreign, which is the safe way to fail: refresh the tables, then run the check again.
const PAGE_IDS = [];
const DEEP = true;
const CAP = 20000;
const LIBRARY_NAME = 'Loopwise Design System';

// BEGIN GENERATED KEYS (library v0.1.0, 2026-10-09): do not edit by hand, regenerate with list-library-keys.js
const KEYS_FROM = 'v0.1.0, 2026-10-09';
const KEYS_DIGEST = '8038b7256e734';
const DS_COMPONENTS = {
  "6566a629f0137295f5a94b814328bf352357dcd4": "Alert",
  "9f2e201414805171c864b8c29b8793ee81cb4b72": "Avatar",
  "175e92d2d827ec0fa23e09a24d21c6fbbfc9badf": "Avatar Stack",
  "35aa5ee2db046d701fef0300704e48cfbe3a64dd": "Badge",
  "d27417f7b15c4a6853b9c895bef614f5799a1ee5": "Button",
  "f75f8d1afdac72a0154ae769a15d69400b7d8f30": "Card",
  "cfc5a9885d394bd63e2480231d97e8e8f76d50d9": "Checkbox",
  "a945fda35e4dc547a9fa6b04ec417a9681503ebe": "Dialog",
  "7c23ac66a03ff8da222c400f0d1b2cfc4b05f227": "Dropdown Panel",
  "b3097e2994f8a462ffaf1a43a31afd546ad64704": "Empty State",
  "8611c29e963f60fddd2db46ab74409896c7240e1": "Icon Button",
  "9f7d00036f8297bad5aa353e6d148a12f9e29737": "Menu",
  "ebc36181848b363c3b8f0fbfc3d29f6b0764aef2": "Menu Item",
  "8136341fdc8f990d5ffcdfef422527fdaada2e8e": "Nav Item",
  "9a0eb6c29e98f8f2afdedc06b72f774e6edc905b": "Page Header",
  "6ca589c0e4b4ad9caef67986ee396ffa8346aace": "Progress Bar",
  "db235f8d5f9afcdf5ae7f85296e001a68c6a2dc6": "Radio",
  "40d60475e2df987f2541f8cebb7d23a8e40db624": "Search Field",
  "74d1eaef3dafc20ef2128651c1da2414b9e7b268": "Segment",
  "3f812943390eccb49b485a2ace192cca09e0f015": "Segmented Control",
  "4458857a6c2c3f8c3a53de3db6a494e6f8ee4ba4": "Select Option",
  "2a1d501c08d756be7e9088fa74e14dee710296a5": "Sidebar",
  "2845b695affefd5ebbef3262598443728e6b86b1": "Slot",
  "39b31a1a22646ec10c68a33e042da2a5b6fe0d4b": "Spinner",
  "a3fb58e957342bfb32cc3ec087560f3354e01fc9": "Stat Card",
  "83c57cf27e7fb607ee3b06f2f64982c95e7da35c": "Switch",
  "f5199bed00b225cf52f00d9dea694cb8c9a5f0a4": "Tab",
  "460a277a565d8a624d0a1d745acbd23054143794": "Tab Bar",
  "7426371e3b05e0ebd020ef0d050f7e026ba47ab1": "Table",
  "52ece3793317a2c58394c5ecb97f1e9a4214639b": "Table Cell",
  "27662b680ead1e46178d08dad44ca2a19172e5ca": "Table Row",
  "0e1183d41f9a5efce09b124e6279aafd9a1ac20a": "Text Field",
  "deb848d216d636b891e635413cf18754878f0119": "Toast",
  "dc6136c15bcbec4f0f77f3fd8cd7e17e9d6133c7": "Tooltip",
  "8f3bfdafd7ff4107acb61aeb0a2d73e8fcddcc02": "Icon/add",
  "7dd9cf67db2aca41302401c21c3b0df894df90a5": "Icon/all_inclusive",
  "59977e1610a52c4ed0cffbdb26eb46868fea831b": "Icon/arrow_back",
  "547b433a89aae93c46ded1179dce239be2c400d3": "Icon/arrow_downward",
  "cddfc8f8be09ce6b43640530f422824d855de6e4": "Icon/arrow_forward",
  "4b5aef16b9c8560d72fa7091b147afd97d178fc3": "Icon/arrow_upward",
  "177678252d26d6e86f960ba2b960dc5715aaf364": "Icon/attach_file",
  "f400de7b7e5058aa775c46f2de5cfafa524cddfe": "Icon/block",
  "4148f987a8f204ff77688a4e5b0106b2e600b79a": "Icon/bolt",
  "0774594076278b97c8bf938e3bc84566b4d4e19f": "Icon/calendar_month",
  "fb03e1be79b29c9af5788362d433584767f644c6": "Icon/chat_bubble",
  "e8ebb3bed3cc1b2610151dd8598e9042aef16734": "Icon/check",
  "400997aa5c70c4f3ac3c42ea966dc3d44b481ba4": "Icon/check_circle",
  "e8f7acb420d43cce10e88bc2d81b9abfeb0ca41d": "Icon/chevron_left",
  "4da79e70af1483601d78beb36d3402fe005d0864": "Icon/chevron_right",
  "1c22118e9cebeaa110389288881114a63c9f4232": "Icon/close",
  "0f32e6664631fdca0be3453205e4bd2deeeb5dd4": "Icon/content_copy",
  "236c59f9eb0cf469b7fbcd1422ebafa23f327e6d": "Icon/dark_mode",
  "88419e1a4ac9a090ade3f4210ebe3f7d75dd8640": "Icon/dashboard",
  "e841ea74e37077df199ddd051d8bdb23ce709594": "Icon/delete",
  "854a1d2e6d486562bdac6b0b727a8175f610a536": "Icon/description",
  "84ac2f240cc3e04540e57fa0c86778e81e5b56f7": "Icon/download",
  "9670a52fcb0ddef26acb1b6eae81154c5ce1833c": "Icon/drag_indicator",
  "e4e1b08bf60139115b732301cb5a58676f767319": "Icon/edit",
  "f793854915b9de226aaa831aac0b902cac491f4a": "Icon/error",
  "cf7c0af9d14651e13472beb4bd7f22c2516b0844": "Icon/expand_less",
  "def3131485c8aed5cfb4d3f24937f26bf964a08a": "Icon/expand_more",
  "b29bf40c54519d5a9836f805aefacaf138a712de": "Icon/filter_list",
  "478a9d59331ca9c47a400cff85a14b495d9b12a5": "Icon/flag",
  "aade285fc4b01fa061211a40e1e8288e568b4a29": "Icon/folder",
  "34adfe25541c7652dfb25bf9045838a32c3ca45b": "Icon/group",
  "27492907c789e0066d66ad4d2d8b243d1d0231f8": "Icon/help",
  "3f92942c3b152bba0a9082fbc8d21e4c52423ae3": "Icon/home",
  "6ce61c91eebe72092e75b4c7ef73d2e40ff01e8c": "Icon/inbox",
  "e71e174d8697c53274c692a239fcb1d964f86c83": "Icon/info",
  "c33c5565af4f9c115398aa165b95571c0b58d318": "Icon/ios_share",
  "9a885f6a93d2cfa9dd5932d49ddd4464c31067b0": "Icon/label",
  "9f9ef59d136ab451bab12251272ade85ed9dc464": "Icon/light_mode",
  "af41c2262dd81454989195f2a9d4a4e9c05a02aa": "Icon/link",
  "42dc037c7b75f8ae3e05fcc8fb186a98c4df29ec": "Icon/lock",
  "7a3be119daba918f53149339a0193e4a5a7856cf": "Icon/logout",
  "9595005bb102b1b699d3e8ddc9558c92a132c150": "Icon/more_horiz",
  "a56c171dbf06062ae5416fc639b34a72db141f75": "Icon/more_vert",
  "7a235a7fa4835aa721d01c7dfcc4decb16802000": "Icon/notifications",
  "6e6d750fea6f3a7884da20f4e39144f6a822b34f": "Icon/open_in_new",
  "4f8d6beb45d08e21006ad9ced7c4d5e478d3cea6": "Icon/person",
  "65660e24b6b9d71a7909e2b795a3aae158ef9345": "Icon/person_add",
  "a4b76a565c55f47ba4af26c1bedb21f22bcf866e": "Icon/progress_activity",
  "ffa2a84df7d0c508bcc8bf856f4fd231f0e8c441": "Icon/remove",
  "f09325bb08ea670c52766c9f71437cf9a4b7a4c0": "Icon/schedule",
  "ad7362b1cee9dff66d735d36e8dc15f708974a64": "Icon/search",
  "8a5560954e6cfc7355be207c64698e7091042237": "Icon/settings",
  "e3e84c9180f1a1995a71cf872c801115cd9fbb72": "Icon/sort",
  "09bf4f4590a16e73ad6370b007b7d3363b418924": "Icon/star",
  "0572401e017de1801f24358c0befc6db96472e58": "Icon/swap_vert",
  "0e6b21b6dd33c48c496b3debf9540621840272ea": "Icon/trending_down",
  "e5a4c8247e6ce8c4e401ac8614f743a478cc3d38": "Icon/trending_up",
  "0275de81f297003c46f533a4a660e6f4796f656c": "Icon/unfold_more",
  "33abf0d3e8f59fa306a94fea2b6b08b179120590": "Icon/upload",
  "4bf71e58523332ff5302539a5c1822105b49f5bd": "Icon/view_kanban",
  "6c4cb2d8dd65b86001137461f2f2ba0186e3ae17": "Icon/view_list",
  "0aa5fff4bf1d319879fd4c75c556ddcc96bc0a8d": "Icon/visibility",
  "db7c25f7409303b481740e38ca7b4ff8d50d0818": "Icon/visibility_off",
  "5ba6962241bfa1a6b03a3d59b6eae5dae879b015": "Icon/warning"
};
const DS_STYLES = {
  "d4112c5bf87f5d07adecef6246dfcaf6e36e3bee": "Body/Large/Medium",
  "da72ed11ce7f82019e28aee454e2667c724f7685": "Body/Large/Regular",
  "94d47790753fb060983e7182e163c069317bfb07": "Body/Medium/Medium",
  "ab907327e507facbb5d0b2d133e070b49b7c6b7e": "Body/Medium/Regular",
  "48d955eda50f0ae912aea29261a0f3e0bbfd9596": "Body/Medium/SemiBold",
  "9382826b20867eb03ac6603779d8e9e0e60e6037": "Body/Small/Medium",
  "0824ffc4ecae79fb1c4a843f64e73ff17ea7868f": "Body/Small/Regular",
  "a1be1c00f144020468c5e6b299907c6c01452cf8": "Body/Small/SemiBold",
  "3442ed7786efeb4a7685e1fdd7f7828970c0188d": "Caption/Medium",
  "1e578360daeb252fe29c2e86db16c4cf33dcd868": "Caption/Regular",
  "0598edf97c2657de2d46e5ae2283e67aae23346b": "Display/Large",
  "ec66b68d0c72db23990a1bcfbaf22e77f7607d09": "Display/Small",
  "310fff5ce41a7488ba802e250dff1a723e42c767": "Focus/Ring",
  "788379882cbced945a28de73ad6df7fda4c1a5db": "Heading/1",
  "08a192ab265322e5bab606328e635c3cb5297393": "Heading/2",
  "69704402c6b25095516430d11096427253b60768": "Heading/3",
  "4acd099803af5e582a3e5f313c1eacdd8b034d79": "Heading/4",
  "221512b7be960a76ac102d88fb94dc45984a27e7": "Label/Caps",
  "e79fdda44b2e96c6a162c102bf6b92f1a29e0759": "Label/Large",
  "ce8874bd408d0c6601839cd493daa7f1ddcb3a94": "Label/Medium",
  "af21839dbe44d11e01bd632c8890432bc4bde62c": "Label/Small",
  "af040b9bd6ccff23e8c58aa5746f88c4dcdf6366": "Mono/Medium",
  "62183f2387107d5eed6bda9b3a60f92baad60477": "Mono/Small",
  "9fb150ec0b311fef8ad70b728e675e51fd8e7d79": "Shadow/LG",
  "10be600af3148c5ca27422a9199f885283fa4749": "Shadow/MD",
  "c6126bdd9934fedc3acc43976bc94191321b446a": "Shadow/SM",
  "26775c9ab36eb5fd3f4bcfcbf2443d8e40fd7a19": "Shadow/XS"
};
const DS_COLLECTIONS = {
  "37c13788387b6de669bed1b0b3664adecbce5b12": "Color",
  "671cf13a8cb21e5f0b360f09546cf67cc9a690d4": "Radius",
  "206a4f8c3ee524c6dc06ba06ebd539b8b9510662": "Size",
  "dee232ba47e6508eb56d7d11647c0be1ab10a37f": "Spacing",
  "d73dcf9ccb731357e0a3402af01e234e973b277e": "Typography"
};
// END GENERATED KEYS

// Names of components from retired libraries, so a hand-built look-alike of an old component is caught too.
// Loopwise has no retired library yet: add their component names here if one is ever replaced.
const LEGACY_NAMES = [];
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
const LIB_NAMES = [...new Set([...Object.values(DS_COMPONENTS).filter(n => n.indexOf('Icon/') !== 0).map(norm), ...LEGACY_NAMES])];
const libMatch = name => { const s = ' ' + norm(name) + ' '; return LIB_NAMES.find(l => s.includes(' ' + l + ' ')) || null; };
const MIXED = figma.mixed;
const SAMPLE = 25;

const R = { file: figma.root.name, keysFrom: KEYS_FROM, keysDigest: KEYS_DIGEST, pages: [], visited: 0, truncated: false };
const localComponents = [], foreignInstances = [], instancesOfLocal = [], missingMain = [], possibleDetached = [];
const paints = { count: 0, inInstances: 0, byColor: {}, samples: [] };
const unstyled = { count: 0, inInstances: 0, samples: [] };
const styleIds = new Map(), varIds = new Map();
const topInstances = [], localByOwner = new Map(), usage = {};
let dsInstances = 0;

// Reading a property a node type does not have throws in the plugin sandbox, so every optional read goes through get().
const get = (n, k) => { try { return n[k]; } catch (e) { return undefined; } };
const owner = n => { let c = n; while (c && c.parent) { if (c.type === 'INSTANCE') return c.name; c = c.parent; } return null; };

function visit(n, inInst, page) {
  const people = n.type === 'STICKY' || n.type === 'SECTION';
  if (!inInst) {
    if (n.type === 'INSTANCE') topInstances.push([n, page.name]);
    if (n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent && n.parent.type !== 'COMPONENT_SET')) {
      const e = { name: n.name, id: n.id, page: page.name, instances: 0, lookalikeOf: libMatch(n.name) };
      localComponents.push(e); localByOwner.set(n.id, e);
    } else if (n.type === 'FRAME' && n.parent && n.parent.type !== 'PAGE' && n.parent.type !== 'SECTION' && libMatch(n.name)) {
      possibleDetached.push({ name: n.name, id: n.id, page: page.name });
    }
  }
  if (!people) {
    for (const key of ['fills', 'strokes']) {
      const arr = get(n, key);
      if (!Array.isArray(arr)) continue;
      for (const p of arr) if (p.boundVariables && p.boundVariables.color) varIds.set(p.boundVariables.color.id, n);
      if (key === 'fills' ? get(n, 'fillStyleId') : get(n, 'strokeStyleId')) continue; // bound to a style (a symbol when mixed, still truthy)
      for (const p of arr) {
        if (p.type === 'SOLID' && p.visible !== false && !(p.boundVariables && p.boundVariables.color)) {
          const h = hex(p.color);
          paints.count++; if (inInst) paints.inInstances++;
          paints.byColor[h] = (paints.byColor[h] || 0) + 1;
          if (paints.samples.length < SAMPLE) paints.samples.push({ id: n.id, name: n.name, in: inInst ? owner(n) : null, where: key, color: h, page: page.name });
          break;
        }
      }
    }
  }
  for (const k of ['fillStyleId', 'strokeStyleId', 'effectStyleId', 'gridStyleId', 'textStyleId']) {
    const v = get(n, k); if (typeof v === 'string' && v) styleIds.set(v, n);
  }
  const bv = get(n, 'boundVariables');
  if (bv) for (const k in bv) { const v = bv[k]; for (const a of Array.isArray(v) ? v : [v]) if (a && a.id) varIds.set(a.id, n); }
  if (n.type === 'TEXT') {
    const t = n.textStyleId;
    let none = false;
    if (t === MIXED) { for (const s of n.getStyledTextSegments(['textStyleId'])) { if (!s.textStyleId) none = true; else styleIds.set(s.textStyleId, n); } }
    else if (!t) none = true;
    if (none) {
      unstyled.count++; if (inInst) unstyled.inInstances++;
      if (unstyled.samples.length < SAMPLE) unstyled.samples.push({ id: n.id, text: String(n.characters).slice(0, 30), in: inInst ? owner(n) : null, page: page.name });
    }
  }
}

const pages = PAGE_IDS.length ? await Promise.all(PAGE_IDS.map(id => figma.getNodeByIdAsync(id))) : figma.root.children;
for (let pi = 0; pi < pages.length; pi++) {
  const page = pages[pi];
  if (!page || page.type !== 'PAGE') continue;
  await page.loadAsync();
  let count = 0;
  const stack = page.children.map(n => [n, false]);
  while (stack.length) {
    if (R.visited >= CAP) { R.truncated = true; break; }
    const [n, inInst] = stack.pop(); R.visited++; count++;
    visit(n, inInst, page);
    if ('children' in n && (n.type !== 'INSTANCE' || DEEP)) for (const c of n.children) stack.push([c, inInst || n.type === 'INSTANCE']);
  }
  R.pages.push(page.name + ' [' + page.id + '] (' + count + ' nodes' + (R.truncated ? ', stopped here' : '') + ')');
  if (R.truncated) { R.notScanned = pages.slice(pi + 1).filter(p => p && p.type === 'PAGE').map(p => p.name + ' [' + p.id + ']'); break; }
}

// Where does each top-level instance come from?
for (let i = 0; i < topInstances.length; i += 100) {
  const part = topInstances.slice(i, i + 100);
  const mains = await Promise.all(part.map(([n]) => n.getMainComponentAsync()));
  mains.forEach((m, j) => {
    const [n, pageName] = part[j];
    if (!m) { missingMain.push({ instance: n.name, id: n.id, page: pageName }); return; }
    const o = m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent : m;
    if (m.remote) {
      const name = DS_COMPONENTS[o.key];
      if (name) { dsInstances++; usage[name] = (usage[name] || 0) + 1; }
      else foreignInstances.push({ component: o.name, instance: n.name, key: o.key, page: pageName, id: n.id });
    } else {
      instancesOfLocal.push({ component: o.name, instance: n.name, page: pageName, id: n.id });
      const e = localByOwner.get(o.id); if (e) e.instances++;
    }
  });
}

// Styles and variables that nodes use: library ones must come from the Loopwise Design System.
const foreignStyles = [], localStyleUse = [], foreignVariables = [], localVariableUse = [];
let unresolvedStyles = 0, unresolvedVariables = 0;
for (const [id, n] of styleIds) {
  const s = await figma.getStyleByIdAsync(id);
  if (!s) { unresolvedStyles++; continue; }
  if (!s.remote) localStyleUse.push({ style: s.name, type: s.type, example: n.id });
  else if (!DS_STYLES[s.key]) foreignStyles.push({ style: s.name, type: s.type, key: s.key, example: n.id });
}
for (const [id, n] of varIds) {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) { unresolvedVariables++; continue; }
  if (!v.remote) { localVariableUse.push({ variable: v.name, example: n.id }); continue; }
  const c = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
  if (!c) { unresolvedVariables++; continue; }
  if (!DS_COLLECTIONS[c.key]) foreignVariables.push({ variable: v.name, collection: c.name, example: n.id });
}

// What the file itself owns, and which libraries are added.
const [lt, le, lp, lg, lc] = await Promise.all([figma.getLocalTextStylesAsync(), figma.getLocalEffectStylesAsync(), figma.getLocalPaintStylesAsync(), figma.getLocalGridStylesAsync(), figma.variables.getLocalVariableCollectionsAsync()]);
const local = { textStyles: lt.length, effectStyles: le.length, paintStyles: lp.length, gridStyles: lg.length, variableCollections: lc.map(c => c.name) };
let librariesOn;
try { librariesOn = [...new Set((await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()).map(c => c.libraryName))]; }
catch (e) { librariesOn = 'not readable here: ' + (e && e.message ? e.message : e); }
const otherLibrariesOn = Array.isArray(librariesOn) ? librariesOn.filter(x => x !== LIBRARY_NAME) : [];

const localStyleTotal = local.textStyles + local.effectStyles + local.paintStyles + local.gridStyles;
R.summary = {
  clean: !localComponents.length && !foreignInstances.length && !instancesOfLocal.length && !missingMain.length && !possibleDetached.length &&
    !paints.count && !unstyled.count && !foreignStyles.length && !localStyleUse.length && !foreignVariables.length && !localVariableUse.length &&
    !localStyleTotal && !local.variableCollections.length && !otherLibrariesOn.length && !R.truncated,
  designSystemInstances: dsInstances,
  foreignInstances: foreignInstances.length,
  localComponents: localComponents.length,
  instancesOfLocalComponents: instancesOfLocal.length,
  instancesWithMissingMain: missingMain.length,
  possibleDetached: possibleDetached.length,
  hardCodedColours: paints.count,
  textWithoutLibraryStyle: unstyled.count,
  foreignOrLocalStylesUsed: foreignStyles.length + localStyleUse.length,
  foreignOrLocalVariablesUsed: foreignVariables.length + localVariableUse.length,
  localStylesInFile: localStyleTotal,
  localVariableCollections: local.variableCollections.length,
  otherLibrariesOn,
  stoppedEarly: R.truncated
};
R.librariesOn = librariesOn;
R.local = local;
R.foreignInstances = foreignInstances.slice(0, SAMPLE);
R.localComponents = localComponents.slice(0, SAMPLE);
R.instancesOfLocal = instancesOfLocal.slice(0, SAMPLE);
R.missingMain = missingMain.slice(0, SAMPLE);
R.possibleDetached = possibleDetached.slice(0, SAMPLE);
R.hardCodedColours = paints;
R.textWithoutLibraryStyle = unstyled;
R.foreignStyles = foreignStyles.slice(0, SAMPLE);
R.localStyleUse = localStyleUse.slice(0, SAMPLE);
R.foreignVariables = foreignVariables.slice(0, SAMPLE);
R.localVariableUse = localVariableUse.slice(0, SAMPLE);
R.unresolved = { styles: unresolvedStyles, variables: unresolvedVariables };
R.mostUsed = Object.entries(usage).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => k + ' x' + v);
return R;
