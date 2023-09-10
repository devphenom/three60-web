import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from '@redux/store';

import '@styles/globals.css';
import theme from '../theme';
import { isAuth, tokenVar } from '@auth/services/auth-utils';
import { useAppDispatch } from '@redux/hooks';
import { useEffect } from 'react';
import { setAuth } from '@auth/redux/auth-slice';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
        >
          <ExtendComponent Component={Component} pageProps={pageProps} />
        </GoogleOAuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

const ExtendComponent = ({ Component, pageProps }: any) => {
  const token = tokenVar();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!isAuth()) {
      dispatch(setAuth(token || ''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
