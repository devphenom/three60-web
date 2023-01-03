import { testMount } from '@utils/testMount';
import { Logo } from './index';

describe('should render without crashing', () => {
  const component = testMount(<Logo />);

  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });
});
