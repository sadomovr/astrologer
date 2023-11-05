import { astrologersAction } from './';
import { Astrologer } from '../../shared/types/astrologer.ts';

export interface Filters {
  name: string;
  focuses: number[];
  specializations: number[];
  status: number;
}

export type AstrologersState = {
  data: Astrologer[];
  filters: Filters;
  orderByKey: 'status' | 'rating' | 'price';
  orderByValue: 'ASC' | 'DESC';
  availableSpecializations: { id: number; name: string }[];
  availableFocuses: { id: number; name: string }[];
};

interface UpdateFiltersAction {
  type: astrologersAction.UPDATE_FILTER;
  payload: {
    key: keyof Filters;
    value: string | (number | undefined)[];
  };
}

interface UpdateSortingAction {
  type: astrologersAction.UPDATE_SORTING;
  payload: AstrologersState['orderByKey'];
}

interface DeleteAstrologerAction {
  type: astrologersAction.DELETE_ASTROLOGER;
  payload: string;
}

interface UpdateAstrologersFromURL {
  type: astrologersAction.UPDATE_STATE_FROM_URL;
  payload: {
    filters: Partial<Filters>;
    orderByKey?: AstrologersState['orderByKey'];
    orderByValue?: AstrologersState['orderByValue'];
  };
}

export type AstrologersAction =
  | UpdateFiltersAction
  | DeleteAstrologerAction
  | UpdateSortingAction
  | UpdateAstrologersFromURL;
