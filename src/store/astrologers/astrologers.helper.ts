type Item = { id: number; name: string };

function getUniqueItems<T>(astrologers: { [key: string]: T[] }[], key: string): Item[] {
  const uniqueItems = new Set<string>();

  for (const astrologer of astrologers) {
    for (const item of astrologer[key]) {
      uniqueItems.add(JSON.stringify(item));
    }
  }

  return Array.from(uniqueItems).map<Item>((item) => JSON.parse(item));
}

export const getUniqueSpecializations = (astrologers: { specializations: Item[] }[]) => {
  return getUniqueItems(astrologers, 'specializations');
};

export const getUniqueFocuses = (astrologers: { focuses: Item[] }[]) => {
  return getUniqueItems(astrologers, 'focuses');
};
