import { FormikValues } from 'formik';
import { axiosInstance, ApiConfig } from '@utils/axios-config';
import { tokenVar } from '@utils/auth';

export const getAllTodos = async () => {
  const token = tokenVar();

  return axiosInstance.get(ApiConfig.todo, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// export const getTodoCounts = async () => {

// }

export const postTodo = async (data: FormikValues) => {
  const token = tokenVar();
  // TODO: add / before create
  const postTodoConfig = `${ApiConfig.todo}create`;
  return axiosInstance.post(postTodoConfig, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
