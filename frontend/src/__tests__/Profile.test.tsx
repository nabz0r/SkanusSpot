import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfilePage from '../pages/Profile';

const queryClient = new QueryClient();

describe('ProfilePage', () => {
  it('renders user preferences correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfilePage />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Preferences')).toBeInTheDocument();
    });
  });

  it('updates user preferences successfully', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfilePage />
      </QueryClientProvider>
    );

    const veganCheckbox = await screen.findByLabelText('Vegan');
    fireEvent.click(veganCheckbox);

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(veganCheckbox).toBeChecked();
    });
  });
});