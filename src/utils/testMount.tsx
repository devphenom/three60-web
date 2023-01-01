import { Provider } from 'react-redux';
import store from '@redux/store';
import theme from '@chakra/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
          >
            {children}
          </GoogleOAuthProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
};

const mount = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export { mount as testMount };
