import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Landing from '@components/home/landing/landing';

describe('Landing', () => {
  it('should render landing without crashing', () => {
    render(<Landing />);
    const heading = screen.getByText(`Track how far you've gone`);
    const lists = screen.getAllByTestId('landing-lists');
    const description = screen.getByTestId('description');

    expect(heading).toBeInTheDocument();
    expect(lists).toHaveLength(3);
    expect(description).toBeInTheDocument();

    expect(heading).toMatchSnapshot();
    expect(lists).toMatchSnapshot();
    expect(description.textContent).toMatchSnapshot();
  });
});
