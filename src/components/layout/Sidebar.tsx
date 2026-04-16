'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Mail, Users, BarChart2, LogOut, Heart, X, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useAuthStore, useIsAdmin } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { authService } from '@/services/auth.service';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const isAdmin = useIsAdmin();

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/invitations', label: 'Undangan', icon: Mail },
    { href: '/dashboard/guests', label: 'Tamu', icon: Users },
    { href: '/dashboard/analytics', label: 'Analitik', icon: BarChart2 },
    ...(isAdmin ? [{ href: '/dashboard/users', label: 'Users', icon: ShieldCheck }] : []),
  ];

  const handleLogout = async () => {
    await authService.logout().catch(() => {});
    clearAuth();
    router.push('/login');
  };

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        'fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white border-r border-gray-100 transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:z-auto'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center">
            <Image src="/Brand.png" alt="WeddingInvite" width={160} height={80} className="object-contain" style={{ width: 160, height: 80 }} priority />
          </div>
          <button className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {isAdmin && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Admin</p>
          )}
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group',
                  active
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}>
                <div className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center transition-all',
                  active ? 'bg-rose-100' : 'bg-gray-100 group-hover:bg-gray-200'
                )}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                {label}
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-500" />}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-100 p-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl mb-1">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0">
              {user?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name ?? 'User'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150 group">
            <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-all">
              <LogOut className="h-3.5 w-3.5" />
            </div>
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
