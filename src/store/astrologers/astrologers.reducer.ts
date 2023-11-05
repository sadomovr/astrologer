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
  orderBy: 'status',
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
      };
    case astrologersAction.UPDATE_SORTING:
      return {
        ...state,
      };
    case astrologersAction.DELETE_ASTROLOGER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
