import React from 'react';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { Box, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';

import { Button } from '@global/button';
import FormInput from '@global/form-input/form-input';

// type Props = {};

const Auth: React.FC = () => {
  return (
    <Box flex="1" p="50px 100px">
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
          // children={undefined}
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          onSubmit={(values: FormikValues) => console.log(values)}
          // initialValues={initialValues}
          // validationSchema={HOST_ACCOUNT_INFO_FORM_SCHEMA}
          // innerRef={hostBankFormRef}
          // onSubmit={() => null}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box w="full" maxW="384px">
                  <FormInput
                    mb={5}
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="johndoe@three60.com"
                    value={values.email}
                    isInvalid={touched.email && !!errors.email}
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
                    name="confirmPassword"
                    placeholder="********"
                    value={values.confirmPassword}
                    isInvalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                    validationMessage={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    onChange={handleChange}
                    type="password"
                    mb={7}
                  />

                  <Button mb={6} type="submit" w="full" colorScheme="brand">
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
