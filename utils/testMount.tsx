import { Provider } from 'react-redux';
import store from '@redux/store';
import theme from 'theme';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

interface MountOptions extends Omit<RenderOptions, 'wrapper'> {
  session?: any; // Update the type as per your session data structure
}

const AllTheProviders = ({
  children,
  session,
}: {
  children: ReactNode;
  session?: any;
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
            >
              {children}
            </GoogleOAuthProvider>
          </ChakraProvider>
        </Provider>
      </SessionProvider>
    </>
  );
};

const mount = (ui: ReactElement, options?: MountOptions) =>
  render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} session={options?.session} />
    ),
    ...options,
  });

export { mount as testMount };
