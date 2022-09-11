import { Box, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';

// type Props = {};

const Auth: React.FC = () => {
  return (
    <Box flex="1" p="150px 100px">
      <Stack w="full" bg="blue.500" alignItems="flex-start">
        <HStack mb={4}>
          <Image alt="logo" src="/icons/logo.svg" />
          <Heading as="h2" fontSize="24px" color="brand.100" fontWeight="500">
            three60
          </Heading>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Auth;
