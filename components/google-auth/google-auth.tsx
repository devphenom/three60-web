import React from 'react';
import { Button } from '@global/button';
import { Image } from '@chakra-ui/react';

import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import { useToaster } from '@hooks';
import { useGoogleAuthMutation } from '@auth/redux/auth-api-slice';
import { getHTTPErrorMessage } from '@utils/functions';

const GoogleAuth = () => {
  const router = useRouter();
  const toaster = useToaster();
  const [mutate, { isLoading }] = useGoogleAuthMutation();

  const handleResponse = async (response: TokenResponse) => {
    try {
      await mutate({ token: response.access_token }).unwrap();

      router.push('/todos');
      toaster.success('Signin Successful.');
    } catch (error) {
      toaster.danger(getHTTPErrorMessage(error));
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleResponse,
    onError: (response) => console.log(response),
  });

  return (
    <Button
      data-testid="google-button"
      mb={6}
      type="button"
      w="full"
      colorScheme="gray"
      color="brand.500"
      isLoading={isLoading}
      onClick={() => login()}
    >
      <Image src={'/icons/google-icon.svg'} alt="google-icon" mr={5} />
      Sign in with Google
    </Button>
  );
};

export default GoogleAuth;
