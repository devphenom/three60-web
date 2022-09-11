import mount from '@test/mount';
import { Button as BaseButton } from '@chakra-ui/react';

import { Button } from './index';

describe('Button component testing with enzyme', () => {
  it('renders without crashing', () => {
    const component = mount(<Button onClick={() => undefined} />);

    expect(component).toBeTruthy();
  });

  it('button is clickable', () => {
    const mockFn = jest.fn();

    const component = mount(<Button onClick={mockFn} />);
    const btn = component.find(BaseButton);

    btn.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
