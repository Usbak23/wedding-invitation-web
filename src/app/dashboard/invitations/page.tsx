'use client';
import Link from 'next/link';
import { Plus, Trash2, ExternalLink, Globe } from 'lucide-react';
import { useInvitations, useDeleteInvitation, usePublishInvitation } from '@/hooks/useInvitations';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

export default function InvitationsPage() {
  const { data: invitations, isLoading } = useInvitations();
  const deleteMutation = useDeleteInvitation();
  const publishMutation = usePublishInvitation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Undangan</h1>
        <Link href="/dashboard/invitations/create">
          <Button><Plus className="h-4 w-4" />Buat Undangan</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
        </div>
      ) : invitations?.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-16 text-center">
          <p className="text-gray-500 font-medium">Belum ada undangan</p>
          <Link href="/dashboard/invitations/create" className="mt-4 inline-block">
            <Button size="sm"><Plus className="h-4 w-4" />Buat Undangan</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {invitations?.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-gray-900">{inv.groom_name} & {inv.bride_name}</p>
                  <Badge variant={inv.status === 'published' ? 'success' : 'warning'}>
                    {inv.status === 'published' ? 'Dipublikasikan' : 'Draft'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{formatDate(inv.resepsi_date)} · /{inv.slug}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {inv.status === 'draft' && (
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
                  <Button variant="secondary" size="sm">Edit</Button>
                </Link>
                <Button variant="danger" size="sm" loading={deleteMutation.isPending}
                  onClick={() => { if (confirm('Hapus undangan ini?')) deleteMutation.mutate(inv.id); }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
