import { FormEvent, useState } from 'react';
import { testMount } from '@utils/testMount';
import DesktopHeader from './desktop-header';

const TestDesktopHeader = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: FormEvent<HTMLInputElement>) =>
    setValue(e.currentTarget.value);
  return <DesktopHeader value={value} handleChange={handleChange} />;
};

test('should render without crashing', () => {
  const mountedDesktopHeader = testMount(<TestDesktopHeader />);

  expect(mountedDesktopHeader).toBeTruthy();
});

test('should render Logo successfully', () => {
  const mountedDesktopHeader = testMount(<TestDesktopHeader />);

  expect(mountedDesktopHeader.getByTestId('logo')).toBeDefined();
});
