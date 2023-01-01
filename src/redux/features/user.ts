import { createSlice } from '@reduxjs/toolkit';
import { setAuthUser, setIsAuth, handleLogout } from './../../utils/auth';

interface IAuthUser {
  access_token: string;
  username: string;
  email: string;
}

const initialState: IAuthUser | {} = {};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    authUser: (state, action) => {
      setAuthUser(action.payload);
      setIsAuth(action.payload.access_token);
      state = action.payload;
    },
    logout: (state) => {
      handleLogout();
      state = initialState;
    },
  },
});

export const { authUser, logout } = authUserSlice.actions;

export default authUserSlice.reducer;
