/**
 * @package
 */
export function removeContained<T extends RangeLike>(ranges: T[]): T[] {
  if (ranges.length === 0) {
    return [];
  }

  // Earlier ranges first and if equal, shorter ranges first
  const sortedRanges = ranges.sort(
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    (a, b) => a.start - b.start || a.end - b.end,
  );

  const merged: T[] = [];
  let maxEnd = -Infinity;

  for (const range of sortedRanges) {
    // If the current range ends before or when the last added range ends, it's contained
    if (range.end <= maxEnd) {
      continue;
    }
    merged.push(range);
    maxEnd = range.end;
  }

  return merged;
}

type RangeLike = {
  end: number;
  start: number;
};
