import { astrologersAction } from './';
import { Astrologer } from '../../shared/types/astrologer.ts';

export interface Filters {
  name: string;
  focuses: { id: number; name: string }[];
  specializations: { id: number; name: string }[];
  status: string;
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
}

interface UpdateSortingAction {
  type: astrologersAction.UPDATE_SORTING;
}

interface DeleteAstrologerAction {
  type: astrologersAction.DELETE_ASTROLOGER;
}

export type AstrologersAction = UpdateFiltersAction | DeleteAstrologerAction | UpdateSortingAction;
