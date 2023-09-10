import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Landing from '@features/landing/landing';

describe('Landing', () => {
  it('should render landing without crashing', () => {
    render(<Landing />);
    const heading = screen.getByText(`Track how far you've gone`);
    const lists = screen.getAllByTestId('landing-lists');
    const description = screen.getByTestId('description');

    expect(heading).toBeInTheDocument();
    expect(lists).toHaveLength(4);
    expect(description).toBeInTheDocument();

    expect(heading).toMatchSnapshot();
    expect(lists).toMatchSnapshot();
    expect(description.textContent).toMatchSnapshot();
  });
});
