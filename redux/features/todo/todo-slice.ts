import toaster from '@utils/toast';
import { ITodoState } from '@components/todos/todo-services/types';
import { createSlice } from '@reduxjs/toolkit';
import { ApiStatus } from '../../../types';
import { getAllTodosAction, postTodoAction } from './todo-actions';

const initialState: ITodoState = {
  allTodos: [],
  getAllTodoStatus: ApiStatus.idle,
  postTodoStatus: ApiStatus.idle,
  postTodoError: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all todos
    builder.addCase(getAllTodosAction.pending, (state) => {
      state.getAllTodoStatus = ApiStatus.loading;
    });
    builder.addCase(getAllTodosAction.rejected, (state) => {
      state.getAllTodoStatus = ApiStatus.error;
    });
    builder.addCase(getAllTodosAction.fulfilled, (state, action) => {
      state.getAllTodoStatus = ApiStatus.success;
      state.allTodos = action.payload;
    });

    // post todo
    builder.addCase(postTodoAction.pending, (state) => {
      state.postTodoStatus = ApiStatus.loading;
    });
    builder.addCase(postTodoAction.rejected, (state, action) => {
      state.postTodoStatus = ApiStatus.error;
      state.postTodoError = action.error;
      toaster.danger(action.error.message);
    });
    builder.addCase(postTodoAction.fulfilled, (state, action) => {
      state.postTodoStatus = ApiStatus.success;
      state.allTodos = [...state.allTodos, action.payload];
      state.postTodoError = null;
      toaster.success('Todo created successfully');
    });
  },
});

// export const {} = todoSlice.actions;

export default todoSlice.reducer;
