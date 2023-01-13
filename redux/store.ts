import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@redux/features/user';
import todoReducer from '@redux/features/todos';

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});

export default store;
