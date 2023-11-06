import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUniqueFocuses, getUniqueSpecializations } from './astrologers.helper.ts';
import astro from '../../mock/astrologers.json';
import {
  AstrologersState,
  UpdateAstrologersFromURLPayload,
  UpdateFiltersActionPayload,
} from './astrologers.types.ts';

const initialState: AstrologersState = {
  data: astro.data,
  filters: {
    name: '',
    focuses: [],
    specializations: [],
    status: 0,
  },
  orderByKey: 'status',
  orderByValue: 'DESC',
  availableSpecializations: getUniqueSpecializations(astro.data),
  availableFocuses: getUniqueFocuses(astro.data),
};

const astrologersSlice = createSlice({
  name: 'astrologers',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<UpdateFiltersActionPayload>) => {
      const { key, value } = action.payload;
      state.filters = {
        ...state.filters,
        [key]: value,
      };
    },
    updateSorting: (state, action: PayloadAction<AstrologersState['orderByKey']>) => {
      const { orderByKey, orderByValue } = state;

      if (action.payload === orderByKey) {
        state.orderByValue = orderByValue === 'DESC' ? 'ASC' : 'DESC';
      } else {
        state.orderByKey = action.payload;
        state.orderByValue = 'ASC';
      }
    },
    deleteAstrologer: (state, action: PayloadAction<string>) => {
      const index = state.data.findIndex(({ id }) => id === action.payload);

      if (index !== -1) {
        state.data[index].isDelete = true;
      }
    },
    updateStateFromURL: (state, action: PayloadAction<UpdateAstrologersFromURLPayload>) => {
      const { filters, orderByKey, orderByValue } = action.payload;

      state.filters = {
        name: filters.name || state.filters.name,
        specializations: filters.specializations || state.filters.specializations,
        focuses: filters.focuses || state.filters.focuses,
        status: filters.status || state.filters.status,
      };

      state.orderByKey = orderByKey || state.orderByKey;
      state.orderByValue = orderByValue || state.orderByValue;
    },
  },
});

export const astrologer = {
  actions: astrologersSlice.actions,
  reducer: astrologersSlice.reducer,
};
