import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from '@redux/features/user';
import todoReducer from '@redux/features/todos';

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
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
export default store;
