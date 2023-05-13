import { Spinner, Flex } from '@chakra-ui/react';
import React from 'react';

type Props = {
  size?: string;
};

export const LoadingStateSpinner = ({ size = 'xl' }: Props) => {
  return (
    <Flex align="center" justify="center">
      <Spinner size={size} />
    </Flex>
  );
};
