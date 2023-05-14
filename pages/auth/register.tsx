import { Box } from '@chakra-ui/react';
import React from 'react';
import AuthWrapper from '@features/auth/auth-wrapper/auth-wrapper';
import RegisterComponent from '@features/auth/register/register';

type Props = {};

const Register = (props: Props) => {
  return (
    <AuthWrapper>
      <RegisterComponent />
    </AuthWrapper>
  );
};

export default Register;
