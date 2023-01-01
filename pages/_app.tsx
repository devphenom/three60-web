import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme';
import store from '@redux/store';

import '@styles/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
        >
          <Component {...pageProps} />
        </GoogleOAuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
