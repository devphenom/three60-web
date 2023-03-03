import { createSlice } from '@reduxjs/toolkit';
import { setAuthUser, setIsAuth, handleLogout } from '@utils/auth';

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
      // TODO: change access token to access_token
      setIsAuth(action.payload['access token']);
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
