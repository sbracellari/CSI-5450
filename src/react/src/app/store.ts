import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import collectionReducer from '../features/collection/collectionSlice';
import detailReducer from '../features/collection/detailSlice';
import tabsReducer from '../features/router/tabsSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    tabs: tabsReducer,
    collection: collectionReducer,
    detail: detailReducer
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
