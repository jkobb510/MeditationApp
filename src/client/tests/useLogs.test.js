import { render, waitFor, screen } from '@testing-library/react';
import useLogs from '../hooks/useLogs';
import React from 'react';

function TestComponent({ username }) {
  const { logs, loading } = useLogs(username);
  return (
    <div>
      <div data-testid="logs">{JSON.stringify(logs)}</div>
      <div data-testid="loading">{loading.toString()}</div>
    </div>
  );
}

describe('useLogs', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        fetch.mockReset();
    });

    test('fetches logs on mount with valid username', async () => {
      const mockLogs = [{ username: 'test', durationSeconds: 60 }];
      fetch.mockResolvedValueOnce({ json: () => async () => mockLogs });
      render(<TestComponent username="test" />);

      await waitFor(() => {
        expect(screen.getByTestId('logs').textContent).toBe(JSON.stringify(mockLogs));
        expect(screen.getByTestId('loading').textContent).toBe('false');
      });
    });
});

