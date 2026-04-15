'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useAdminUsers, useDeleteUser } from '@/hooks/useAdmin';
import { useIsAdmin } from '@/store/auth.store';
import { Skeleton } from '@/components/ui/Skeleton';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

export default function UsersPage() {
  const router = useRouter();
  const isAdmin = useIsAdmin();
  const { data: users, isLoading } = useAdminUsers();
  const deleteMutation = useDeleteUser();

  useEffect(() => {
    if (isAdmin === false) router.replace('/dashboard');
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Users</h1>
        <p className="text-sm text-gray-500 mt-0.5">Kelola semua pengguna sistem</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16" />)}
        </div>
      ) : users?.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-16 text-center">
          <p className="text-gray-500">Belum ada user terdaftar</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {users?.map((user) => (
            <div key={user.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-sm font-semibold shrink-0">
                  {user.name?.[0]?.toUpperCase() ?? 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <Badge variant={user.role === 'admin' ? 'danger' : 'default'}>
                      {user.role === 'admin'
                        ? <><ShieldCheck className="h-3 w-3 inline mr-0.5" />Admin</>
                        : <><UserIcon className="h-3 w-3 inline mr-0.5" />User</>
                      }
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{user.email} · Bergabung {formatDate(user.created_at ?? '')}</p>
                </div>
              </div>
              {user.role !== 'admin' && (
                <Button variant="danger" size="sm" loading={deleteMutation.isPending}
                  onClick={() => { if (confirm(`Hapus user ${user.name}?`)) deleteMutation.mutate(user.id); }}>
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
