import { AstrologerWithDelete, Filters } from './astrologers.types.ts';

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

export const sortingByStatus = (
  a: AstrologerWithDelete,
  b: AstrologerWithDelete,
  modifier: 1 | -1,
) => {
  if (a.status === 'online' && b.status === 'offline') {
    return 1 * modifier;
  }
  if (a.status === 'offline' && b.status === 'online') {
    return -1 * modifier;
  }

  return b.user_id - a.user_id;
};

export const sortingByRating = (
  a: AstrologerWithDelete,
  b: AstrologerWithDelete,
  modifier: 1 | -1,
) => {
  return (a.rating - b.rating) * modifier;
};

export const sortingByPrice = (
  a: AstrologerWithDelete,
  b: AstrologerWithDelete,
  modifier: 1 | -1,
) => {
  const findOnlineChat = (chat: { type: string }) => chat.type === 'online';

  const aPrice = a.chat_offers.find(findOnlineChat)?.price || 0;
  const bPrice = b.chat_offers.find(findOnlineChat)?.price || 0;

  return (aPrice - bPrice) * modifier;
};

export const getFilteredAstrologers = (
  astrologers: AstrologerWithDelete[],
  filters: Filters,
): AstrologerWithDelete[] => {
  const filteredAstrologers: AstrologerWithDelete[] = [];

  for (const astrologer of astrologers) {
    if (astrologer.isDelete) {
      continue;
    }

    if (!isNameMatch(astrologer, filters.name)) {
      continue;
    }

    if (!areFocusesIncludes(astrologer.focuses, filters.focuses)) {
      continue;
    }

    if (!areSpecializationsIncluded(astrologer.specializations, filters.specializations)) {
      continue;
    }

    if (filters.status && !isStatusMatch(astrologer.status, filters.status)) {
      continue;
    }

    filteredAstrologers.push(astrologer);
  }

  return filteredAstrologers;
};

export const getSortedAstrologers = (
  astrologers: AstrologerWithDelete[],
  orderByValue: 'ASC' | 'DESC',
  orderByKey: string,
): AstrologerWithDelete[] => {
  const compareFunction = (a: AstrologerWithDelete, b: AstrologerWithDelete) => {
    const modifier = orderByValue === 'ASC' ? 1 : -1;

    if (orderByKey === 'status') {
      return sortingByStatus(a, b, modifier);
    }

    if (orderByKey === 'rating') {
      return sortingByRating(a, b, modifier);
    }

    if (orderByKey === 'price') {
      return sortingByPrice(a, b, modifier);
    }

    return 0;
  };

  return [...astrologers].sort(compareFunction);
};

// Transfers the value 0 / 1 from the MUI selector to online / offline status
export const statusConverter = (status: number) => {
  if (!status) {
    return 'all';
  }

  if (status === 1) {
    return 'online';
  }

  return 'offline';
};

export const isNameMatch = (astrologer: AstrologerWithDelete, name: string) => {
  if (!name) {
    return true;
  }
  const regexPattern = new RegExp(`^${name.replace(/\*/g, '.*')}`, 'i');

  return regexPattern.test(astrologer.name);
};

export const areFocusesIncludes = (focuses: AstrologerWithDelete['focuses'], filter: number[]) => {
  if (!filter.length) {
    return true;
  }

  return filter.every((focusId) => focuses.some((focus) => focus.id === focusId));
};

export const areSpecializationsIncluded = (
  specializations: AstrologerWithDelete['specializations'],
  filter: number[],
) => {
  if (!filter.length) {
    return true;
  }

  return filter.every((focusId) => specializations.some((focus) => focus.id === focusId));
};
export const isStatusMatch = (status: string, filter: number) => {
  if (!filter) {
    return true;
  }

  return status === statusConverter(filter);
};
