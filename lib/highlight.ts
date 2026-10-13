// "Find a word's twins": select a word in the editor → every occurrence is highlighted.
// Uses the CSS Custom Highlight API where available; otherwise draws overlay boxes from
// Range.getClientRects() into a layer inside the editor. React-owned DOM is never mutated.

const NAME = "twins";

type HighlightCtor = new (...ranges: Range[]) => unknown;
interface HighlightRegistry {
  set(name: string, h: unknown): void;
  delete(name: string): void;
}

function registry(): { highlights: HighlightRegistry; Highlight: HighlightCtor } | null {
  const css = (globalThis as { CSS?: { highlights?: HighlightRegistry } }).CSS;
  const Highlight = (globalThis as { Highlight?: HighlightCtor }).Highlight;
  return css?.highlights && Highlight ? { highlights: css.highlights, Highlight } : null;
}

/** The selected token, if it is a single 2–40 char word inside `root`. */
export function selectedWord(root: HTMLElement): string | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || !root.contains(sel.anchorNode)) return null;
  const word = sel.toString().trim();
  if (word.length < 2 || word.length > 40 || /\s/.test(word)) return null;
  return word;
}

function findRanges(root: HTMLElement, word: string): Range[] {
  const needle = word.toLowerCase();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest("[data-hl-ignore]") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const ranges: Range[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const v = (n.nodeValue ?? "").toLowerCase();
    for (let i = v.indexOf(needle); i !== -1; i = v.indexOf(needle, i + needle.length)) {
      const r = document.createRange();
      r.setStart(n, i);
      r.setEnd(n, i + needle.length);
      ranges.push(r);
    }
  }
  return ranges;
}

export function clearTwins(layer?: HTMLElement | null) {
  registry()?.highlights.delete(NAME);
  if (layer) layer.replaceChildren();
}

/** Highlights all occurrences of `word` in `root`. Returns the match count. */
export function highlightTwins(root: HTMLElement, layer: HTMLElement | null, word: string): number {
  clearTwins(layer);
  const ranges = findRanges(root, word);
  const api = registry();
  if (api) {
    api.highlights.set(NAME, new api.Highlight(...ranges));
    return ranges.length;
  }
  if (!layer) return ranges.length;
  // Fallback: absolutely positioned boxes in the scroll container's coordinate space.
  const box = root.getBoundingClientRect();
  const frag = document.createDocumentFragment();
  for (const r of ranges) {
    for (const rect of r.getClientRects()) {
      const d = document.createElement("span");
      d.style.cssText = `position:absolute;left:${rect.left - box.left + root.scrollLeft}px;top:${rect.top - box.top + root.scrollTop}px;width:${rect.width}px;height:${rect.height}px`;
      frag.append(d);
    }
  }
  layer.append(frag);
  return ranges.length;
}
