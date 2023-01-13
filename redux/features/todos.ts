import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTodos: {},
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodos: (state, action) => {
      state = { ...state, allTodos: action.payload };
    },
  },
});

export const { fetchTodos } = todoSlice.actions;

export default todoSlice.reducer;
