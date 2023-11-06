type Item = { id: number; name: string };

export function getUniqueItemsByKey<T>(items: { [key: string]: T[] }[], key: string): Item[] {
  const uniqueItems = new Set<string>();

  for (const item of items) {
    for (const value of item[key]) {
      uniqueItems.add(JSON.stringify(value));
    }
  }

  return Array.from(uniqueItems).map<Item>((item) => JSON.parse(item));
}
