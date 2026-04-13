'use client';
import Link from 'next/link';
import { Mail, Users, CheckCircle, Eye, Plus } from 'lucide-react';
import { useInvitations } from '@/hooks/useInvitations';
import { useAuthStore } from '@/store/auth.store';
import { StatCard } from '@/components/dashboard/StatCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: invitations, isLoading } = useInvitations();

  const published = invitations?.filter((i) => i.status === 'published').length ?? 0;
  const draft = invitations?.filter((i) => i.status === 'draft').length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Selamat datang{user?.name ? `, ${user.name}` : ''} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Kelola undangan pernikahan digital Anda</p>
        </div>
        <Link href="/dashboard/invitations/create">
          <Button><Plus className="h-4 w-4" />Buat Undangan</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Undangan" value={invitations?.length ?? 0} icon={Mail} color="text-rose-500" />
          <StatCard label="Dipublikasikan" value={published} icon={Eye} color="text-green-500" />
          <StatCard label="Draft" value={draft} icon={CheckCircle} color="text-yellow-500" />
          <StatCard label="Total Tamu" value="—" icon={Users} color="text-blue-500" />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Undangan Terbaru</h2>
          <Link href="/dashboard/invitations" className="text-sm text-rose-500 hover:underline">Lihat semua</Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
          </div>
        ) : invitations?.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Mail className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Belum ada undangan</p>
            <Link href="/dashboard/invitations/create" className="mt-4 inline-block">
              <Button size="sm"><Plus className="h-4 w-4" />Buat Undangan</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {invitations?.slice(0, 5).map((inv) => (
              <Link key={inv.id} href={`/dashboard/invitations/${inv.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{inv.groom_name} & {inv.bride_name}</p>
                  <p className="text-sm text-gray-500">{formatDate(inv.resepsi_date)}</p>
                </div>
                <Badge variant={inv.status === 'published' ? 'success' : 'warning'}>
                  {inv.status === 'published' ? 'Dipublikasikan' : 'Draft'}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
