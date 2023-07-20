import React from 'react';
import AuthWrapper from '@auth/components/auth-wrapper/auth-wrapper';
import SignInComponent from '@auth/components/sign-in/sign-in';

type Props = {};

const Register = (props: Props) => {
  return (
    <AuthWrapper>
      <SignInComponent />
    </AuthWrapper>
  );
};

export default Register;
