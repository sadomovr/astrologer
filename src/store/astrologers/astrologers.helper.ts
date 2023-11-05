import { Astrologer } from '../../shared/types/astrologer.ts';
import { Filters } from './astrologers.types.ts';

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
  a: { user_id: number; status: string },
  b: { user_id: number; status: string },
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

export const sortingByRating = (a: { rating: number }, b: { rating: number }, modifier: 1 | -1) => {
  return (a.rating - b.rating) * modifier;
};

export const sortingByPrice = (
  a: { chat_offers: { type: string; price: number }[] },
  b: { chat_offers: { type: string; price: number }[] },
  modifier: 1 | -1,
) => {
  const findOnlineChat = (chat: { type: string }) => chat.type === 'online';

  const aPrice = a.chat_offers.find(findOnlineChat)?.price || 0;
  const bPrice = b.chat_offers.find(findOnlineChat)?.price || 0;

  return (aPrice - bPrice) * modifier;
};

export const getFilteredAstrologers = (
  astrologers: Astrologer[],
  filters: Filters,
): Astrologer[] => {
  const filteredAstrologers: Astrologer[] = [];

  for (const astrologer of astrologers) {
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
  astrologers: Astrologer[],
  orderByValue: 'ASC' | 'DESC',
  orderByKey: string,
): Astrologer[] => {
  const compareFunction = (a: Astrologer, b: Astrologer) => {
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
  if (status === 1) {
    return 'online';
  }

  return 'offline';
};

export const isNameMatch = (astrologer: { name: string }, name: string) => {
  if (!name) {
    return true;
  }
  const regexPattern = new RegExp(`^${name.replace(/\*/g, '.*')}`, 'i');

  return regexPattern.test(astrologer.name);
};

export const areFocusesIncludes = (focuses: { id: number }[], filter: number[]) => {
  if (!filter.length) {
    return true;
  }

  return filter.every((focusId) => focuses.some((focus) => focus.id === focusId));
};

export const areSpecializationsIncluded = (specializations: { id: number }[], filter: number[]) => {
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
