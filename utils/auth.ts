import Router from 'next/router';
import { NextResponse } from 'next/server';
import clientStorage from './clientStorage';
import { THREE60_AUTH_TOKEN, THREE60_AUTH_USER } from './constants';
import { parseJwt } from './functions';
import toaster from '@utils/toast';

export const setIsAuth = (token: string) => {
  if (token) {
    clientStorage.setItem(THREE60_AUTH_TOKEN, token);
  } else {
    clientStorage.removeItem(THREE60_AUTH_TOKEN);
  }
};

export const setAuthUser = (user: {
  token: string;
  username: string;
  email: string;
}) => {
  const isUserExist = Object.keys(user).length > 0;
  if (isUserExist) {
    clientStorage.setItem(THREE60_AUTH_USER, JSON.stringify(user));
  } else {
    clientStorage.removeItem(THREE60_AUTH_USER);
  }
};

export const isAuth = async () => {
  const token = tokenVar();
  if (!!token) {
    const { exp: expiry } = await parseJwt(token);

    if (new Date(expiry * 100) < new Date()) {
      // toaster.danger('Session Expired');
      Router.push('/');
      return false;
    }
    return true;
  }

  return false;
};

export const handleLogout = () => {
  clientStorage.removeItem(THREE60_AUTH_USER);
  clientStorage.removeItem(THREE60_AUTH_TOKEN);
};

export const tokenVar = () => clientStorage.getItem(THREE60_AUTH_TOKEN);
