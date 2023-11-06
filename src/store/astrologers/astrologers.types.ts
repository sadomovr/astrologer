import { Astrologer } from '../../shared/types/astrologer.ts';

export interface AstrologersFilters {
  name: string;
  focuses: number[];
  specializations: number[];
  status: number;
}

export type AstrologersFiltersKey = keyof AstrologersFilters;

export interface AstrologerWithDelete extends Astrologer {
  isDelete?: boolean;
}

export type AstrologersState = {
  data: AstrologerWithDelete[];
  filters: AstrologersFilters;
  orderByKey: 'status' | 'rating' | 'price';
  orderByValue: 'ASC' | 'DESC';
  availableSpecializations: { id: number; name: string }[];
  availableFocuses: { id: number; name: string }[];
};

export type UpdateFiltersActionPayload = {
  key: keyof AstrologersFilters;
  value: string | number | number[];
};

export type UpdateAstrologersFromURLPayload = {
  filters: Partial<AstrologersFilters>;
  orderByKey?: AstrologersState['orderByKey'];
  orderByValue?: AstrologersState['orderByValue'];
};
