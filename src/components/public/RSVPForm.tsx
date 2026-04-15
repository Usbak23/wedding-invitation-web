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

const statusLabel: Record<RSVPStatus, string> = {
  hadir: 'Hadir',
  tidak: 'Tidak Hadir',
  mungkin: 'Mungkin Hadir',
};

const statusColor: Record<RSVPStatus, string> = {
  hadir: 'text-green-600 bg-green-50 border-green-200',
  tidak: 'text-red-500 bg-red-50 border-red-200',
  mungkin: 'text-yellow-600 bg-yellow-50 border-yellow-200',
};

interface ExistingRSVP {
  id: string;
  status: string;
  total_persons: number;
  message: string | null;
}

interface RSVPFormProps {
  guestId: string;
  invitationId: string;
  guestName: string;
  existingRsvp?: ExistingRSVP | null;
}

export default function RSVPForm({ guestId, invitationId, guestName, existingRsvp }: RSVPFormProps) {
  const { mutateAsync, isPending, isSuccess } = useCreateRSVP();
  const [status, setStatus] = useState<RSVPStatus | ''>('');
  const [message, setMessage] = useState('');
  const [totalPersons, setTotalPersons] = useState(1);
  const [error, setError] = useState('');

  // Already submitted (from backend)
  if (existingRsvp && !isSuccess) {
    const s = existingRsvp.status as RSVPStatus;
    return (
      <div className="text-center py-6 space-y-3">
        <p className="text-4xl">✅</p>
        <p className="text-lg font-semibold text-gray-900">Kamu sudah mengisi RSVP, {guestName}!</p>
        <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium', statusColor[s])}>
          {options.find((o) => o.value === s)?.emoji} {statusLabel[s]}
          {s === 'hadir' && ` · ${existingRsvp.total_persons} orang`}
        </div>
        {existingRsvp.message && (
          <p className="text-gray-500 text-sm italic">"{existingRsvp.message}"</p>
        )}
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <p className="text-4xl mb-3">💌</p>
        <p className="text-xl font-semibold text-gray-900">Terima kasih, {guestName}!</p>
        <p className="text-gray-500 mt-1">RSVP Anda telah kami terima.</p>
      </div>
    );
  }

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
