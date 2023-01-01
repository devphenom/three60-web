import { useGoogleLogin } from '@react-oauth/google';
import { render, screen } from '@testing-library/react';
import GoogleAuth from './google-auth';

jest.mock('@react-oauth/google');
const mockUseGoogleLogin = useGoogleLogin as jest.MockedFunction<
  typeof useGoogleLogin
>;

test('should render google-auth without crashing', () => {
  render(<GoogleAuth />);

  const googleButton = screen.getByTestId('google-button');

  expect(googleButton).toBeInTheDocument();
});
