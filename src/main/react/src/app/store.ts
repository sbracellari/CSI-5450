import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tabsReducer from '../features/router/tabsSlice';
import authReducer from '../features/auth/authSlice';
import { api } from '../services/api';
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    tabs: tabsReducer, //this could be component state instead of redux
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
