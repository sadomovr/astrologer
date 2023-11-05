import { astrologersAction } from './';
import { Astrologer } from '../../shared/types/astrologer.ts';

export interface Filters {
  name: string;
  focuses: number[];
  specializations: number[];
  status?: number;
}

export type AstrologersState = {
  data: Astrologer[];
  filters: Filters;
  orderBy: 'status' | 'rating' | 'price';
  availableSpecializations: { id: number; name: string }[];
  availableFocuses: { id: number; name: string }[];
};

interface UpdateFiltersAction {
  type: astrologersAction.UPDATE_FILTER;
  payload: {
    key: keyof Filters;
    value: string | number[];
  };
}

interface UpdateSortingAction {
  type: astrologersAction.UPDATE_SORTING;
  payload: AstrologersState['orderBy'];
}

interface DeleteAstrologerAction {
  type: astrologersAction.DELETE_ASTROLOGER;
  payload: string;
}

export type AstrologersAction = UpdateFiltersAction | DeleteAstrologerAction | UpdateSortingAction;
