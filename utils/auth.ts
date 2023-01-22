import clientStorage from './clientStorage';
import { THREE60_AUTH_TOKEN, THREE60_AUTH_USER } from './constants';

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

export const handleLogout = () => {
  clientStorage.removeItem(THREE60_AUTH_USER);
  clientStorage.removeItem(THREE60_AUTH_TOKEN);
};
