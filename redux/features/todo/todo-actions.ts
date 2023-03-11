import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllTodos,
  postTodo,
  getTodoCounts,
} from '@components/todos/todo-services/todo-api';
import { FormikValues } from 'formik';

import { isAuth } from '@utils/auth';
import { getHTTPErrorMessage } from '@utils/functions';
import { ITodo, ITodoCount } from '@components/todos/todo-services/types';
import toaster from '@utils/toast';

type ErrorValue = {
  rejectValue?: string;
};
interface IGetAllTodosActionResult {
  results: ITodo[];
  counts: ITodoCount[];
}

export const getAllTodosAction = createAsyncThunk<
  IGetAllTodosActionResult,
  ErrorValue
>('todos/fetchTodosAction', async (_, { rejectWithValue }) => {
  const _isAuth = await isAuth();
  if (!_isAuth) {
    toaster.danger('Session Expired');
    return rejectWithValue('Session Expired');
  }
  try {
    const response = await getAllTodos();
    const todoCountsResponse = await getTodoCounts();

    return {
      results: response.data.results,
      counts: todoCountsResponse.data,
    } as IGetAllTodosActionResult;
  } catch (error) {
    return rejectWithValue(getHTTPErrorMessage(error));
  }
});

export const postTodoAction = createAsyncThunk<ITodo, ErrorValue>(
  'todo/postTodoAction',
  async (data: FormikValues, { rejectWithValue }) => {
    const _isAuth = await isAuth();
    if (!_isAuth) {
      toaster.danger('Session Expired');
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
