import { TodosComponent } from '.';
import { testMount } from '@utils/testMount';

test('should render without crashing', () => {
  const mountedTodoComponent = testMount(<TodosComponent />);

  expect(mountedTodoComponent).toBeTruthy();
});
