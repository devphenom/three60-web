import clientStorage from '../../../utils/clientStorage';
import {
  THREE60_AUTH_TOKEN,
  THREE60_AUTH_USER,
} from '../../../utils/constants';
import { parseJwt } from '@utils/functions';

export const setIsAuth = (token?: string) => {
  if (token) {
    clientStorage.setItem(THREE60_AUTH_TOKEN, token);
  } else {
    clientStorage.removeItem(THREE60_AUTH_TOKEN);
  }
};

export const setAuthUser = (token?: string) => {

  if(!token) {
    return clientStorage.removeItem(THREE60_AUTH_USER);
  }

  const { userInfo } = parseJwt(token);

  const isUserExist = Object.keys(userInfo).length > 0;
  
  if (isUserExist) {
    clientStorage.setItem(THREE60_AUTH_USER, JSON.stringify(userInfo));
  } else {
    clientStorage.removeItem(THREE60_AUTH_USER);
  }
};

export const tokenVar = () => clientStorage.getItem(THREE60_AUTH_TOKEN);

export const isAuth = () => {
  const token = tokenVar();

  if (!!token) {
    const { exp: expiry } = parseJwt(token);
    if (new Date(expiry * 1000) < new Date()) {
      return false;
    } else {
      return true;
    }
  }

  return false;
};

export const handleLogout = () => {
  setIsAuth();
  setAuthUser();
};
