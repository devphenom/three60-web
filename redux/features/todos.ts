import toaster from '@utils/toast';
import { getHTTPErrorMessage } from '@utils/functions';
import { ITodoState } from '@components/todos/todo-services/types';
import { FormikValues } from 'formik';
import {
  getAllTodos,
  postTodo,
} from '@components/todos/todo-services/todo-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiStatus } from '../../types';

const initialState: ITodoState = {
  allTodos: [],
  getAllTodoStatus: ApiStatus.idle,
  postTodoStatus: ApiStatus.idle,
  postTodoError: null,
};

export const getAllTodosAction = createAsyncThunk(
  'todos/fetchTodosAction',
  async () => {
    const response = await getAllTodos();

    return response.data.results;
  },
);

export const postTodoAction = createAsyncThunk(
  'todo/postTodoAction',
  async (data: FormikValues, { rejectWithValue }) => {
    try {
      const response = await postTodo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(getHTTPErrorMessage(error));
    }
  },
);

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
