'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, ExternalLink, Globe } from 'lucide-react';
import { useInvitations, useDeleteInvitation, usePublishInvitation } from '@/hooks/useInvitations';
import { useAdminInvitations } from '@/hooks/useAdmin';
import { useIsAdmin } from '@/store/auth.store';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { formatDate } from '@/lib/utils';
import type { Invitation } from '@/types';

function InvitationTable({ invitations, showDelete = true }: { invitations: Invitation[]; showDelete?: boolean }) {
  const deleteMutation = useDeleteInvitation();
  const publishMutation = usePublishInvitation();
  const [deleteTarget, setDeleteTarget] = useState<Invitation | null>(null);

  if (invitations.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center">
        <p className="text-gray-500 font-medium">Belum ada undangan</p>
        <Link href="/dashboard/invitations/create" className="mt-4 inline-block">
          <Button size="sm"><Plus className="h-4 w-4" />Buat Undangan</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus undangan ini?"
        description={deleteTarget ? `${deleteTarget.groom_name} & ${deleteTarget.bride_name}` : ''}
        loading={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
        }}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {invitations.map((inv) => (
          <div key={inv.id} className="flex items-center justify-between px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {inv.groom_name[0]}{inv.bride_name[0]}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 text-sm truncate">{inv.groom_name} & {inv.bride_name}</p>
                  <Badge variant={inv.status === 'published' ? 'success' : 'warning'}>
                    {inv.status === 'published' ? 'Publik' : 'Draft'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(inv.resepsi_date)} · /{inv.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              {inv.status === 'draft' && showDelete && (
                <Button variant="secondary" size="sm" loading={publishMutation.isPending}
                  onClick={() => publishMutation.mutate(inv.id)}>
                  <Globe className="h-3.5 w-3.5" />Publish
                </Button>
              )}
              {inv.status === 'published' && (
                <Link href={`/${inv.slug}`} target="_blank">
                  <Button variant="ghost" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
                </Link>
              )}
              <Link href={`/dashboard/invitations/${inv.id}`}>
                <Button variant="secondary" size="sm">Detail</Button>
              </Link>
              {showDelete && (
                <Button variant="danger" size="sm" onClick={() => setDeleteTarget(inv)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function InvitationsPage() {
  const isAdmin = useIsAdmin();
  const { data: userInvitations, isLoading: userLoading } = useInvitations();
  const { data: adminInvitations, isLoading: adminLoading } = useAdminInvitations();

  const invitations = isAdmin ? (adminInvitations ?? []) : (userInvitations ?? []);
  const isLoading = isAdmin ? adminLoading : userLoading;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Undangan</h1>
          {isAdmin && <p className="text-sm text-gray-500 mt-0.5">Semua undangan dari seluruh user</p>}
        </div>
        {!isAdmin && (
          <Link href="/dashboard/invitations/create">
            <Button><Plus className="h-4 w-4" />Buat Undangan</Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
        </div>
      ) : (
        <InvitationTable invitations={invitations} showDelete={!isAdmin} />
      )}
    </div>
  );
}
