import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useLazyAxios from '@hooks/use-axios/use-axios';
import { testMount } from '@utils/testMount';
import Register from '@features/auth/register/register';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

jest.mock('@hooks/use-axios/use-axios');

jest.mock('next-auth/react', () => {
  signIn: jest.fn();
});

// setup router mock
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => {
    return {
      pathname: '/',
      pathName: '/',
      push: jest.fn(),
      query: { returnUrl: '/todos' },
    };
  }),
}));

const mockUseLazyAxios = useLazyAxios as jest.MockedFunction<
  typeof useLazyAxios
>;

test('should render Register without crashing', () => {
  testMount(<Register />);

  expect(screen.getByText(/Create Account/)).toBeInTheDocument();
});

test('should render register form', async () => {
  testMount(<Register />);

  expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByTestId(/signup-button/)).toBeInTheDocument();
  expect(screen.getByTestId(/signup-button/)).toHaveTextContent('Sign Up');
});
