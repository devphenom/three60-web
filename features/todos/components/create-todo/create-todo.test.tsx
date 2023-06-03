import { fireEvent, screen } from '@testing-library/react';
import { testMount } from '@utils/testMount';
import CreateTodo from './create-todo';

test('should render without crashing', () => {
  const mountedCreateTodo = testMount(<CreateTodo />);

  expect(mountedCreateTodo).toBeTruthy();
});

test('should have a create todo button', () => {
  testMount(<CreateTodo />);

  expect(screen.getByTestId('create-todo')).toBeDefined();
});

test('should call onOpen event when button is clicked', () => {
  testMount(<CreateTodo />);
  const onOpen = () => null;
  const createTodoBtn = screen.getByTestId('create-todo');

  fireEvent.click(createTodoBtn);

  expect(onOpen).toHaveBeeenCalled;
});
