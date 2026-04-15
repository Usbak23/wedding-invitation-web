'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DateTimePicker from '@/components/ui/DateTimePicker';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import type { Invitation } from '@/types';
import type { InvitationPayload } from '@/services/invitation.service';

interface InvitationFormProps {
  defaultValues?: Partial<Invitation>;
  onSubmit: (payload: InvitationPayload) => Promise<unknown>;
  loading?: boolean;
}

const toLocalDatetime = (iso: string | null | undefined) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 16);
};

const toISO = (v: string | null | undefined) => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d.toISOString();
};

export default function InvitationForm({ defaultValues, onSubmit, loading }: InvitationFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    groom_name: defaultValues?.groom_name ?? '',
    bride_name: defaultValues?.bride_name ?? '',
    akad_date: defaultValues?.akad_date ?? '',
    akad_location: defaultValues?.akad_location ?? '',
    resepsi_date: defaultValues?.resepsi_date ?? '',
    resepsi_location: defaultValues?.resepsi_location ?? '',
    custom_message: defaultValues?.custom_message ?? '',
  });
  const [error, setError] = useState('');

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const payload: InvitationPayload = {
        groom_name: form.groom_name,
        bride_name: form.bride_name,
        akad_date: form.akad_date || null,
        akad_location: form.akad_location || null,
        resepsi_date: form.resepsi_date || null,
        resepsi_location: form.resepsi_location || null,
        custom_message: form.custom_message || null,
      };
      await onSubmit(payload);
      router.push('/dashboard/invitations');
    } catch {
      setError('Terjadi kesalahan. Coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader><p className="font-semibold text-gray-900">Data Pengantin</p></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nama Mempelai Pria *" value={form.groom_name} onChange={set('groom_name')} required />
            <Input label="Nama Mempelai Wanita *" value={form.bride_name} onChange={set('bride_name')} required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Pesan Undangan</label>
            <textarea
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 resize-none"
              rows={3}
              value={form.custom_message}
              onChange={set('custom_message')}
              placeholder="Bersama keluarga besar kami mengundang kehadiran Anda..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><p className="font-semibold text-gray-900">Akad Nikah</p></CardHeader>
        <CardContent className="space-y-4">
          <DateTimePicker label="Tanggal & Waktu" value={form.akad_date} onChange={(v) => setForm((f) => ({ ...f, akad_date: v }))} />
          <Input label="Lokasi" value={form.akad_location} onChange={set('akad_location')} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><p className="font-semibold text-gray-900">Resepsi</p></CardHeader>
        <CardContent className="space-y-4">
          <DateTimePicker label="Tanggal & Waktu" value={form.resepsi_date} onChange={(v) => setForm((f) => ({ ...f, resepsi_date: v }))} />
          <Input label="Lokasi" value={form.resepsi_location} onChange={set('resepsi_location')} />
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" loading={loading}>Simpan</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Batal</Button>
      </div>
    </form>
  );
}
