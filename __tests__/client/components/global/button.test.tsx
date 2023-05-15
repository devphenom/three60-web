import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '@components/global';

test('should render button without crashing', () => {
  render(<Button>Sample Button</Button>);

  expect(screen.getByText('Sample Button')).toBeInTheDocument();
});

test('should fire its onClick correctly', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me!</Button>);

  fireEvent.click(screen.getByText('Click me!'));

  expect(handleClick).toBeCalled();
});
