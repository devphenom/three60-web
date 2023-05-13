import { THREE60_AUTH_TOKEN } from './constants';
import clientStorage from '@utils/clientStorage';
import axios from 'axios';

// Axios Instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${clientStorage.getItem(THREE60_AUTH_TOKEN)}`,
  },
});

export const ApiConfig = {
  todo: '/todo',
  todoCount: '/todo/counts',
};
