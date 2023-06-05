import { api } from '@redux/api';
import { ITodo, ITodoStatus } from '@todos/services/todo-types';
import { FormikValues } from 'formik';

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodoCounts: build.query<{ result: ITodoStatus[] }, void>({
      query: () => '/todos/counts',
      providesTags: ['Todos'],
    }),
    getTodos: build.query<{ todos: ITodo[] }, number>({
      query: (status) => `/todos?statusId=${status}`,
      providesTags: ['Todos'],
    }),
    postTodo: build.mutation<void, FormikValues>({
      query: (body) => {
        return {
          url: '/todos',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Todos'],
    }),
    updateTodo: build.mutation<void, FormikValues>({
      query: (body) => {
        return {
          url: `/todos/${body._id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['Todos'],
    }),
    getTodoStatus: build.query<{status: ITodoStatus[]}, void>({
      query: () => '/todos/status',
    }),
  }),
});

export const {
  useGetTodoCountsQuery,
  useGetTodosQuery,
  usePostTodoMutation,
  useUpdateTodoMutation,
  useGetTodoStatusQuery,
} = todoApi;
