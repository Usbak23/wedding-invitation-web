'use client';
import { use } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useInvitation, useUpdateInvitation, usePublishInvitation } from '@/hooks/useInvitations';
import { useRSVPs } from '@/hooks/useRSVP';
import InvitationForm from '@/components/dashboard/InvitationForm';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { InvitationPayload } from '@/services/invitation.service';

export default function InvitationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: invitation, isLoading } = useInvitation(id);
  const { data: rsvps } = useRSVPs(id);
  const updateMutation = useUpdateInvitation(id);
  const publishMutation = usePublishInvitation();

  if (isLoading) return <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32" />)}</div>;
  if (!invitation) return <p className="text-gray-500">Undangan tidak ditemukan.</p>;

  const attending = rsvps?.filter((r) => r.status === 'hadir').length ?? 0;
  const notAttending = rsvps?.filter((r) => r.status === 'tidak').length ?? 0;
  const maybe = rsvps?.filter((r) => r.status === 'mungkin').length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{invitation.groom_name} & {invitation.bride_name}</h1>
          <Badge variant={invitation.status === 'published' ? 'success' : 'warning'}>
            {invitation.status === 'published' ? 'Dipublikasikan' : 'Draft'}
          </Badge>
        </div>
        <div className="flex gap-2">
          {invitation.status === 'draft' && (
            <Button variant="secondary" loading={publishMutation.isPending} onClick={() => publishMutation.mutate(id)}>
              Publish
            </Button>
          )}
          {invitation.status === 'published' && (
            <Link href={`/${invitation.slug}`} target="_blank">
              <Button variant="secondary"><ExternalLink className="h-4 w-4" />Lihat Undangan</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="text-center py-4">
          <p className="text-2xl font-bold text-green-600">{attending}</p>
          <p className="text-sm text-gray-500">Hadir</p>
        </CardContent></Card>
        <Card><CardContent className="text-center py-4">
          <p className="text-2xl font-bold text-red-500">{notAttending}</p>
          <p className="text-sm text-gray-500">Tidak Hadir</p>
        </CardContent></Card>
        <Card><CardContent className="text-center py-4">
          <p className="text-2xl font-bold text-yellow-500">{maybe}</p>
          <p className="text-sm text-gray-500">Mungkin</p>
        </CardContent></Card>
      </div>

      {rsvps && rsvps.length > 0 && (
        <Card>
          <CardHeader><p className="font-semibold text-gray-900">Daftar RSVP</p></CardHeader>
          <div className="divide-y divide-gray-100">
            {rsvps.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-6 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{r.guest_name}</p>
                  {r.message && <p className="text-xs text-gray-500 mt-0.5">{r.message}</p>}
                </div>
                <Badge variant={r.status === 'hadir' ? 'success' : r.status === 'tidak' ? 'danger' : 'warning'}>
                  {r.status === 'hadir' ? 'Hadir' : r.status === 'tidak' ? 'Tidak Hadir' : 'Mungkin'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

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
