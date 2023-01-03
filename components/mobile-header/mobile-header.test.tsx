import { FormEvent, useState } from 'react';
import { testMount } from '@utils/testMount';
import MobileHeader from './mobile-header';

const TestMobileHeader = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: FormEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);
  return <MobileHeader value={value} handleChange={handleChange} />;
};

test('should render without crashing', () => {
  const mountedMobileHeader = testMount(<TestMobileHeader />);

  expect(mountedMobileHeader).toBeTruthy();
});

test('should render Logo successfully', () => {
  const mountedMobileHeader = testMount(<TestMobileHeader />);

  expect(mountedMobileHeader.getByTestId('logo')).toBeDefined();
});
