import { testMount } from '@utils/testMount';
import TodoNavbar from './todo-navbar';

test('should render without crashing', () => {
  const mountedCreateTodo = testMount(
    <TodoNavbar
      currentState={{ id: 1, name: 'hello', value: 3 }}
      updateCurrentState={(state) => null}
    />,
  );

  expect(mountedCreateTodo).toBeTruthy();
});
