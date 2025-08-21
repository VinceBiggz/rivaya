import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from '../app/page';

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    expect(screen.getByText('RIVAYA')).toBeInTheDocument();
    expect(screen.getByText('AI-Powered Group Management')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<HomePage />);
    expect(
      screen.getByText(
        'Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.'
      )
    ).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<HomePage />);
    expect(screen.getByText('Get Started Free')).toBeInTheDocument();
    expect(screen.getByText('Watch Demo')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<HomePage />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
    });
  });
});
