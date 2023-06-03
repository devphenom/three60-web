import { api } from '@redux/api';
import { ITodo, ITodoStatus } from '@todos/services/todo-types';
import { FormikValues } from 'formik';

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodoCounts: build.query<{ result: ITodoStatus[] }, void>({
      query: () => '/todos/counts',
    }),
    getTodos: build.query<{ todos: ITodo[] }, number>({
      query: (status) => `/todos?statusId=${status}`,
    }),
    postTodo: build.mutation<void, FormikValues>({
      query: (body) => {
        return {
          url: '/todos',
          method: 'POST',
          body,
        };
      },
    }),
    // getPost: build.query<Post, number>({
    //   query: (id) => `posts/${id}`,
    //   providesTags: (_result, _err, id) => [{ type: 'Posts', id }],
    // }),

    // updatePost: build.mutation<Post, Partial<Post>>({
    //   query(data) {
    //     const { id, ...body } = data;
    //     return {
    //       url: `posts/${id}`,
    //       method: 'PUT',
    //       body,
    //     };
    //   },
    //   invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    // }),
    // deletePost: build.mutation<{ success: boolean; id: number }, number>({
    //   query(id) {
    //     return {
    //       url: `posts/${id}`,
    //       method: 'DELETE',
    //     };
    //   },
    //   invalidatesTags: (post) => [{ type: 'Posts', id: post?.id }],
    // }),
  }),
});

export const { useGetTodoCountsQuery, useGetTodosQuery, usePostTodoMutation } =
  todoApi;
