import React from 'react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface BookingFormProps {
  restaurantId: string;
}

export function BookingForm({ restaurantId }: BookingFormProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);

  const { mutate, isLoading } = useMutation({
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
      date,
      time,
      guests,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(date) => date < new Date()}
      />

      <Select
        value={time}
        onValueChange={setTime}
        placeholder="Select time"
      >
        {[
          '12:00', '12:30', '13:00', '13:30', '14:00',
          '18:00', '18:30', '19:00', '19:30', '20:00'
        ].map(time => (
          <option key={time} value={time}>{time}</option>
        ))}
      </Select>

      <Select
        value={guests.toString()}
        onValueChange={(value) => setGuests(Number(value))}
        placeholder="Number of guests"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
          <option key={num} value={num.toString()}>
            {num} {num === 1 ? 'guest' : 'guests'}
          </option>
        ))}
      </Select>

      <Button
        type="submit"
        disabled={isLoading || !date || !time}
        className="w-full"
      >
        {isLoading ? 'Booking...' : 'Book Table'}
      </Button>
    </form>
  );
}