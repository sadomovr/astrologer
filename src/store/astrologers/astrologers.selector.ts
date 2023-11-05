import { RootState } from '../index.ts';
import { Astrologer } from '../../shared/types/astrologer.ts';
import { sortingByPrice, sortingByRating, sortingByStatus } from './astrologers.helper.ts';

export const getSortedAstrologers = (state: RootState) => {
  const { orderByValue, orderByKey, data } = state.astrologers;

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

  const sortedData = [...data];

  sortedData.sort(compareFunction);

  return sortedData;
};
