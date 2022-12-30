import * as yup from 'yup';

export const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
  username: yup.string().trim().required('Username is required'),
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, ({ min }) => `Password must be minimum of ${min} characters`),

  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .test(
      'confirm_password',
      'Passwords must match',
      (value, context) => context.parent.password === value,
    ),
});

export const SIGNIN_VALIDATION_SCHEMA = yup.object().shape({
  username: yup.string().trim().required('Username/email is required'),
  password: yup.string().trim().required('Password is required'),
});
