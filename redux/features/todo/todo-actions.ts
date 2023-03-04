import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllTodos,
  postTodo,
} from '@components/todos/todo-services/todo-api';
import { FormikValues } from 'formik';

import { isAuth } from '@utils/auth';
import { getHTTPErrorMessage } from '@utils/functions';
import { ITodo } from '@components/todos/todo-services/types';

export const getAllTodosAction = createAsyncThunk(
  'todos/fetchTodosAction',
  async () => {
    const response = await getAllTodos();

    return response.data.results;
  },
);

export const postTodoAction = createAsyncThunk<ITodo, { rejectValue: string }>(
  'todo/postTodoAction',
  async (data: FormikValues, { rejectWithValue }) => {
    const _isAuth = await isAuth();
    if (!_isAuth) {
      return rejectWithValue('Session Expired');
    }
    try {
      const response = await postTodo(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(getHTTPErrorMessage(error));
    }
  },
);
