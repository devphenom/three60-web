import { AnyAction, createSlice } from '@reduxjs/toolkit';
import {
  setAuthUser,
  setIsAuth,
  handleLogout,
} from '@auth/services/auth-utils';
import { authApi } from './auth-api-slice';

interface IAuthUser {
  token: string;
}

const initialState: IAuthUser = {
  token: '',
};

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    logout: (state) => {
      handleLogout();
      state = initialState;
    },

    setAuth: (state, action: { payload: string }) => {
      const token = action.payload;
      setIsAuth(token);
      setAuthUser(token);
      state.token = token;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        const token = action.payload.token;
        setAuthUser(token);
        setIsAuth(token);
        state.token = token;
      },
    );

    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        const token = action.payload.token;
        setAuthUser(token);
        setIsAuth(token);
        state.token = token;
      },
    );

    builder.addMatcher(
      authApi.endpoints.googleAuth.matchFulfilled,
      (state, action) => {
        const token = action.payload.token;
        setAuthUser(token);
        setIsAuth(token);
        state.token = token;
      },
    );
  },
});

export const { logout, setAuth } = authUserSlice.actions;

export default authUserSlice.reducer;
