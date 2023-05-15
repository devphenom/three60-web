import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Formik, FormikValues } from 'formik';
import { Box, Heading, Text } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

import { Button } from '@global/button';
import { useToaster } from '@hooks';
import { FormInput, GoogleAuth } from '@components';

import { AuthProps } from '@components/home/auth/types';
import { SIGNIN_VALIDATION_SCHEMA } from '@components/home/auth/formValidation';
import { getHTTPErrorMessage, handleNavigate } from '@utils/functions';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../pages/_app';
import Link from 'next/link';

const SignIn: React.FC = () => {
  const router = useRouter();
  const toaster = useToaster();
  const [isLoading, setIsLoading] = useState(false);
  const { status, session } = useContext(AuthContext);

  // check if there is a callback url
  const returnUrl = router?.query.returnUrl as string;

  const onSubmit = async (values: FormikValues) => {
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
        action: 'signIn',
      });

      if (!!res?.ok) {
        handleNavigate(returnUrl, router);
        router.push('/todos');
        toaster.success('Signin successful.');
      }

      if (res?.error) {
        toaster.danger(res?.error);
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toaster.danger(getHTTPErrorMessage(error));
    }
  };

  useEffect(() => {
    if (session) {
      router.push('/todos');
    }
  }, [router, session, status]);

  if (session) {
    handleNavigate(returnUrl, router);
  }

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
                  isLoading={isLoading}
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
                  <Text as="span" color="brand.500">
                    <Link color="brand.500" href="/auth/signin">
                      Create your account here
                    </Link>
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
