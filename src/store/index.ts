import { combineReducers, legacy_createStore as createStore } from 'redux';
import { AstrologersState, astrologersReducer } from './astrologers';

const rootReducer = combineReducers({
  astrologers: astrologersReducer,
});

export const store = createStore(rootReducer);

export type RootState = {
  astrologers: AstrologersState;
};
