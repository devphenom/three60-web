import axios, { AxiosResponse } from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';

// Axios Instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

interface axiosProps {
  url: string;
  method: 'POST' | 'GET' | 'PUT';
  payload?: any;
}

const useAxios = ({ url, method, payload }: axiosProps) => {
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

export default useAxios;

export const useLazyAxios: any = (
  url: string,
  method: string,
  payload?: object,
) => {
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

// import React from 'react';
// import axios, { AxiosResponse } from 'axios';

// type AxiosProps = {
//   url: string;
//   method: 'GET' | 'POST' | 'PUT' | 'DELETE';
//   reqData?: any;
// };

// const axiosInstance = axios.create({
//   //   baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
//   baseURL: '/',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// const useAxios = ({ url, method, reqData = {} }: AxiosProps) => {
//   const [loading, setLoading] = React.useState(false);
//   const [error, setError] = React.useState(null);
//   const [status, setStatus] = React.useState<number>();
//   const [data, setData] = React.useState();

//   //   initialize method
//   let handleMethod;
//   if (method === 'GET') {
//     handleMethod = async () => {
//       setLoading(true);
//       try {
//         const response: AxiosResponse = await axiosInstance.get(url);
//         if (response) {
//           setLoading(false);
//           setData(response.data);
//           setStatus(response.status);
//         }
//       } catch (error: any) {
//         setLoading(false);
//         setError(error.message);
//         setStatus(error.status);
//       }
//     };
//   }

//   if (method === 'POST') {
//     handleMethod = async () => {
//       setLoading(true);
//       try {
//         const response: AxiosResponse = await axiosInstance.post(url, data);
//         if (response) {
//           setLoading(false);
//           setData(response.data);
//           setStatus(response.status);
//         }
//       } catch (error: any) {
//         setLoading(false);
//         setError(error.message);
//         setStatus(error.status);
//       }
//     };
//   }

//   if (method === 'PUT') {
//     handleMethod = async () => {
//       setLoading(true);
//       try {
//         const response: AxiosResponse = await axiosInstance.post(url, data);
//         if (response) {
//           setLoading(false);
//           setData(response.data);
//           setStatus(response.status);
//         }
//       } catch (error: any) {
//         console.log(error);
//         setLoading(false);
//         setError(error.message);
//         setStatus(error.status);
//       }
//     };
//   }

//   return {
//     handleRequest: handleMethod,
//     loading,
//     error,
//     refetch: handleMethod,
//     status,
//     data,
//   };
// };

// export default useAxios;
