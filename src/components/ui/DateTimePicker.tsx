'use client';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { id } from 'date-fns/locale';
import { Calendar } from 'lucide-react';

interface DateTimePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function DateTimePicker({ label, value, onChange }: DateTimePickerProps) {
  const selected = value ? new Date(value) : null;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <ReactDatePicker
          selected={selected}
          onChange={(date: Date | null) => onChange(date ? date.toISOString() : '')}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd MMMM yyyy, HH:mm"
          locale={id}
          placeholderText="Pilih tanggal & waktu"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-9 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
          calendarClassName="!font-sans !border-gray-200 !shadow-lg !rounded-xl"
          wrapperClassName="w-full"
          popperClassName="z-50"
        />
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
