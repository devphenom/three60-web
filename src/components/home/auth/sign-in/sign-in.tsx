import GoogleLogin from 'react-google-login';
import { Formik, FormikValues } from 'formik';
import { Box, Heading, Image, Text } from '@chakra-ui/react';

import { Button } from '@global/button';
import useToaster from '@hooks/use-toast/use-toast';
import useLazyAxios from '@hooks/use-axios/use-axios';
import FormInput from '@global/form-input/form-input';

import { AuthProps } from '../types';
import { SIGNIN_VALIDATION_SCHEMA } from '../formValidation';
import { useEffect } from 'react';

type SignInProps = AuthProps;

const SignIn: React.FC<SignInProps> = (props: SignInProps) => {
  const { handleAuth } = props;

  const toaster = useToaster();

  const [signIn, { loading }] = useLazyAxios('/auth/signin', 'GET');

  const onSubmit = async (values: FormikValues) => {
    const { data, error } = await signIn(values);
    if (data) {
      toaster.success('Logged In');
    }
    if (error) {
      toaster.danger('Error occured');
      console.log(error);
    }
  };

  return (
    <>
      <Heading as="h2" fontSize="24px" fontWeight="500">
        Welcome Back
      </Heading>
      <Text color="blackAlpha.400">Login to continue</Text>
      <Formik
        enableReinitialize
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={onSubmit}
        validationSchema={SIGNIN_VALIDATION_SCHEMA}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Box w="full" maxW="384px" mt={5}>
                <FormInput
                  mb={5}
                  label="Username/Email"
                  name="username"
                  placeholder="Enter your username or email"
                  value={values.username}
                  isInvalid={touched?.username && !!errors?.username}
                  validationMessage={touched.username && errors.username}
                  onChange={handleChange}
                />

                <FormInput
                  mb={5}
                  label="Password"
                  name="password"
                  placeholder="********"
                  value={values.password}
                  isInvalid={touched.password && !!errors.password}
                  validationMessage={touched.password && errors.password}
                  onChange={handleChange}
                  type="password"
                />

                <Button
                  isLoading={loading}
                  mb={6}
                  type="submit"
                  w="full"
                  colorScheme="brand"
                  data-testid="sign-in-button"
                >
                  Sign In
                </Button>
                <GoogleLogin
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
                  onSuccess={(response) => console.log(response)}
                  onFailure={(response) => console.log(response)}
                  render={(renderProps) => (
                    <Button
                      mb={6}
                      type="button"
                      w="full"
                      colorScheme="gray"
                      color="brand.500"
                      onClick={renderProps.onClick}
                    >
                      <Image
                        src={'/icons/google-icon.svg'}
                        alt="google-icon"
                        mr={5}
                      />
                      Sign in with Google
                    </Button>
                  )}
                />

                <Text>
                  Not yet signed up?{' '}
                  <Text
                    color="brand.500"
                    as="span"
                    cursor="pointer"
                    onClick={handleAuth}
                  >
                    Create your account here
                  </Text>
                </Text>
              </Box>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default SignIn;
