'use client';
import { CalendarPlus } from 'lucide-react';

interface Props {
  groomName: string;
  brideName: string;
  resepsiDate: string;
  resepsiLocation?: string;
  className?: string;
}

export default function SaveTheDate({ groomName, brideName, resepsiDate, resepsiLocation, className = '' }: Props) {
  const handleSave = () => {
    const start = new Date(resepsiDate);
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // +3 jam

    const pad = (n: number) => String(n).padStart(2, '0');
    const fmt = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:Pernikahan ${brideName} & ${groomName}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `LOCATION:${resepsiLocation ?? ''}`,
      `DESCRIPTION:Resepsi pernikahan ${brideName} & ${groomName}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Besok! Pernikahan ${brideName} & ${groomName}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pernikahan-${brideName.toLowerCase()}-${groomName.toLowerCase()}.ics`.replace(/\s+/g, '-');
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleSave}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium tracking-widest uppercase transition-all hover:scale-105 active:scale-95 ${className}`}
    >
      <CalendarPlus className="h-3.5 w-3.5" />
      Save the Date
    </button>
  );
}
