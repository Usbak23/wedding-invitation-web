'use client';
import Link from 'next/link';
import { Mail, Users, CheckCircle, Eye, Plus, ShieldCheck, TrendingUp } from 'lucide-react';
import { useInvitations } from '@/hooks/useInvitations';
import { useAdminDashboard } from '@/hooks/useAdmin';
import { useAuthStore, useIsAdmin } from '@/store/auth.store';
import { StatCard } from '@/components/dashboard/StatCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

function AdminOverview() {
  const { data: stats, isLoading } = useAdminDashboard();

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total User" value={stats?.totalUsers ?? 0} icon={Users} gradient="from-blue-500 to-indigo-600" />
          <StatCard label="Total Undangan" value={stats?.totalInvitations ?? 0} icon={Mail} gradient="from-rose-500 to-pink-600" />
          <StatCard label="Dipublikasikan" value={stats?.published ?? 0} icon={Eye} gradient="from-emerald-500 to-teal-600" />
          <StatCard label="Draft" value={stats?.draft ?? 0} icon={CheckCircle} gradient="from-amber-500 to-orange-500" />
        </div>
      )}
      <div className="flex gap-3">
        <Link href="/dashboard/invitations">
          <Button variant="secondary" size="sm"><Mail className="h-4 w-4" />Semua Undangan</Button>
        </Link>
        <Link href="/dashboard/users">
          <Button variant="secondary" size="sm"><ShieldCheck className="h-4 w-4" />Kelola Users</Button>
        </Link>
      </div>
    </div>
  );
}

function UserOverview() {
  const { data: invitations, isLoading } = useInvitations();
  const published = invitations?.filter((i) => i.status === 'published').length ?? 0;
  const draft = invitations?.filter((i) => i.status === 'draft').length ?? 0;

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Undangan" value={invitations?.length ?? 0} icon={Mail} gradient="from-rose-500 to-pink-600" />
          <StatCard label="Dipublikasikan" value={published} icon={Eye} gradient="from-emerald-500 to-teal-600" />
          <StatCard label="Draft" value={draft} icon={CheckCircle} gradient="from-amber-500 to-orange-500" />
          <StatCard label="Total Tamu" value="—" icon={Users} gradient="from-blue-500 to-indigo-600" />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <h2 className="text-base font-semibold text-gray-900">Undangan Terbaru</h2>
          </div>
          <Link href="/dashboard/invitations" className="text-sm text-rose-500 font-medium hover:underline">
            Lihat semua →
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
          </div>
        ) : invitations?.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-rose-400" />
            </div>
            <p className="text-gray-700 font-semibold">Belum ada undangan</p>
            <p className="text-gray-400 text-sm mt-1 mb-4">Buat undangan pertama Anda sekarang</p>
            <Link href="/dashboard/invitations/create">
              <Button size="sm"><Plus className="h-4 w-4" />Buat Undangan</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {invitations?.slice(0, 5).map((inv, i) => (
              <Link key={inv.id} href={`/dashboard/invitations/${inv.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {inv.groom_name[0]}{inv.bride_name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{inv.groom_name} & {inv.bride_name}</p>
                    <p className="text-xs text-gray-400">{formatDate(inv.resepsi_date)}</p>
                  </div>
                </div>
                <Badge variant={inv.status === 'published' ? 'success' : 'warning'}>
                  {inv.status === 'published' ? 'Publik' : 'Draft'}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const isAdmin = useIsAdmin();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Halo, {user?.name?.split(' ')[0] ?? 'User'} 👋
            </h1>
            {isAdmin && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-gradient-to-r from-rose-500 to-pink-600 text-white px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="h-3 w-3" />Admin
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm">
            {isAdmin ? 'Kelola seluruh sistem undangan pernikahan' : 'Kelola undangan pernikahan digital Anda'}
          </p>
        </div>
        {!isAdmin && (
          <Link href="/dashboard/invitations/create">
            <Button className="shadow-sm">
              <Plus className="h-4 w-4" />Buat Undangan
            </Button>
          </Link>
        )}
      </div>

      {isAdmin ? <AdminOverview /> : <UserOverview />}
    </div>
  );
}
