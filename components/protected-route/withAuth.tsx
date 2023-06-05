import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { LoadingStateSpinner } from '@global';
import { isAuth } from '@auth/services/auth-utils';
import { useAppSelector } from '@redux/hooks';

const withAuth = (Component: NextComponentType) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    const { token } = useAppSelector((state) => state.user);

    useEffect(() => {
      if (!isAuth()) {
        const returnUrl = router.asPath;
        router.push(`/auth/signin?returnUrl=${encodeURIComponent(returnUrl)}`);
      }
      setIsLoading(false);
    }, [isLoading, router, token]);

    if (!isLoading && token) {
      return <Component />;
    }

    return <LoadingStateSpinner />;
  };

  // AuthenticatedComponent.getServerSideProps = async () => {
  //   return {
  //     // props: {},
  //   };
  // };

  return AuthenticatedComponent;
};

export default withAuth;
