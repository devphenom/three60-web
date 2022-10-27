import * as yup from 'yup';

export const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Invalid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, ({ min }) => `Password must be minimum of ${min} characters`),

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .test(
      'confirmPassword',
      'Passwords must match',
      (value, context) => context.parent.password === value,
    ),
});
