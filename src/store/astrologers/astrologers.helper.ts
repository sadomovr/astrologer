import { AstrologerWithDelete } from './astrologers.types.ts';
import { getUniqueItemsByKey } from '../../shared/helpers/array.ts';

export const getUniqueSpecializations = (
  astrologers: { specializations: { id: number; name: string }[] }[],
) => {
  return getUniqueItemsByKey(astrologers, 'specializations');
};

export const getUniqueFocuses = (astrologers: { focuses: { id: number; name: string }[] }[]) => {
  return getUniqueItemsByKey(astrologers, 'focuses');
};

// Sort by status and user_id value, from largest to smallest
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

// Sorting astrologers by key and ASC/DESC
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
