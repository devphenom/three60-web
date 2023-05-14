import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { isAuth } from '../../utils/auth';
import { LoadingStateSpinner } from '@global';
import { AuthContext } from '../../pages/_app';

const withAuth = (Component: NextComponentType) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const { session } = useContext(AuthContext);

    const handleRender = () => {
      if (!session) {
        const returnUrl = router.asPath;

        process.browser &&
          router.push(
            `/auth/signin?returnUrl=${encodeURIComponent(returnUrl)}`,
          );

        return null;
      }

      if (session) {
        return <Component />;
      }

      return <LoadingStateSpinner />;
    };

    return <>{handleRender()}</>;
  };

  // AuthenticatedComponent.getServerSideProps = async () => {
  //   return {
  //     // props: {},
  //   };
  // };

  return AuthenticatedComponent;
};

export default withAuth;
