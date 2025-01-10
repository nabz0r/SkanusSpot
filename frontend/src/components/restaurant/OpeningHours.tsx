import React from 'react';

interface OpeningHoursProps {
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export function OpeningHours({ hours }: OpeningHoursProps) {
  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  return (
    <div className="space-y-2">
      {days.map(({ key, label }) => (
        <div key={key} className="flex justify-between">
          <span className="font-medium">{label}</span>
          <span>{hours[key as keyof typeof hours]}</span>
        </div>
      ))}
    </div>
  );
}