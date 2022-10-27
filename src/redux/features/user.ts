import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { email: '' },
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
