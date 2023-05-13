import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isAuth } from '../../utils/auth';
import { LoadingStateSpinner } from '@global';

const withAuth = (Component: NextComponentType) => {
  const AuthenticatedComponent = ({ isAuth }: { isAuth: boolean }) => {
    const router = useRouter();

    const handleRender = () => {
      if (!isAuth) {
        const returnUrl = router.asPath;

        process.browser &&
          router.push(`/?returnUrl=${encodeURIComponent(returnUrl)}`);

        return null;
      }

      if (isAuth) {
        return <Component />;
      }

      return <LoadingStateSpinner />;
    };

    return <>{handleRender()}</>;
  };

  AuthenticatedComponent.getServerSideProps = async () => {
    if (!isAuth()) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        isAuth: isAuth(),
      },
    };
  };

  return AuthenticatedComponent;
};

export default withAuth;
