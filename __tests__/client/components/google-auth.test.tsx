import { screen } from '@testing-library/react';
import { testMount } from '@utils/testMount';
import { GoogleAuth } from '@components';

test('should render google-auth without crashing', () => {
  const component = testMount(<GoogleAuth />);

  expect(component).toBeTruthy();
  expect(screen.getByTestId(/google-button/)).toHaveTextContent(
    'Sign in with Google',
  );
});
