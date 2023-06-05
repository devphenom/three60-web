import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, FormikValues } from 'formik';
import { Box, Heading, Text } from '@chakra-ui/react';

import { useToaster } from '@hooks';
import { Button } from '@global/button';
import { FormInput, GoogleAuth } from '@components';
import { getHTTPErrorMessage, handleNavigate } from '@utils/functions';

import { useSignInMutation } from '@auth/redux/auth-api-slice';
import { SIGNIN_VALIDATION_SCHEMA } from '@auth/services/form-validation';

const SignIn: React.FC = () => {
  const router = useRouter();
  const toaster = useToaster();
  const [mutate, { isLoading }] = useSignInMutation();

  // check if there is a callback url
  const returnUrl = router?.query.returnUrl as string;

  const onSubmit = async (values: FormikValues) => {
    try {
      const res = await mutate(values).unwrap();

      toaster.success('Success');
      handleNavigate(returnUrl, router);
    } catch (error: any) {
      toaster.danger(getHTTPErrorMessage(error));
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
                    <Link color="brand.500" href="/auth/register">
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
