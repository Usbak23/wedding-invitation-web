'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Copy, Globe, Check, Trash2, Plus } from 'lucide-react';
import { useInvitation, useUpdateInvitation, usePublishInvitation } from '@/hooks/useInvitations';
import { useRSVPs } from '@/hooks/useRSVP';
import { useBankAccounts, useCreateBankAccount, useDeleteBankAccount } from '@/hooks/useBankAccounts';
import InvitationForm from '@/components/dashboard/InvitationForm';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { InvitationPayload } from '@/services/invitation.service';
import toast from 'react-hot-toast';

export default function InvitationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: invitation, isLoading } = useInvitation(id);
  const { data: rsvps } = useRSVPs(id);
  const updateMutation = useUpdateInvitation(id);
  const publishMutation = usePublishInvitation();
  const [copied, setCopied] = useState(false);

  const { data: bankAccounts } = useBankAccounts(id);
  const createBankAccount = useCreateBankAccount(id);
  const deleteBankAccount = useDeleteBankAccount(id);
  const [baForm, setBaForm] = useState({ bank_name: '', account_name: '', account_number: '' });
  const [showBaForm, setShowBaForm] = useState(false);

  if (isLoading) return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
    </div>
  );
  if (!invitation) return <p className="text-gray-500">Undangan tidak ditemukan.</p>;

  const publicUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${invitation.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    toast.success('Link berhasil disalin!');
    setTimeout(() => setCopied(false), 2000);
  };

  const attending = rsvps?.filter((r) => r.status === 'hadir').length ?? 0;
  const notAttending = rsvps?.filter((r) => r.status === 'tidak').length ?? 0;
  const maybe = rsvps?.filter((r) => r.status === 'mungkin').length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{invitation.bride_name} & {invitation.groom_name}</h1>
            <Badge variant={invitation.status === 'published' ? 'success' : 'warning'}>
              {invitation.status === 'published' ? 'Dipublikasikan' : 'Draft'}
            </Badge>
          </div>
          {invitation.status === 'published' && (
            <div className="flex items-center gap-2 mt-2">
              <code className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-mono truncate max-w-xs">
                {publicUrl}
              </code>
              <button onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          {invitation.status === 'draft' && (
            <Button loading={publishMutation.isPending} onClick={() => publishMutation.mutate(id)}>
              <Globe className="h-4 w-4" />Publish
            </Button>
          )}
          {invitation.status === 'published' && (
            <Link href={`/${invitation.slug}`} target="_blank">
              <Button variant="secondary"><ExternalLink className="h-4 w-4" />Preview</Button>
            </Link>
          )}
        </div>
      </div>

      {/* RSVP Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-green-500">{attending}</p>
          <p className="text-sm text-gray-500 mt-1">Hadir</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-red-400">{notAttending}</p>
          <p className="text-sm text-gray-500 mt-1">Tidak Hadir</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-yellow-400">{maybe}</p>
          <p className="text-sm text-gray-500 mt-1">Mungkin</p>
        </div>
      </div>

      {/* RSVP List */}
      {rsvps && rsvps.length > 0 && (
        <Card>
          <CardHeader><p className="font-semibold text-gray-900">Daftar RSVP ({rsvps.length})</p></CardHeader>
          <div className="divide-y divide-gray-50">
            {rsvps.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {r.guest_name?.[0]?.toUpperCase() ?? '?'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{r.guest_name}</p>
                    {r.message && <p className="text-xs text-gray-400 mt-0.5 italic">"{r.message}"</p>}
                  </div>
                </div>
                <Badge variant={r.status === 'hadir' ? 'success' : r.status === 'tidak' ? 'danger' : 'warning'}>
                  {r.status === 'hadir' ? 'Hadir' : r.status === 'tidak' ? 'Tidak Hadir' : 'Mungkin'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Bank Accounts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Rekening / E-Wallet</h2>
          <button
            onClick={() => setShowBaForm((v) => !v)}
            className="flex items-center gap-1.5 text-sm text-rose-500 hover:text-rose-600 font-medium"
          >
            <Plus className="h-4 w-4" />Tambah
          </button>
        </div>

        {showBaForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4 space-y-3">
            <input
              placeholder="Nama Bank / E-Wallet (contoh: BCA, GoPay)"
              value={baForm.bank_name}
              onChange={(e) => setBaForm((f) => ({ ...f, bank_name: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <input
              placeholder="Nama Pemilik Rekening"
              value={baForm.account_name}
              onChange={(e) => setBaForm((f) => ({ ...f, account_name: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <input
              placeholder="Nomor Rekening / No. HP"
              value={baForm.account_number}
              onChange={(e) => setBaForm((f) => ({ ...f, account_number: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowBaForm(false)} className="text-sm text-gray-400 px-4 py-2">Batal</button>
              <Button
                loading={createBankAccount.isPending}
                disabled={!baForm.bank_name || !baForm.account_name || !baForm.account_number}
                onClick={() => {
                  createBankAccount.mutate(baForm, {
                    onSuccess: () => {
                      setBaForm({ bank_name: '', account_name: '', account_number: '' });
                      setShowBaForm(false);
                    },
                  });
                }}
              >
                Simpan
              </Button>
            </div>
          </div>
        )}

        {bankAccounts && bankAccounts.length > 0 ? (
          <div className="space-y-2">
            {bankAccounts.map((ba) => (
              <div key={ba.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{ba.bank_name}</p>
                  <p className="text-xs text-gray-400">{ba.account_name} · {ba.account_number}</p>
                </div>
                <button
                  onClick={() => deleteBankAccount.mutate(ba.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          !showBaForm && <p className="text-sm text-gray-400">Belum ada rekening. Klik Tambah untuk menambahkan.</p>
        )}
      </div>

      {/* Edit Form */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Undangan</h2>
        <InvitationForm
          defaultValues={invitation}
          onSubmit={(payload: InvitationPayload) => updateMutation.mutateAsync(payload)}
          loading={updateMutation.isPending}
        />
      </div>
    </div>
  );
}
