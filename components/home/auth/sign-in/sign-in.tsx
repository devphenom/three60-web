import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Formik, FormikValues } from 'formik';
import { Box, Heading, Text } from '@chakra-ui/react';

import { Button } from '@global/button';
import { authUser } from '@redux/features/user';
import { useToaster, useLazyAxios } from '@hooks';
import { FormInput, GoogleAuth } from '@components';

import { AuthProps } from '../types';
import { SIGNIN_VALIDATION_SCHEMA } from '../formValidation';

type SignInProps = AuthProps;

const SignIn: React.FC<SignInProps> = ({ handleAuth }: SignInProps) => {
  const router = useRouter();
  const toaster = useToaster();
  const dispatch = useDispatch();
  const [signIn, { loading }] = useLazyAxios('/auth/signin', 'POST');

  const onSubmit = async (values: FormikValues) => {
    const { data, error } = await signIn(values);
    if (data) {
      dispatch(authUser(data));
      router.push('/todos');
      toaster.success('Signin Successful.');
    }
    if (error) {
      toaster.danger(error);
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

                <GoogleAuth />

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
