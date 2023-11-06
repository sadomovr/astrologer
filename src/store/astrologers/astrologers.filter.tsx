import { AstrologersFilters, AstrologerWithDelete } from './astrologers.types.ts';
import { statusConverter } from './astrologers.helper.ts';

export const isNameMatch = (astrologer: AstrologerWithDelete, name: string) => {
  if (!name) {
    return true;
  }
  const regexPattern = new RegExp(`^${name.replace(/\*/g, '.*')}`, 'i');

  return regexPattern.test(astrologer.name);
};

const areItemsIncluded = (
  items: AstrologerWithDelete['focuses' | 'specializations'],
  filter: number[],
) => {
  if (!filter.length) {
    return true;
  }

  return filter.every((itemId) => items.some((item) => item.id === itemId));
};
const isStatusMatch = (status: string, filter: number) => {
  if (!filter) {
    return true;
  }

  return status === statusConverter(filter);
};

export const getFilteredAstrologers = (
  astrologers: AstrologerWithDelete[],
  filters: AstrologersFilters,
): AstrologerWithDelete[] => {
  const filteredAstrologers: AstrologerWithDelete[] = [];

  for (const astrologer of astrologers) {
    if (astrologer.isDelete) {
      continue;
    }

    if (!isNameMatch(astrologer, filters.name)) {
      continue;
    }

    // Check the match using focus filters
    if (!areItemsIncluded(astrologer.focuses, filters.focuses)) {
      continue;
    }

    // Check the match using specializations filters
    if (!areItemsIncluded(astrologer.specializations, filters.specializations)) {
      continue;
    }

    if (filters.status && !isStatusMatch(astrologer.status, filters.status)) {
      continue;
    }

    filteredAstrologers.push(astrologer);
  }

  return filteredAstrologers;
};
