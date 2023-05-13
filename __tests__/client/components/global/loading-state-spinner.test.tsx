import { LoadingStateSpinner } from '@global';
import { testMount } from '@utils/testMount';

test('should render without crashing', () => {
  const component = testMount(<LoadingStateSpinner />);

  expect(component).toBeTruthy();
});
