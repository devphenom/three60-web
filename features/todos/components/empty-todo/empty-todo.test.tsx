import { fireEvent, screen } from '@testing-library/react';
import { testMount } from '@utils/testMount';
import EmptyTodo from './empty-todo';

test('should render without crashing', () => {
  const mountedEmptyTodo = testMount(<EmptyTodo />);

  expect(mountedEmptyTodo).toBeTruthy();
});

test('should have rendered empty todo component', () => {
  testMount(<EmptyTodo />);

  expect(screen.getByTestId('empty-todo')).toBeDefined();
});
