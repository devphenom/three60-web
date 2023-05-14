import React from 'react';
import { Button } from '@global/button';
import { Image } from '@chakra-ui/react';

import { signIn } from 'next-auth/react';
type Props = {};

const GoogleAuth = (props: Props) => {
  return (
    <Button
      data-testid="google-button"
      mb={6}
      type="button"
      w="full"
      colorScheme="gray"
      color="brand.500"
      onClick={() => signIn('google')}
    >
      <Image src={'/icons/google-icon.svg'} alt="google-icon" mr={5} />
      Sign in with Google
    </Button>
  );
};

export default GoogleAuth;
