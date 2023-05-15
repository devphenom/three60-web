import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SessionProvider, useSession } from 'next-auth/react';
import store from '@redux/store';

import '@styles/globals.css';
import { LoadingStateSpinner } from '@components/global';
import { Session } from 'next-auth';
import { createContext } from 'react';
import theme from '../theme';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <AuthWrapper>
          <ChakraProvider theme={theme}>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
            >
              <Component {...pageProps} />
            </GoogleOAuthProvider>
          </ChakraProvider>
        </AuthWrapper>
      </Provider>
    </SessionProvider>
  );
}

interface AuthProps {
  children: React.ReactElement;
}

interface IAuthContext {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  session: Session | null;
}
export const AuthContext = createContext({} as IAuthContext);

export const AuthWrapper = ({
  children,
}: AuthProps): React.ReactElement | null => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status, data } = useSession();

  if (status === 'loading') {
    return <LoadingStateSpinner />;
  }

  return (
    <AuthContext.Provider value={{ status, session: data }}>
      {children}
    </AuthContext.Provider>
  );
};

export default MyApp;
