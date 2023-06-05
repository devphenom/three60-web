// import { createAsyncThunk } from '@reduxjs/toolkit';
// import todoApiManager from '@features/todos/redux/todo-api';
// import { FormikValues } from 'formik';

// import { getHTTPErrorMessage } from '@utils/functions';
// import { ITodo } from '@features/todos/services/todo-utils';
// import toaster from '@utils/toast';
// import { AxiosResponse } from 'axios';

// interface ErrorValue {
//   rejectValue?: string;
// }
// interface IGetAllTodosActionResult {
//   results: ITodo[];
//   counts: number[];
// }

// // export const getAllTodosAction = createAsyncThunk<IGetAllTodosActionResult>(
// //   'todos/fetchTodosAction',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await getAllTodosApi();
// //       console.log(response);

// //       return {
// //         results: response.data.todos,
// //         counts: response.data.counts,
// //       } as IGetAllTodosActionResult;
// //     } catch (error) {
// //       return rejectWithValue(getHTTPErrorMessage(error));
// //     }
// //   },
// // );

// export const postTodoAction = createAsyncThunk<ITodo, ErrorValue>(
//   'todo/postTodoAction',
//   async (data: FormikValues, { rejectWithValue }) => {
//     // const _isAuth = isAuth();
//     // if (!_isAuth) {
//     //   toaster.danger('Session Expired');
//     //   return rejectWithValue('Session Expired');
//     // }

//     try {
//       const response = await todoApiManager.PostTodosApi(data);
//       return (response as AxiosResponse).data;
//     } catch (error) {
//       return rejectWithValue(getHTTPErrorMessage(error));
//     }
//   },
// );
