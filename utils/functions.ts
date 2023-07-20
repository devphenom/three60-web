import { NextRouter } from 'next/router';
import { ApiStatus } from './../types';
import jwt from 'jsonwebtoken';
import { NextApiResponse } from 'next';
import { handleInvalidToken } from './error-handler';

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

  if (error?.data) {
    return error.data.message;
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

export const parseJwt = (token: string) =>
  JSON.parse(atob(token.split('.')[1]));

export function toKebab(string: string) {
  return (
    string
      // ...
      .replace(/[_\s]+/g, '-')
  );
}

export function toSentence(string: string) {
  const interim = toKebab(string).replace(/-/g, ' ');
  return interim.slice(0, 1).toUpperCase() + interim.slice(1);
}

// replace the first letter of every word with its uppercase equivalent
export function toTitleCase(str: string) {
  return str.toLowerCase().replace(/^(.)|\s+(.)/g, function (match) {
    return match.toUpperCase();
  });
}

// removes all spaces in a sentence
export function removeSpaces(str: string) {
  return str.replace(/\s/g, '');
}

// handle callback url navigation
export const handleNavigate = (returnUrl: string, router: NextRouter) => {
  if (returnUrl) {
    router.push(returnUrl);
  }
  router.push('/todos');
};

export const verifyToken = (token: string, res: NextApiResponse) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    return decoded as any;
  } catch (error) {
    handleInvalidToken(res);
  }
};

export function formatDate(datetime: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(new Date(datetime));
}

export function formatDatetime(
  datetime: string,
  dateStyle: 'full' | 'long' | 'medium' | 'short' | undefined,
) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: dateStyle ?? 'medium',
    timeStyle: 'short',
    hour12: false,
  }).format(new Date(datetime));
}

export function formatEventDate(datetime: string, withoutDay: boolean) {
  if (withoutDay)
    return new Intl.DateTimeFormat('en-GB', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(datetime));

  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(datetime));
}

export function formatEventTime(datetime: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h24',
    timeZone: 'Africa/Lagos',
    timeZoneName: 'short',
  }).format(new Date(datetime));
}

export function formatFullDate(datetime: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(datetime));
}
