import { FormikValues } from 'formik';
import { axiosInstance, ApiConfig } from '@utils/axios-config';

export const getAllTodos = async () => axiosInstance.get(ApiConfig.todo);

export const postTodo = async (data: FormikValues) => {
  // TODO: add / before create
  const postTodoConfig = `${ApiConfig.todo}create`;
  return axiosInstance.post(postTodoConfig, data);
};
