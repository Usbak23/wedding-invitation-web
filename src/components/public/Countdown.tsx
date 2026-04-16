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
    <div className="flex gap-3 justify-center">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
            <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-white/60 text-xs mt-2 tracking-wider uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
}
