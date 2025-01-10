import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export function UserBookings() {
  const { t } = useTranslation();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['user-bookings'],
    queryFn: async () => {
      const response = await fetch('/api/user/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      return response.json();
    }
  });

  if (isLoading) return <div>{t('common.loading')}</div>;

  return (
    <div className="space-y-4">
      {bookings?.map((booking) => (
        <div key={booking.id} className="border p-4 rounded-lg">
          <h3 className="font-medium">{booking.restaurant.name}</h3>
          <p>{format(new Date(booking.date), 'PPP')} at {booking.time}</p>
          <p>{booking.guests} {booking.guests === 1 ? t('booking.guest') : t('booking.guests_plural')}</p>
          <p className="text-gray-500">{booking.status}</p>
        </div>
      ))}
    </div>
  );
}