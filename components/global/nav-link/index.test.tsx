import { NavLink } from '@global';
import { testMount } from '@utils/testMount';
import '@testing-library/react';
import { screen } from '@testing-library/react';

test('should render NavLink without crashing', () => {
  const mountedNavLink = testMount(<NavLink href="/todo"> todo</NavLink>);

  expect(mountedNavLink).toBeTruthy();
});
test('should render wiith children', () => {
  testMount(<NavLink href="/todo">todo</NavLink>);

  expect(screen.getByTestId('nav-link')).toHaveTextContent('todo');
});
