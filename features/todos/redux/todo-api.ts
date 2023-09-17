import { api } from '@redux/api';
import { ITodo, ITodoStatus } from '@todos/services/todo-types';
import { FormikValues } from 'formik';

// interface QueryFunction<T> {
//   (statusId: number, searchTerm: string): T;
// }

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodoCounts: build.query<{ result: ITodoStatus[] }, void>({
      query: () => '/todos/counts',
      providesTags: ['Todos'],
    }),

    getTodos: build.query<
      { todos: ITodo[]; totalPages: number; currentPage: number },
      { statusId: number; searchTerm: string; limit: number; page: number }
    >({
      query: ({ statusId, searchTerm, limit, page }) =>
        `/todos?limit=${limit}&page=${page}&statusId=${statusId}&searchTerm=${searchTerm}`,
      providesTags: ['Todos'],
    }),

    getTodo: build.query<ITodo, string>({
      query: (id: string) => `/todos/${id}`,
      providesTags: ['Todo'],
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
      invalidatesTags: ['Todos', 'Todo'],
    }),

    getTodoStatus: build.query<{ status: ITodoStatus[] }, void>({
      query: () => '/todos/status',
    }),
  }),
});

export const {
  useGetTodoCountsQuery,
  useGetTodosQuery,
  useGetTodoQuery,
  usePostTodoMutation,
  useUpdateTodoMutation,
  useGetTodoStatusQuery,
} = todoApi;
