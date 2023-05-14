import { signOut } from 'next-auth/react';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../_app';

function Logout() {
  const { status } = useContext(AuthContext);

  useEffect(() => {
    signOut({ callbackUrl: `/` });
    // eslint-disable-next-line
  }, [status]);

  return <></>;
}

export default Logout;
