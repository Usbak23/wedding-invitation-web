'use client';
import { useState } from 'react';
import { useCreateRSVP } from '@/hooks/useRSVP';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { RSVPStatus } from '@/types';

const options: { value: RSVPStatus; label: string; emoji: string }[] = [
  { value: 'hadir', label: 'Hadir', emoji: '🎉' },
  { value: 'tidak', label: 'Tidak Hadir', emoji: '😢' },
  { value: 'mungkin', label: 'Mungkin', emoji: '🤔' },
];

interface RSVPFormProps {
  guestId: string;
  invitationId: string;
  guestName: string;
}

export default function RSVPForm({ guestId, invitationId, guestName }: RSVPFormProps) {
  const { mutateAsync, isPending, isSuccess } = useCreateRSVP();
  const [status, setStatus] = useState<RSVPStatus | ''>('');
  const [message, setMessage] = useState('');
  const [totalPersons, setTotalPersons] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!status) { setError('Pilih kehadiran Anda.'); return; }
    setError('');
    try {
      await mutateAsync({
        guest_id: guestId,
        invitation_id: invitationId,
        status,
        message: message || undefined,
        total_persons: totalPersons,
      });
    } catch {
      setError('Gagal mengirim RSVP. Coba lagi.');
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <p className="text-4xl mb-3">💌</p>
        <p className="text-xl font-semibold text-gray-900">Terima kasih, {guestName}!</p>
        <p className="text-gray-500 mt-1">RSVP Anda telah kami terima.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-600">Halo, <span className="font-semibold">{guestName}</span>! Konfirmasi kehadiran Anda:</p>

      <div className="grid grid-cols-3 gap-2">
        {options.map(({ value, label, emoji }) => (
          <button key={value} type="button" onClick={() => setStatus(value)}
            className={cn(
              'flex flex-col items-center gap-1 rounded-lg border-2 py-3 text-sm font-medium transition-colors',
              status === value ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-200 hover:border-gray-300 text-gray-600'
            )}>
            <span className="text-xl">{emoji}</span>
            {label}
          </button>
        ))}
      </div>

      {status === 'hadir' && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Jumlah Orang</label>
          <input type="number" min={1} max={10} value={totalPersons}
            onChange={(e) => setTotalPersons(Number(e.target.value))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 w-24"
          />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Ucapan (opsional)</label>
        <textarea
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 resize-none"
          rows={3}
          placeholder="Tulis ucapan untuk pengantin..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" loading={isPending} className="w-full" size="lg">Kirim RSVP</Button>
    </form>
  );
}
