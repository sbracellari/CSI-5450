import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import collectionReducer from '../features/collection/collectionSlice';
import headerReducer from '../features/header/headerSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tabs: headerReducer,
    collection: collectionReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
