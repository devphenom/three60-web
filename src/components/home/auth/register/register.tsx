import { useDispatch } from 'react-redux';
import { Formik, FormikValues } from 'formik';
import { Box, Heading, Text } from '@chakra-ui/react';

import { Button } from '@global/button';
import { authUser } from '@redux/features/user';
import useToaster from '@hooks/use-toast/use-toast';
import FormInput from '@global/form-input/form-input';
import useLazyAxios from '@hooks/use-axios/use-axios';
import GoogleAuth from '@components/google-auth/google-auth';

import { AuthProps } from '../types';
import { SIGNUP_VALIDATION_SCHEMA } from '../formValidation';
import { useRouter } from 'next/router';

type RegisterProps = AuthProps;

const Register: React.FC<RegisterProps> = (props) => {
  const { handleAuth } = props;

  const toaster = useToaster();
  const dispatch = useDispatch();
  const router = useRouter();
  const [signUp, { loading }] = useLazyAxios('/auth/register', 'POST');

  const onSubmit = async (values: FormikValues) => {
    const { data, error } = await signUp(values);

    if (data) {
      dispatch(authUser(data));
      router.push('/todos');
      toaster.success('Signin successful.');
    }
    if (error) {
      toaster.danger(error);
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
                  data-testid="signup-button"
                >
                  Sign Up
                </Button>
                <GoogleAuth />

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
