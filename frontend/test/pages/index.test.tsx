import { render, screen } from '@testing-library/react';
import Home from '@/pages';

describe('Index page', () => {
  it('works', () => {
    render(<Home />);

    const someText = screen.getByText(/Get started by editing/i);

    expect(someText).toBeVisible();
  });
});
