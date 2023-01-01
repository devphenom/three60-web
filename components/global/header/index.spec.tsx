import { Header, Logo } from '@components';
import { testMount } from '../../../utils/testMount';

describe('Header component testing with testing-library', () => {
  const component = testMount(<Header />);

  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });

  // it('renders successfuly next.js logo', () => {
  //   expect(component.find(Logo)).toBeDefined();
  // });
});
