'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import DateTimePicker from '@/components/ui/DateTimePicker';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import type { Invitation } from '@/types';
import type { InvitationPayload } from '@/services/invitation.service';

const TEMPLATES = [
  { id: 'emerald', label: 'Emerald Islamic', desc: 'Hijau zamrud + emas, klasik islami', color: 'from-emerald-700 to-emerald-900' },
  { id: 'midnight-gold', label: 'Midnight Gold', desc: 'Navy + gold, elegan premium', color: 'from-slate-800 to-yellow-600' },
  { id: 'sage-garden', label: 'Sage Garden', desc: 'Sage green + cream, natural feminin', color: 'from-stone-400 to-green-700' },
];

interface InvitationFormProps {
  defaultValues?: Partial<Invitation>;
  onSubmit: (payload: InvitationPayload) => Promise<unknown>;
  loading?: boolean;
}

export default function InvitationForm({ defaultValues, onSubmit, loading }: InvitationFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    groom_name: defaultValues?.groom_name ?? '',
    bride_name: defaultValues?.bride_name ?? '',
    akad_date: defaultValues?.akad_date ?? '',
    akad_location: defaultValues?.akad_location ?? '',
    akad_maps_url: defaultValues?.akad_maps_url ?? '',
    resepsi_date: defaultValues?.resepsi_date ?? '',
    resepsi_location: defaultValues?.resepsi_location ?? '',
    resepsi_maps_url: defaultValues?.resepsi_maps_url ?? '',
    cover_photo: defaultValues?.cover_photo ?? '',
    music_url: defaultValues?.music_url ?? '',
    custom_message: defaultValues?.custom_message ?? '',
    template: defaultValues?.template ?? 'emerald',
  });
  const [error, setError] = useState('');

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await onSubmit({
        groom_name: form.groom_name,
        bride_name: form.bride_name,
        akad_date: form.akad_date || null,
        akad_location: form.akad_location || null,
        akad_maps_url: form.akad_maps_url || null,
        resepsi_date: form.resepsi_date || null,
        resepsi_location: form.resepsi_location || null,
        resepsi_maps_url: form.resepsi_maps_url || null,
        cover_photo: form.cover_photo || null,
        music_url: form.music_url || null,
        custom_message: form.custom_message || null,
        template: form.template,
      });
      router.push('/dashboard/invitations');
    } catch {
      setError('Terjadi kesalahan. Coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Template Picker */}
      <Card>
        <CardHeader><p className="font-semibold text-gray-900">Pilih Template</p></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, template: t.id }))}
                className={`rounded-xl border-2 p-3 text-left transition-all ${
                  form.template === t.id ? 'border-rose-500 ring-2 ring-rose-200' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`h-12 rounded-lg bg-gradient-to-br ${t.color} mb-2`} />
                <p className="text-xs font-semibold text-gray-900">{t.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><p className="font-semibold text-gray-900">Data Pengantin</p></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nama Mempelai Pria *" value={form.groom_name} onChange={set('groom_name')} required />
            <Input label="Nama Mempelai Wanita *" value={form.bride_name} onChange={set('bride_name')} required />
          </div>
          <Input label="Cover Photo URL" value={form.cover_photo} onChange={set('cover_photo')} placeholder="https://..." />
          <Input label="Music URL" value={form.music_url} onChange={set('music_url')} placeholder="https://..." />
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
          <Input label="Google Maps URL" value={form.akad_maps_url} onChange={set('akad_maps_url')} placeholder="https://maps.google.com/..." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><p className="font-semibold text-gray-900">Resepsi</p></CardHeader>
        <CardContent className="space-y-4">
          <DateTimePicker label="Tanggal & Waktu" value={form.resepsi_date} onChange={(v) => setForm((f) => ({ ...f, resepsi_date: v }))} />
          <Input label="Lokasi" value={form.resepsi_location} onChange={set('resepsi_location')} />
          <Input label="Google Maps URL" value={form.resepsi_maps_url} onChange={set('resepsi_maps_url')} placeholder="https://maps.google.com/..." />
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
