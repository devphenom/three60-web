import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { Box, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';

import { Button } from '@global/button';
import FormInput from '@global/form-input/form-input';

import { SIGNUP_VALIDATION_SCHEMA } from './formValidation';
import { useLazyAxios } from '@hooks/use-axios';
import { login } from '@redux/features/user';
import useToaster from '../../hooks/use-toast';

// type Props = {};

const Auth: React.FC = () => {
  const dispatch = useDispatch();

  const toaster = useToaster();

  const [signUp, { loading }] = useLazyAxios('/auth/register', 'POST');

  const register = async (values: FormikValues) => {
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
    <Box flex="1" p={['20px', '20px', '50px 100px']}>
      <Stack w="full" alignItems="flex-start">
        <HStack mb={4}>
          <Image alt="logo" src="/icons/logo.svg" />
          <Heading as="h2" fontSize="24px" color="brand.100" fontWeight="500">
            three60
          </Heading>
        </HStack>

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
          onSubmit={register}
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
                  <Text>
                    Already have an account? <Text as="span">Sign in</Text>
                  </Text>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Stack>
    </Box>
  );
};

export default Auth;
