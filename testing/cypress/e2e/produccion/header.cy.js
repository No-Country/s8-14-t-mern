import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders correct text in header', () => {
  // Renderiza el componente
  render(<Header />);

  // Realiza la comprobación del texto en el header
  const headerElement = screen.getByRole('heading', { name: 'pigmeo' });
  expect(headerElement).toBeInTheDocument();
});
