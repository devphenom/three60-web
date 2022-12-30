import axios, { AxiosResponse } from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
import { object } from 'yup';

// Axios Instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

type TAxiosResponse = {
  data: null | object;
  error: null | string;
  loading: boolean;
};

type THandleRequest = (param: object) => Promise<TAxiosResponse>;

interface IUseAxios {
  refetch: THandleRequest;
  data: null | object;
  error: null | string;
  loading: boolean;
  cancel: () => void;
}

type IUseLazyAxios = [
  THandleRequest,
  {
    data: null | object;
    error: null | string;
    loading: boolean;
    cancel: () => void;
  },
];

const useAxios = (url: string, method: string, payload?: object): IUseAxios => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current?.abort();
  };

  const handleRequest = useCallback(
    async (param?: object) => {
      try {
        setLoading(true);

        const response: AxiosResponse = await axiosInstance.request({
          data: payload ?? param,
          signal: controllerRef.current.signal,
          method,
          url,
        });

        setData(response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
        return { data, loading, error };
      }
    },
    [data, error, loading, method, payload, url],
  );

  useEffect(() => {
    handleRequest();
  }, [handleRequest, method, payload, url]);

  return { refetch: handleRequest, data, error, loading, cancel };
};

const useLazyAxios = (
  url: string,
  method: string,
  payload?: object,
): IUseLazyAxios => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const renderRef = useRef(false);

  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current?.abort();
  };

  const handleRequest = useCallback(
    async (param?: any) => {
      let _data, _error, _loading;
      try {
        setLoading(true);
        _loading = true;

        const response: AxiosResponse = await axiosInstance.request({
          data: payload ?? param,
          signal: controllerRef.current.signal,
          method,
          url,
        });

        setData(response.data);
        _data = response.data;
      } catch (error: any) {
        setError(error.message);
        _error = error.message;
      } finally {
        setLoading(false);
        _loading = false;
      }

      return { data: _data, loading: _loading, error: _error };
    },
    [method, payload, url],
  );

  useEffect(() => {
    if (renderRef.current === false) {
      renderRef.current = true;
    }

    // handleRequest();
  }, [handleRequest]);

  return [handleRequest, { data, error, loading, cancel }];
};
export default useLazyAxios;
