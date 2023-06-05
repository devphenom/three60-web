import { Provider } from 'react-redux';
import store from '@redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import theme from '../theme/index';

interface MountOptions extends Omit<RenderOptions, 'wrapper'> {
  session?: any; // Update the type as per your session data structure
}
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'admin' },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

const AllTheProviders = ({
  children,
  session,
}: {
  children: ReactNode;
  session?: any;
}) => {
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

const mount = (ui: ReactElement, options?: MountOptions) =>
  render(ui, {
    wrapper: (props) => (
      <AllTheProviders {...props} session={options?.session} />
    ),
    ...options,
  });

export { mount as testMount };
