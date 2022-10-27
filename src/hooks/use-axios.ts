import React from 'react';
import axios, { AxiosResponse } from 'axios';

type AxiosProps = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  reqData?: any;
};

const axiosInstance = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_BASEURL,
  baseURL: '/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const useAxios = ({ url, method, reqData = {} }: AxiosProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState<number>();
  const [data, setData] = React.useState();

  //   initialize method
  let handleMethod;
  if (method === 'GET') {
    handleMethod = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse = await axiosInstance.get(url);
        if (response) {
          setLoading(false);
          setData(response.data);
          setStatus(response.status);
        }
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
        setStatus(error.status);
      }
    };
  }

  if (method === 'POST') {
    handleMethod = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse = await axiosInstance.post(url, data);
        if (response) {
          setLoading(false);
          setData(response.data);
          setStatus(response.status);
        }
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
        setStatus(error.status);
      }
    };
  }

  if (method === 'PUT') {
    handleMethod = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse = await axiosInstance.post(url, data);
        if (response) {
          setLoading(false);
          setData(response.data);
          setStatus(response.status);
        }
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        setError(error.message);
        setStatus(error.status);
      }
    };
  }

  return {
    handleRequest: handleMethod,
    loading,
    error,
    refetch: handleMethod,
    status,
    data,
  };
};

export default useAxios;
