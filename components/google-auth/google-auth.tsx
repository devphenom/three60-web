import React from 'react';
import { Button } from '@global/button';
import { Image } from '@chakra-ui/react';
import useLazyAxios from '@hooks/use-axios/use-axios';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import useToaster from '../../hooks/use-toast/use-toast';
import { authUser } from '../../redux/features/user';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

type Props = {};

const GoogleAuth = (props: Props) => {
  const toaster = useToaster();
  const router = useRouter();
  const dispatch = useDispatch();
  const [googleLogin, { loading }] = useLazyAxios('/auth/google-login', 'POST');

  const handleResponse = async (response: TokenResponse) => {
    const { data, error } = await googleLogin({ code: response.access_token });

    if (data) {
      dispatch(authUser(data));
      router.push('/todos');
      toaster.success('Signin Successful.');
    }
    if (error) {
      toaster.danger(error);
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
