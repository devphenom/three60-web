import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Formik, FormikValues } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

import { useToaster } from '@hooks';
import { Button } from '@global/button';
import { FormInput, GoogleAuth } from '@components';
import { getHTTPErrorMessage, handleNavigate } from '@utils/functions';
import { SIGNUP_VALIDATION_SCHEMA } from '@components/home/auth/formValidation';

import { AuthContext } from '../../../pages/_app';

const Register: React.FC = () => {
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
        email: values.email,
        redirect: false,
        action: 'signUp',
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
                  isLoading={isLoading}
                  mb={6}
                  type="submit"
                  w="full"
                  colorScheme="brand"
                  data-testid="signup-button"
                >
                  Sign Up
                </Button>
                <GoogleAuth />

                <Text>
                  Already have an account?{' '}
                  <Text as="span" color="brand.500">
                    <Link color="brand.500" href="/auth/signin">
                      Sign in
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

export default Register;
