import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import collectionReducer from '../features/collection/collectionSlice';
import tabsReducer from '../features/router/tabsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tabs: tabsReducer,
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
