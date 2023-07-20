import { createSlice } from '@reduxjs/toolkit';
import { todoApi } from './todo-api';
import { ITodoReducer, ITodoStatus } from '@todos/services/todo-types';
import { defaultTodoStatus } from '@todos/services/todo-utils';
// import { ITodoState } from '@todos/services/todo-utils';

const initialState: ITodoReducer = {
  todoCounts: null,
  currentStatus: defaultTodoStatus,
  searchTerm: '',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setCurrentStatus: (state, { payload }: { payload: ITodoStatus }) => {
      state.currentStatus = payload;
    },

    setSearchTerm: (state, { payload }: { payload: string }) => {
      state.searchTerm = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      todoApi.endpoints.getTodoCounts.matchFulfilled,
      (state, action) => {
        state.todoCounts = action.payload.result;
        // state.currentStatus = action.payload.result[0];
      },
    );
  },
});

export const { setCurrentStatus, setSearchTerm } = todoSlice.actions;

export default todoSlice.reducer;
