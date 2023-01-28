import { axiosInstance, ApiConfig } from '@utils/axios-config';

export const getAllTodos = async () => axiosInstance.get(ApiConfig.todo);
