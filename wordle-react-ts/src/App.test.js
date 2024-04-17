import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Wordle/i);
  expect(linkElement).toBeInTheDocument();
});
