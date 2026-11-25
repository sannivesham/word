import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from '@/app/App';

describe('App Root Component', () => {
  it('renders application brand and navigation links without crashing', async () => {
    render(<App />);
    expect(screen.getByText('DC Word Doc')).toBeInTheDocument();
    expect(screen.getAllByText('Damayanti Crest').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Stage 1/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Home')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Documents')).toBeInTheDocument();
    });
    expect(screen.getByText('Templates')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });
});
