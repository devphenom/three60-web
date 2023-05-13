import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import FormInput from '@components/form-input/form-input';

const TestInputForm: React.FC = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) =>
    setValue(e.currentTarget?.value);

  const props = {
    name: 'sample-form',
    value,
    onChange: handleChange,
    placeholder: 'sample-form',
  };

  return <FormInput {...props} />;
};

test('should render input without crashing', () => {
  render(<TestInputForm />);

  expect(screen.getByPlaceholderText(/sample-form/)).toBeInTheDocument();
});

test('should render with initial values', () => {
  render(<TestInputForm />);

  const input = screen.getByPlaceholderText(/sample-form/) as HTMLInputElement;

  expect(input.value).toBe('');
  expect(screen.getByPlaceholderText(/sample-form/)).toBeInTheDocument();
});

test('should change value on onChange function call', () => {
  render(<TestInputForm />);

  const input = screen.getByPlaceholderText(/sample-form/) as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'john doe' } });

  expect(input).toHaveValue('john doe');
});
