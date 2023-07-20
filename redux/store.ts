import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';

import { api } from './api';
import userReducer from '@auth/redux/auth-slice';
import todoReducer from '@todos/redux/todo-slice';

const appReducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
  [api.reducerPath]: api.reducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'authUser/logout') {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
