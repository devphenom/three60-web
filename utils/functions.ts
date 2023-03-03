import { ApiStatus } from './../types';
export const getHTTPErrorMessage = (error: any): string => {
  if (error?.response) {
    /* The request was made
    the server responded with a status code that falls out of range of 2xx */
    return (
      error.response.data.message ||
      error.response.data.error ||
      error.response.data.detail
    );
  }

  if (error?.message) {
    // Something happened in setting up the request that triggered an error
    return error.message;
  }

  if (error?.request) {
    // The request was made but no response was received
    return 'Something went wrong';
  }
  return '';
};

export const isLoading = (value: any) => value === ApiStatus.loading;

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};
