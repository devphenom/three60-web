import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, FormikValues } from 'formik';
import { Box, Heading, Text } from '@chakra-ui/react';

import { useToaster } from '@hooks';
import { Button } from '@global/button';
import { FormInput, GoogleAuth } from '@components';
import { getHTTPErrorMessage, handleNavigate } from '@utils/functions';

import { useRegisterMutation } from '@auth/redux/auth-api-slice';
import { SIGNUP_VALIDATION_SCHEMA } from '@auth/services/form-validation';

const Register: React.FC = () => {
  const router = useRouter();
  const toaster = useToaster();
  const [mutate, { isLoading }] = useRegisterMutation();

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
