import { astrologersAction, AstrologersAction, AstrologersState } from './';
import { getUniqueFocuses, getUniqueSpecializations } from './astrologers.helper.ts';
import astro from '../../mock/astrologers.json';

const initialState: AstrologersState = {
  data: astro.data,
  filters: {
    name: '',
    focuses: [],
    specializations: [],
    status: undefined,
  },
  orderByKey: 'status',
  orderByValue: 'DESC',
  availableSpecializations: getUniqueSpecializations(astro.data),
  availableFocuses: getUniqueFocuses(astro.data),
};

export const astrologersReducer = (
  state = initialState,
  action: AstrologersAction,
): AstrologersState => {
  switch (action.type) {
    case astrologersAction.UPDATE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
      };
    case astrologersAction.UPDATE_SORTING: {
      const { orderByKey, orderByValue } = state;

      if (action.payload === orderByKey) {
        return {
          ...state,
          orderByValue: orderByValue === 'DESC' ? 'ASC' : 'DESC',
        };
      }

      return {
        ...state,
        orderByKey: action.payload,
        orderByValue: 'ASC',
      };
    }
    case astrologersAction.DELETE_ASTROLOGER:
      return {
        ...state,
      };
    case astrologersAction.UPDATE_STATE_FROM_URL:
      return {
        ...state,
        filters: {
          name: action.payload.filters.name || state.filters.name,
          specializations: action.payload.filters.specializations || state.filters.specializations,
          focuses: action.payload.filters.focuses || state.filters.focuses,
          status: action.payload.filters.status || state.filters.status,
        },
        orderByKey: action.payload.orderByKey || state.orderByKey,
        orderByValue: action.payload.orderByValue || state.orderByValue,
      };
    default:
      return state;
  }
};
