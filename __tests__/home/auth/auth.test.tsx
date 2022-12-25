import Auth from '@components/auth/auth';
import { render } from '@testing-library/react';

describe('Auth', () => {
  test('renders Auth correctly', () => {
    render(<Auth />);
  });
});
