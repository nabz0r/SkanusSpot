import React from 'react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface BookingFormProps {
  restaurantId: string;
}

export function BookingForm({ restaurantId }: BookingFormProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [specialRequests, setSpecialRequests] = useState('');

  const { mutate, isLoading, error, isSuccess } = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Booking failed');
      return response.json();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    mutate({
      restaurantId,
      date: format(date, 'yyyy-MM-dd'),
      time,
      guests: parseInt(guests),
      specialRequests,
    });
  };

  if (isSuccess) {
    return (
      <Alert className="bg-green-50">
        <AlertTitle>Booking Confirmed!</AlertTitle>
        <p>Your reservation has been successfully made.</p>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={(date) => date < new Date()}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Time</label>
        <Select
          value={time}
          onValueChange={setTime}
          required
          className="w-full"
        >
          <option value="">Select time</option>
          <option value="12:00">12:00 PM</option>
          <option value="13:00">1:00 PM</option>
          <option value="14:00">2:00 PM</option>
          <option value="18:00">6:00 PM</option>
          <option value="19:00">7:00 PM</option>
          <option value="20:00">8:00 PM</option>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Number of Guests</label>
        <Select
          value={guests}
          onValueChange={setGuests}
          required
          className="w-full"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <option key={num} value={num.toString()}>
              {num} {num === 1 ? 'Guest' : 'Guests'}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Special Requests</label>
        <Input
          as="textarea"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          className="h-24"
          placeholder="Any dietary requirements or special requests..."
        />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Booking Failed</AlertTitle>
          <p>Please try again later.</p>
        </Alert>
      )}

      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading || !date || !time}
      >
        {isLoading ? 'Confirming...' : 'Confirm Booking'}
      </Button>
    </form>
  );
}