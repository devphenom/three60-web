import React from 'react';
import { Button } from '@global/button';
import { Image } from '@chakra-ui/react';
import useLazyAxios from '@hooks/use-axios/use-axios';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';

type Props = {};

const GoogleAuth = (props: Props) => {
  const [googleLogin, { loading }] = useLazyAxios('/auth/google-login/', 'GET');

  const handleResponse = async (response: TokenResponse) => {
    const { data, error } = await googleLogin({ code: response.access_token });

    if (data) {
      console.log(data);
    }
    if (error) {
      console.log(error);
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
      isLoading={loading}
      onClick={() => login()}
    >
      <Image src={'/icons/google-icon.svg'} alt="google-icon" mr={5} />
      Sign in with Google
    </Button>
  );
};

export default GoogleAuth;
