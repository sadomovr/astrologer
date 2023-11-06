import { configureStore } from '@reduxjs/toolkit';
import { astrologer } from './astrologers';

export const store = configureStore({
  reducer: {
    astrologers: astrologer.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
