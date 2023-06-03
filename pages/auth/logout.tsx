import React, { useContext, useEffect } from 'react';
import { useAppDispatch } from '@redux/hooks';
import { logout } from '@auth/redux/auth-slice';

function Logout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line
  }, []);

  return <></>;
}

export default Logout;
