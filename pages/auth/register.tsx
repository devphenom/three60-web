import React from 'react';
import AuthWrapper from '@auth/components/auth-wrapper/auth-wrapper';
import RegisterComponent from '@auth/components/register/register';

type Props = {};

const Register = (props: Props) => {
  return (
    <AuthWrapper>
      <RegisterComponent />
    </AuthWrapper>
  );
};

export default Register;
