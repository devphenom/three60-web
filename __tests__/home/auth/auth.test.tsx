import { render } from '@testing-library/react';
import Auth from '@components/auth/auth';

describe('Auth', () => {
  test('renders Auth correctly', () => {
    render(<Auth />);
  });
});
