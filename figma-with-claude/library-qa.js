// Loopwise library QA. READ-ONLY: it changes nothing. Run it with use_figma on the LIBRARY file
// (Loopwise Design System, key mePj303lAcqSyWVjZodZWp) before every publish. Claude does this when you say "run the library QA".
//
// It checks the standard every library component has to meet, on the component pages (documentation pages are skipped):
//   - colours, strokes, padding, gaps and radius are bound to variables (nothing hard-coded)
//   - every text uses a library text style, and its contrast against its background is at least 4.5:1 (3:1 for large text)
//   - no layer keeps a default name (Frame 12, Rectangle 3), and every variant is named Property=Value, Property=Value
//   - every component and component set has a description, written without characters that get turned into entities
//   - no two component sets share a name
//   - a bound colour that carries an opacity matches the variable's own alpha (a mismatch renders wrong)
//   - variables have scopes (never ALL_SCOPES) and a WEB code syntax
// It does not judge design quality, naming of the component itself, or whether it duplicates an existing one.
//
// PAGE_NAMES: pages to scan, empty = every component page. In a busy library scan the page you changed.
// A new component must add nothing to the report. The baseline (v0.1.0: every count is 0) is recorded in
// library-authoring.md and design-system/qa-report.md: anything above it belongs to the new work, so fix it.
const PAGE_NAMES = [];
const SKIP = ['Cover', 'Getting Started', 'Changelog', 'Color', 'Typography', 'Spacing & Radius', 'Elevation', 'Deprecated'];
const SAMPLE = 25;
const NO_CODE_OK = /^$/; // names of tokens that need no CSS variable on purpose (none in Loopwise)

const get = (n, k) => { try { return n[k]; } catch (e) { return undefined; } };
const lin = v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
const lum = c => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
const over = (fg, a, bg) => ({ r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a) });
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
const isDefaultName = s => /^(Frame|Rectangle|Ellipse|Vector|Group|Line|Polygon|Star|Text|Component|Instance|Section|Boolean|Union|Subtract) ?\d*$/.test(s);
const ownerOf = n => { let c = n; while (c && c.parent) { if (c.type === 'COMPONENT_SET' || (c.type === 'COMPONENT' && c.parent.type !== 'COMPONENT_SET')) return c.name; c = c.parent; } return '-'; };

const pages = figma.root.children.filter(p => !SKIP.includes(p.name) && !/^-+$/.test(p.name) && (!PAGE_NAMES.length || PAGE_NAMES.includes(p.name)));
const R = { file: figma.root.name, pagesScanned: [], visited: 0 };
const bad = { unboundColours: [], unboundSpacing: [], unboundRadius: [], textWithoutStyle: [], lowContrast: [], defaultNames: [], noDescription: [], descriptionEntities: [], badVariantNames: [], duplicateSetNames: [], opacityMismatch: [] };
const push = (k, s) => bad[k].push(s);
const colorVars = await figma.variables.getLocalVariablesAsync('COLOR');
const varById = new Map(colorVars.map(v => [v.id, v]));
const setNames = {};
const opacityChecks = [];

const solid = n => {
  const fills = get(n, 'fills'); if (!Array.isArray(fills)) return null;
  const f = fills.find(p => p.type === 'SOLID' && p.visible !== false); if (!f) return null;
  if (f.boundVariables && f.boundVariables.color) { const v = varById.get(f.boundVariables.color.id); if (v) { const val = v.resolveForConsumer(n).value; return { c: { r: val.r, g: val.g, b: val.b }, a: val.a === undefined ? 1 : val.a }; } }
  return { c: f.color, a: f.opacity === undefined ? 1 : f.opacity };
};
const background = n => {
  const layers = [];
  for (let c = n.parent; c && c.type !== 'PAGE'; c = c.parent) {
    const fills = get(c, 'fills');
    // A gradient or an image behind the text cannot be measured here: judge it by eye.
    if (Array.isArray(fills) && fills.some(p => p.visible !== false && (p.type.indexOf('GRADIENT') === 0 || p.type === 'IMAGE'))) return null;
    const s = solid(c); if (s && s.a > 0) { layers.push(s); if (s.a >= 0.999) break; }
  }
  let bg = { r: 1, g: 1, b: 1 };
  for (const s of layers.reverse()) bg = over(s.c, s.a, bg);
  return bg;
};
const dimmed = n => { for (let c = n; c && c.type !== 'PAGE'; c = c.parent) { if ((c.type === 'COMPONENT' || c.type === 'FRAME') && typeof c.opacity === 'number' && c.opacity < 1) return true; if (c.type === 'COMPONENT' && /Disabled/i.test(c.name)) return true; } return false; };

for (const page of pages) {
  await page.loadAsync();
  let count = 0;
  const stack = [...page.children];
  while (stack.length) {
    const n = stack.pop(); R.visited++; count++;
    if (n.type !== 'INSTANCE' && 'children' in n) for (const c of n.children) stack.push(c);
    const where = page.name + '|' + ownerOf(n) + '|' + n.name + '|' + n.id;
    const isSet = n.type === 'COMPONENT_SET', isSingle = n.type === 'COMPONENT' && n.parent && n.parent.type !== 'COMPONENT_SET';
    if (isSet || isSingle) {
      if (!n.description) push('noDescription', where);
      else if (/&(quot|amp|lt|gt|#\d+);/.test(n.description)) push('descriptionEntities', where);
      if (isSet) (setNames[n.name] = setNames[n.name] || []).push(page.name);
    }
    if (n.type === 'COMPONENT' && n.parent && n.parent.type === 'COMPONENT_SET' && !/^[^=,]+=[^,]+(, [^=,]+=[^,]+)*$/.test(n.name)) push('badVariantNames', where);
    if (isDefaultName(n.name) && n.type !== 'TEXT') push('defaultNames', where);
    if (n.type !== 'SECTION' && n.type !== 'STICKY') {
      for (const key of ['fills', 'strokes']) {
        const arr = get(n, key); if (!Array.isArray(arr)) continue;
        if (key === 'fills' ? get(n, 'fillStyleId') : get(n, 'strokeStyleId')) continue;
        for (const p of arr) {
          if (p.type !== 'SOLID' || p.visible === false) continue;
          if (!(p.boundVariables && p.boundVariables.color)) { push('unboundColours', where + '|' + key + ' ' + hex(p.color)); break; }
          if (p.opacity !== undefined && p.opacity < 0.999) opacityChecks.push([n, p.boundVariables.color.id, p.opacity, where]);
        }
      }
    }
    const bv = get(n, 'boundVariables') || {};
    if (get(n, 'layoutMode') && n.layoutMode !== 'NONE') for (const k of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'itemSpacing']) if (n[k] > 0 && !bv[k]) push('unboundSpacing', where + '|' + k + '=' + n[k]);
    if (get(n, 'topLeftRadius') !== undefined && n.type !== 'ELLIPSE') for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) if (typeof n[k] === 'number' && n[k] > 0 && !bv[k]) push('unboundRadius', where + '|' + k + '=' + n[k]);
    if (n.type === 'TEXT') {
      const t = n.textStyleId;
      let none = false;
      if (t === figma.mixed) none = n.getStyledTextSegments(['textStyleId']).some(s => !s.textStyleId); else if (!t) none = true;
      if (none) push('textWithoutStyle', where + '|"' + String(n.characters).slice(0, 24) + '"');
      if (ownerOf(n) !== '-' && !dimmed(n)) {
        const s = solid(n);
        const bg = s ? background(n) : null;
        if (s && bg) {
          const fg = over(s.c, s.a, bg), r = ratio(fg, bg);
          const style = n.fontName && n.fontName !== figma.mixed ? String(n.fontName.style) : '';
          const large = n.fontSize >= 18 || (n.fontSize >= 14 && /Bold/i.test(style));
          if (r < (large ? 3 : 4.5)) push('lowContrast', where + '|' + hex(fg) + ' on ' + hex(bg) + '|' + (Math.round(r * 100) / 100) + ':1|' + n.fontSize + 'px');
        }
      }
    }
  }
  R.pagesScanned.push(page.name + ' (' + count + ' nodes)');
}
for (const [name, where] of Object.entries(setNames)) if (where.length > 1) push('duplicateSetNames', name + ' on ' + where.join(', '));
const alphaCache = {};
for (const [n, id, op, where] of opacityChecks) {
  const v = varById.get(id); if (!v) continue;
  if (!(id in alphaCache)) { const val = v.resolveForConsumer(n).value; alphaCache[id] = val.a === undefined ? 1 : val.a; }
  if (Math.abs(alphaCache[id] - op) > 0.01) push('opacityMismatch', where + '|paint ' + Math.round(op * 100) / 100 + ' vs variable ' + Math.round(alphaCache[id] * 100) / 100);
}

// Variables of the published collections (the hidden Primitives collection is skipped).
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const hiddenIds = new Set(collections.filter(c => c.hiddenFromPublishing).map(c => c.id));
const allVars = (await figma.variables.getLocalVariablesAsync()).filter(v => !hiddenIds.has(v.variableCollectionId));
const allScopes = allVars.filter(v => v.scopes.indexOf('ALL_SCOPES') >= 0).map(v => v.name);
const noCodeSyntax = allVars.filter(v => !(v.codeSyntax && v.codeSyntax.WEB) && !NO_CODE_OK.test(v.name)).map(v => v.name);

const byOwner = {};
for (const k of Object.keys(bad)) for (const s of bad[k]) { const o = s.split('|')[1] || s.split(' on ')[0]; byOwner[o] = (byOwner[o] || 0) + 1; }
const summary = {};
for (const k of Object.keys(bad)) summary[k] = bad[k].length;
summary.variablesWithAllScopes = allScopes.length;
summary.variablesWithoutWebCodeSyntax = noCodeSyntax.length;
summary.clean = Object.values(summary).every(v => v === 0);
const samples = {};
for (const k of Object.keys(bad)) if (bad[k].length) samples[k] = bad[k].slice(0, SAMPLE);
if (allScopes.length) samples.variablesWithAllScopes = allScopes.slice(0, SAMPLE);
if (noCodeSyntax.length) samples.variablesWithoutWebCodeSyntax = noCodeSyntax.slice(0, SAMPLE);
R.summary = summary;
R.worstOwners = Object.entries(byOwner).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => k + ': ' + v);
R.samples = samples;
return R;
