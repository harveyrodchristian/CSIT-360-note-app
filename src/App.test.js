import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NoteFlow brand title', () => {
  render(<App />);
  const titleElement = screen.getByText(/NoteFlow/i);
  expect(titleElement).toBeInTheDocument();
});
