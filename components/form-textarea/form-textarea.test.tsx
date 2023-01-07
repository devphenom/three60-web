import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import FormTexarea from './form-textarea';

const TestTexareaForm: React.FC = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) =>
    setValue(e.currentTarget?.value);

  const props = {
    name: 'sample-form',
    value,
    onChange: handleChange,
    placeholder: 'sample-form',
  };

  return <FormTexarea {...props} />;
};

test('should render input without crashing', () => {
  render(<TestTexareaForm />);

  expect(screen.getByPlaceholderText(/sample-form/)).toBeInTheDocument();
});

test('should render with initial values', () => {
  render(<TestTexareaForm />);

  const input = screen.getByPlaceholderText(/sample-form/) as HTMLInputElement;

  expect(input.value).toBe('');
  expect(screen.getByPlaceholderText(/sample-form/)).toBeInTheDocument();
});

test('should change value on onChange function call', () => {
  render(<TestTexareaForm />);

  const input = screen.getByPlaceholderText(/sample-form/) as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'john doe' } });

  expect(input).toHaveValue('john doe');
});
