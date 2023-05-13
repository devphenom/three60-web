import { testMount } from '@utils/testMount';
import TodosListing from './todos-listing';

test('should render without crashing', () => {
  const mountedCreateTodo = testMount(<TodosListing data={[]} />);

  expect(mountedCreateTodo).toBeTruthy();
});
