import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllTodos,
  postTodo,
} from '@components/todos/todo-services/todo-api';
import { FormikValues } from 'formik';
import { getHTTPErrorMessage } from '@utils/functions';
import { isAuth } from '@utils/auth';
import clientStorage from '@utils/clientStorage';
import { THREE60_AUTH_TOKEN } from '../../../utils/constants';

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
      const _isAuth = await isAuth(
        clientStorage.getItem(THREE60_AUTH_TOKEN) || '',
      );
      if (_isAuth) {
        const response = await postTodo(data);
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(getHTTPErrorMessage(error));
    }
  },
);
