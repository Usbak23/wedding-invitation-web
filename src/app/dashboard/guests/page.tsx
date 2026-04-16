'use client';
import { useState } from 'react';
import { Users, Plus, QrCode } from 'lucide-react';
import { useInvitations } from '@/hooks/useInvitations';
import { useGuests, useCreateGuest } from '@/hooks/useGuests';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Pagination from '@/components/ui/Pagination';
import QRModal from '@/components/ui/QRModal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import type { Guest } from '@/services/guest.service';
import type { Invitation } from '@/types';

interface QRTarget {
  guest: Guest;
  slug: string;
}

function GuestList({ invitation }: { invitation: Invitation }) {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGuests(invitation.id, page);
  const { mutateAsync, isPending } = useCreateGuest(invitation.id);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [open, setOpen] = useState(false);
  const [qrTarget, setQrTarget] = useState<QRTarget | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync({ name: form.name, phone: form.phone || undefined });
    setForm({ name: '', phone: '' });
    setOpen(false);
  };

  if (isLoading) return <Skeleton className="h-32" />;

  const guests = data?.data ?? [];
  const meta = data?.meta;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <>
      {qrTarget && (
        <QRModal
          open={!!qrTarget}
          guestName={qrTarget.guest.name}
          guestPhone={qrTarget.guest.phone}
          invitationUrl={`${baseUrl}/${qrTarget.slug}?code=${qrTarget.guest.code}`}
          onClose={() => setQrTarget(null)}
        />
      )}

      <div className="space-y-3">
        {open && (
          <form onSubmit={handleAdd} className="flex gap-2 items-end p-3 bg-rose-50 rounded-xl border border-rose-100">
            <Input label="Nama" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
            <Input label="No. HP" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            <Button type="submit" loading={isPending} size="sm">Simpan</Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => setOpen(false)}>Batal</Button>
          </form>
        )}

        {guests.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">Belum ada tamu</p>
        ) : (
          <>
            <div className="divide-y divide-gray-50">
              {guests.map((g) => (
                <div key={g.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {g.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{g.name}</p>
                      {g.phone && <p className="text-xs text-gray-400">{g.phone}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{g.code}</span>
                    {g.rsvp && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        g.rsvp.status === 'hadir' ? 'bg-green-100 text-green-700' :
                        g.rsvp.status === 'tidak' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {g.rsvp.status === 'hadir' ? `Hadir (${g.rsvp.total_persons})` :
                         g.rsvp.status === 'tidak' ? 'Tidak Hadir' : 'Mungkin'}
                      </span>
                    )}
                    <button
                      onClick={() => setQrTarget({ guest: g, slug: invitation.slug })}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-colors"
                      title="QR Code & Share"
                    >
                      <QrCode className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {meta && <Pagination page={page} totalPages={meta.totalPages} onChange={setPage} />}
          </>
        )}

        {!open && (
          <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" />Tambah Tamu
          </Button>
        )}
      </div>
    </>
  );
}

export default function GuestsPage() {
  const { data: invitations, isLoading } = useInvitations();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Manajemen Tamu</h1>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-40" />)}
        </div>
      ) : invitations?.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center">
          <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Belum ada undangan</p>
          <p className="text-gray-400 text-sm mt-1">Buat undangan terlebih dahulu untuk mengelola tamu</p>
        </div>
      ) : (
        <div className="space-y-6">
          {invitations?.map((inv) => (
            <Card key={inv.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {inv.groom_name[0]}{inv.bride_name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{inv.groom_name} & {inv.bride_name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">/{inv.slug}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <GuestList invitation={inv} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
