import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RestaurantPage from '../pages/Restaurant';

const queryClient = new QueryClient();

describe('RestaurantPage', () => {
  it('displays restaurant information', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RestaurantPage />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Opening Hours')).toBeInTheDocument();
    });
  });

  it('handles booking submission', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RestaurantPage />
      </QueryClientProvider>
    );

    const dateInput = await screen.findByLabelText('Select Date');
    const timeSelect = screen.getByLabelText('Select Time');
    const guestsSelect = screen.getByLabelText('Number of Guests');

    fireEvent.change(dateInput, { target: { value: '2025-01-15' } });
    fireEvent.change(timeSelect, { target: { value: '19:00' } });
    fireEvent.change(guestsSelect, { target: { value: '2' } });

    const bookButton = screen.getByText('Book Table');
    fireEvent.click(bookButton);

    await waitFor(() => {
      expect(screen.getByText('Booking Confirmed!')).toBeInTheDocument();
    });
  });
});