import { screen } from '@testing-library/react';
import { testMount } from '@utils/testMount';
import TodoCard from './todo-card';

test('should render todo card without crashing', () => {
  const mountedTodoCard = testMount(<TodoCard />);

  expect(mountedTodoCard).toBeTruthy();
});

test('should render heading and date', () => {
  testMount(<TodoCard />);

  expect(screen.getByTestId('heading')).toBeTruthy();
  expect(screen.getByTestId('date-created')).toBeInTheDocument();
});
