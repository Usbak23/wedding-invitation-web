'use client';
import { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { useInvitations } from '@/hooks/useInvitations';
import { useGuests, useCreateGuest } from '@/hooks/useGuests';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

function GuestList({ invitationId }: { invitationId: string }) {
  const { data: guests, isLoading } = useGuests(invitationId);
  const { mutateAsync, isPending } = useCreateGuest(invitationId);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [open, setOpen] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync({ name: form.name, phone: form.phone || undefined });
    setForm({ name: '', phone: '' });
    setOpen(false);
  };

  if (isLoading) return <Skeleton className="h-32" />;

  return (
    <div className="space-y-3">
      {open && (
        <form onSubmit={handleAdd} className="flex gap-2 items-end">
          <Input label="Nama" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          <Input label="No. HP" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
          <Button type="submit" loading={isPending} size="sm">Simpan</Button>
          <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(false)}>Batal</Button>
        </form>
      )}
      {guests?.length === 0 ? (
        <p className="text-sm text-gray-400 py-4 text-center">Belum ada tamu</p>
      ) : (
        <div className="divide-y divide-gray-100">
          {guests?.map((g) => (
            <div key={g.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">{g.name}</p>
                {g.phone && <p className="text-xs text-gray-500">{g.phone}</p>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{g.code}</span>
                {g.rsvp && (
                  <span className="text-xs text-green-600 font-medium">{g.rsvp}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {!open && (
        <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />Tambah Tamu
        </Button>
      )}
    </div>
  );
}

export default function GuestsPage() {
  const { data: invitations, isLoading } = useInvitations();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Tamu</h1>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-40" />)}
        </div>
      ) : invitations?.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-16 text-center">
          <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Belum ada undangan</p>
          <p className="text-gray-400 text-sm mt-1">Buat undangan terlebih dahulu untuk mengelola tamu</p>
        </div>
      ) : (
        <div className="space-y-6">
          {invitations?.map((inv) => (
            <Card key={inv.id}>
              <CardHeader>
                <p className="font-semibold text-gray-900">{inv.groom_name} & {inv.bride_name}</p>
                <p className="text-sm text-gray-500 mt-0.5">/{inv.slug}</p>
              </CardHeader>
              <CardContent>
                <GuestList invitationId={inv.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
