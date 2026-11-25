import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Test crash in component');
};

describe('ErrorBoundary Component', () => {
  it('catches render errors and displays fallback UI', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something unexpected occurred/i)).toBeInTheDocument();
    expect(screen.getByText(/Test crash in component/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
