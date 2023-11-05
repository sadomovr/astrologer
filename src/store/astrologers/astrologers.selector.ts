import { RootState } from '../index.ts';
import { Astrologer } from '../../shared/types/astrologer.ts';
import { getFilteredAstrologers, getSortedAstrologers } from './astrologers.helper.ts';

export const getFilteredAndSortedAstrologers = (state: RootState): Astrologer[] => {
  const { data, filters, orderByKey, orderByValue } = state.astrologers;
  const filteredAstrologers = getFilteredAstrologers(data, filters);

  return getSortedAstrologers(filteredAstrologers, orderByValue, orderByKey);
};

export const getAstrologersFilters = (state: RootState) => {
  return {
    filters: state.astrologers.filters,
    orderByValue: state.astrologers.orderByValue,
    orderByKey: state.astrologers.orderByKey,
    availableFocuses: state.astrologers.availableFocuses,
    availableSpecializations: state.astrologers.availableSpecializations,
  };
};
