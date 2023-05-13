import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import theme from 'theme';
import store from '@redux/store';

import '@styles/globals.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
          >
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
