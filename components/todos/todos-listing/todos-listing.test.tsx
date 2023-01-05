import { testMount } from '@utils/testMount';
import TodosListing from './todos-listing';

test('should render without crashing', () => {
  const mountedCreateTodo = testMount(<TodosListing />);

  expect(mountedCreateTodo).toBeTruthy();
});
