import axios from 'axios';

// Axios Instance
export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 200000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${clientStorage.getItem(THREE60_AUTH_TOKEN)}`,
  },
});

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // console.warn(`[Request] ${config.url}: `, JSON.stringify(config.data));
    return {
      ...config,
      cancelToken: source.token,
    };
  },
  (error) => {
    console.error(`[Request Error] in ${error.request?._url}: `, error);
    return Promise.reject(error.message);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.warn(
      `[Response] of ${response.config.url}: `,
      JSON.stringify(response.data),
    );
    return response.data;
  },
  (error) => {
    console.error(`[Response Error] in ${error.config?.url}: `, error);
    const data = error.response?.data;
    let errorMessage = '';

    if (data) {
      console.error(
        `[Response Error.Response.Data] in ${error.config?.url}: `,
        JSON.stringify(data),
      );
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        const errorMessageArray =
          data.data.map((currentValue: any) => currentValue.message) || [];
        errorMessage = errorMessageArray.join('\n');
      } else {
        const errorMag = data.error.Message ? data.error.Message : data.message;
        errorMessage = errorMag;
      }
    } else {
      errorMessage = error.message;
    }

    return Promise.reject(errorMessage);
  },
);
