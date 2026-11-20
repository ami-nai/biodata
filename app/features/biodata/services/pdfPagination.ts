/** Merge overlapping line/image bounds across columns, then break in the gaps. */
export function getPageSlices(height: number, capacity: number, ranges: Array<{ top: number; bottom: number }>) {
  if (height <= 0 || capacity <= 0) throw new Error('Invalid PDF dimensions');
  const bands: Array<{ top: number; bottom: number }> = [];
  for (const range of [...ranges].sort((a, b) => a.top - b.top)) {
    const last = bands[bands.length - 1];
    if (last && range.top < last.bottom) last.bottom = Math.max(last.bottom, range.bottom);
    else bands.push({ ...range });
  }
  const pages: Array<{ start: number; end: number }> = [];
  let start = 0;
  while (start < height) {
    let end = Math.min(height, start + capacity);
    const crossing = bands.find(band => band.top < end && band.bottom > end);
    if (crossing) {
      // An unusually tall unbroken block gets its own proportionally scaled page.
      end = crossing.top > start ? crossing.top : Math.min(height, crossing.bottom);
    }
    pages.push({ start, end });
    start = end;
  }
  return pages;
}
