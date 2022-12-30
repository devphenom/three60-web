import GoogleLogin from 'react-google-login';
import { Formik, FormikValues } from 'formik';
import { Box, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';

import { Button } from '@global/button';
import useToaster from '@hooks/use-toast/use-toast';
import { useLazyAxios } from '@hooks/use-axios/use-axios';
import FormInput from '@global/form-input/form-input';

import { AuthProps } from '../types';
import { SIGNUP_VALIDATION_SCHEMA } from '../formValidation';

type RegisterProps = AuthProps;

const Register: React.FC<RegisterProps> = (props) => {
  const { handleAuth } = props;

  const toaster = useToaster();

  const [signUp, { loading }] = useLazyAxios('/auth/register', 'POST');

  const onSubmit = async (values: FormikValues) => {
    const { data, error } = await signUp(values);

    if (data) {
      console.log('data');
      toaster.success('An error occuredjjj');
    }

    if (error) {
      toaster.danger('An error occured');
      console.log(error);
    }
  };

  return (
    <>
      <Heading as="h2" fontSize="24px" fontWeight="500">
        Create Account
      </Heading>
      <Formik
        enableReinitialize
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirm_password: '',
        }}
        onSubmit={onSubmit}
        validationSchema={SIGNUP_VALIDATION_SCHEMA}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Box w="full" maxW="384px">
                <FormInput
                  mb={5}
                  label="Username"
                  name="username"
                  placeholder="Enter your username"
                  value={values.username}
                  isInvalid={touched?.username && !!errors?.username}
                  validationMessage={touched.username && errors.username}
                  onChange={handleChange}
                />

                <FormInput
                  mb={5}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="johndoe@three60.com"
                  value={values.email}
                  isInvalid={touched?.email && !!errors?.email}
                  validationMessage={touched.email && errors.email}
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
                <FormInput
                  label="Confirm Password"
                  name="confirm_password"
                  placeholder="********"
                  value={values.confirm_password}
                  isInvalid={
                    touched.confirm_password && !!errors.confirm_password
                  }
                  validationMessage={
                    touched.confirm_password && errors.confirm_password
                  }
                  onChange={handleChange}
                  type="password"
                  mb={7}
                />

                <Button
                  isLoading={loading}
                  mb={6}
                  type="submit"
                  w="full"
                  colorScheme="brand"
                >
                  Sign Up
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
                  Already have an account?{' '}
                  <Text
                    color="brand.500"
                    as="span"
                    cursor="pointer"
                    onClick={handleAuth}
                  >
                    Sign in
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

export default Register;
