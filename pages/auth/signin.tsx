import React from 'react';
import AuthWrapper from '@features/auth/auth-wrapper/auth-wrapper';
import SignInComponent from '@features/auth/sign-in/sign-in';

type Props = {};

const Register = (props: Props) => {
  return (
    <AuthWrapper>
      <SignInComponent />
    </AuthWrapper>
  );
};

export default Register;
