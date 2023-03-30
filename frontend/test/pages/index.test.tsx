import { render, screen } from '@testing-library/react';
import Home from '@/pages';

describe('Index page', () => {
  it('should show the welcome message', () => {
    render(<Home />);

    const welcomeText = screen.getByText(/^(welcome to toro)/i);

    expect(welcomeText).toBeVisible();
  });
});
