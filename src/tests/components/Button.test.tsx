import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/common/Button';

describe('Button Component', () => {
  it('renders children with default primary styling', () => {
    render(<Button>Click Me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
  });

  it('handles click events properly', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Action</Button>);
    const btn = screen.getByRole('button', { name: /action/i });
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when disabled or isLoading', () => {
    const handleClick = vi.fn();
    const { rerender } = render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    let btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();

    rerender(
      <Button isLoading onClick={handleClick}>
        Loading
      </Button>
    );
    btn = screen.getByRole('button', { name: /loading/i });
    expect(btn).toBeDisabled();
  });
});
