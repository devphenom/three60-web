import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Landing from '@components/home/landing';

describe('Landing', () => {
  it('renders landing correctly', () => {
    render(<Landing />);
    const heading = screen.getByText(`Track how far you've gone`);
    const lists = screen.getAllByTestId('landing-lists');
    const description = screen.getByTestId('description');

    expect(lists).toHaveLength(3);
    expect(description).toBeInTheDocument();

    expect(heading).toMatchSnapshot();
    expect(lists).toMatchSnapshot();
    expect(description.textContent).toMatchSnapshot();
  });
});
