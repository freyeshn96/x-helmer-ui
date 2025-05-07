export function removeDuplicates<T>(arr: Array<T>) {
  return [...new Set(arr)];
}

export function isSubset<T>(
  array1: T[],
  array2: T[],
  predicate?: (a: T, b: T) => boolean
): boolean {
  if (predicate) {
    return array1.every(a1 => array2.some(a2 => predicate(a1, a2)));
  } else {
    return array1.every(a1 => array2.includes(a1));
  }
}
