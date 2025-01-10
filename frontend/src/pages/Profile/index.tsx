import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserBookings } from './UserBookings';
import { UserPreferences } from './UserPreferences';

export default function ProfilePage() {
  const { t } = useTranslation();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await fetch('/api/user/profile');
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">{t('profile.preferences')}</h2>
          <UserPreferences user={user} />
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">{t('profile.bookings')}</h2>
          <UserBookings />
        </Card>
      </div>
    </div>
  );
}