'use client';
import { useEffect, useState } from 'react';
import { getCountdown } from '@/lib/utils';

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState(getCountdown(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'Hari', value: time.days },
    { label: 'Jam', value: time.hours },
    { label: 'Menit', value: time.minutes },
    { label: 'Detik', value: time.seconds },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold text-white">
            {String(value).padStart(2, '0')}
          </div>
          <span className="text-xs text-white/80 mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}
