'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useAdminUsers, useDeleteUser } from '@/hooks/useAdmin';
import { useIsAdmin } from '@/store/auth.store';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { formatDate } from '@/lib/utils';
import type { User } from '@/types';

export default function UsersPage() {
  const router = useRouter();
  const isAdmin = useIsAdmin();
  const { data: users, isLoading } = useAdminUsers();
  const deleteMutation = useDeleteUser();
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  useEffect(() => {
    if (isAdmin === false) router.replace('/dashboard');
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus user ini?"
        description={deleteTarget ? `${deleteTarget.name} · ${deleteTarget.email}` : ''}
        loading={deleteMutation.isPending}
        onConfirm={() => {
          if (deleteTarget) deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
        }}
        onCancel={() => setDeleteTarget(null)}
      />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Users</h1>
        <p className="text-sm text-gray-500 mt-0.5">Kelola semua pengguna sistem</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
        </div>
      ) : users?.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-16 text-center">
          <p className="text-gray-500">Belum ada user terdaftar</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {users?.map((user) => (
            <div key={user.id} className="flex items-center justify-between px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {user.name?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <Badge variant={user.role === 'admin' ? 'danger' : 'default'}>
                      {user.role === 'admin'
                        ? <><ShieldCheck className="h-3 w-3 inline mr-0.5" />Admin</>
                        : <><UserIcon className="h-3 w-3 inline mr-0.5" />User</>}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{user.email}{user.created_at ? ` · ${formatDate(user.created_at)}` : ''}</p>
                </div>
              </div>
              {user.role !== 'admin' && (
                <Button variant="danger" size="sm" onClick={() => setDeleteTarget(user)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
