import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useLazyAxios from '@hooks/use-axios/use-axios';
import Register from './register';
import { testMount } from '@utils/testMount';

jest.mock('@hooks/use-axios/use-axios');

const mockUseLazyAxios = useLazyAxios as jest.MockedFunction<
  typeof useLazyAxios
>;

test('should render Register without crashing', () => {
  mockUseLazyAxios.mockReturnValue([
    () => Promise.resolve({ data: null, loading: false, error: null }),
    {
      data: null,
      loading: false,
      error: '',
      cancel: () => null,
    },
  ]);

  testMount(<Register handleAuth={() => null} />);

  expect(screen.getByText(/Create Account/)).toBeInTheDocument();
});

test('should render signin form', async () => {
  mockUseLazyAxios.mockReturnValue([
    () => Promise.resolve({ data: null, loading: false, error: null }),
    {
      data: null,
      loading: false,
      error: '',
      cancel: () => null,
    },
  ]);

  testMount(<Register handleAuth={() => null} />);

  expect(screen.getByLabelText(/Username/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByTestId(/signup-button/)).toBeInTheDocument();
  expect(screen.getByTestId(/signup-button/)).toHaveTextContent('Sign Up');
});

test('should render a loading button', async () => {
  mockUseLazyAxios.mockImplementation(() => [
    () => Promise.resolve({ data: null, loading: true, error: null }),
    {
      data: null,
      loading: true,
      error: '',
      cancel: () => null,
    },
  ]);

  testMount(<Register handleAuth={() => null} />);

  const usernameInput = screen.getByLabelText(/Username/);
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password');
  const submitButton = screen.getByTestId(/signup-button/);

  const testValue = 'iphenom011111111111';

  await act(async () => {
    fireEvent.change(usernameInput, { target: { value: testValue } });
    fireEvent.change(emailInput, { target: { value: testValue } });
    fireEvent.change(passwordInput, { target: { value: testValue } });
    fireEvent.change(confirmPasswordInput, { target: { value: testValue } });
    fireEvent.click(submitButton);
  });

  expect(submitButton).toHaveTextContent('Loading');
});

test('should post to database', async () => {
  mockUseLazyAxios
    .mockReturnValueOnce([
      () => Promise.resolve({ data: null, loading: false, error: null }),
      {
        data: null,
        loading: false,
        error: '',
        cancel: () => null,
      },
    ])
    .mockReturnValueOnce([
      () =>
        Promise.resolve({
          data: { token: 'receive_token_from_backend', username: 'iphenom' },
          loading: true,
          error: null,
        }),
      {
        data: { token: 'receive_token_from_backend', username: 'iphenom' },
        loading: true,
        error: '',
        cancel: () => null,
      },
    ]);

  testMount(<Register handleAuth={() => null} />);

  const submitButton = screen.getByTestId(/signup-button/);

  expect(submitButton).not.toHaveTextContent('Loading');

  await act(async () => {
    fireEvent.click(submitButton);
  });
  expect(mockUseLazyAxios).toHaveBeenCalled();
});
