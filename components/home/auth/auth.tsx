import React, { useState } from 'react';
import { Box, Heading, HStack, Image, Stack } from '@chakra-ui/react';

import SignIn from './sign-in/sign-in';
import Register from './register/register';

const Auth: React.FC = () => {
  const [signIn, setSignIn] = useState(true);

  const handleAuth = () => setSignIn((prev) => !prev);

  return (
    <Box flex="1" p={['20px', '20px', '50px 100px']}>
      <Stack w="full" alignItems="flex-start">
        <HStack mb={4}>
          <Image alt="logo" src="/icons/logo.svg" />
          <Heading as="h2" fontSize="24px" color="brand.100" fontWeight="500">
            three60
          </Heading>
        </HStack>

        {signIn ? (
          <SignIn handleAuth={handleAuth} />
        ) : (
          <Register handleAuth={handleAuth} />
        )}
      </Stack>
    </Box>
  );
};

export default Auth;
