import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@redux/features/user';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
