import { Header } from '@global';
import { testMount } from '@utils/testMount';

test('should render without crashing', () => {
  const component = testMount(<Header />);

  expect(component).toBeTruthy();
});
