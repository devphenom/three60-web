import { render, screen } from '@testing-library/react';
import AuthWrapper from '@auth/components/auth-wrapper/auth-wrapper';

describe('Auth Wrapper', () => {
  it('should render auth wrapper with logo', () => {
    render(
      <AuthWrapper>
        <div></div>
      </AuthWrapper>,
    );

    const logo = screen.getByText('three60');

    expect(logo).toBeInTheDocument();
  });

  it('should render its child element served', () => {
    render(
      <AuthWrapper>
        <div>Hello World</div>
      </AuthWrapper>,
    );

    const sampleText = screen.getByText('Hello World');

    expect(sampleText).toBeInTheDocument();
  });
});
