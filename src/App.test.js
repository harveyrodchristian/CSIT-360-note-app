import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Cozy Notes logo title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Cozy Notes/i);
  expect(titleElement).toBeInTheDocument();
});
