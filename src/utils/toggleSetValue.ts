export default function toggleSetValue(set: Set<number>, value: number) {
  const newSet = new Set([...set]);

  if (newSet.has(value)) {
    newSet.delete(value);

    return newSet;
  }

  newSet.add(value);

  return newSet;
}
