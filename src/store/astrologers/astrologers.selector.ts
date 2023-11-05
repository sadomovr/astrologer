import { RootState } from '../index.ts';
import { Astrologer } from '../../shared/types/astrologer.ts';
import { getFilteredAstrologers, getSortedAstrologers } from './astrologers.helper.ts';

export const getFilteredAndSortedAstrologers = (state: RootState): Astrologer[] => {
  const { data, filters, orderByKey, orderByValue } = state.astrologers;
  const filteredAstrologers = getFilteredAstrologers(data, filters);

  return getSortedAstrologers(filteredAstrologers, orderByValue, orderByKey);
};
