import React, { ReactNode } from 'react';
import { mount as mountBase, MountRendererProps, ReactWrapper } from 'enzyme';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '@definitions/chakra/theme';
import { Provider } from 'react-redux';
import store from '@redux/store';

/**
 * Custom renderer example with enzyme
 * You can customize it to your needs.
 *
 * To learn more about customizing renderer,
 * please visit https://enzymejs.github.io/enzyme/
 */

const AllTheProviders = ({ children }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </ChakraProvider>
    </>
  );
};

const mount: (node: ReactNode, options?: MountRendererProps) => ReactWrapper = (
  node,
  options,
) => {
  return mountBase(<AllTheProviders>{node}</AllTheProviders>, options);
};

// override render method
export default mount;
