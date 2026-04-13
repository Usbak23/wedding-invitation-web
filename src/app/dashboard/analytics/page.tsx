'use client';
import { BarChart2 } from 'lucide-react';
import { useInvitations } from '@/hooks/useInvitations';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/Skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

function InvitationStats({ invitationId }: { invitationId: string }) {
  const { data: stats, isLoading } = useAnalytics(invitationId);

  if (isLoading) return <Skeleton className="h-24" />;
  if (!stats) return null;

  const items = [
    { label: 'Total Tamu', value: stats.total_guests, color: 'text-blue-600' },
    { label: 'Total RSVP', value: stats.total_rsvp, color: 'text-purple-600' },
    { label: 'Hadir', value: stats.hadir, color: 'text-green-600' },
    { label: 'Tidak Hadir', value: stats.tidak, color: 'text-red-500' },
    { label: 'Mungkin', value: stats.mungkin, color: 'text-yellow-500' },
    { label: 'Belum RSVP', value: stats.belum_rsvp, color: 'text-gray-400' },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
      {items.map(({ label, value, color }) => (
        <div key={label} className="text-center">
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const { data: invitations, isLoading } = useInvitations();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analitik</h1>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-40" />)}
        </div>
      ) : invitations?.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-16 text-center">
          <BarChart2 className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Belum ada data</p>
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
                <InvitationStats invitationId={inv.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
