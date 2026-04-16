'use client';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useUIStore } from '@/store/ui.store';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/invitations': 'Undangan',
  '/dashboard/invitations/create': 'Buat Undangan',
  '/dashboard/guests': 'Manajemen Tamu',
  '/dashboard/analytics': 'Analitik',
  '/dashboard/users': 'Manajemen Users',
};

export default function Topbar() {
  const { toggleSidebar } = useUIStore();
  const pathname = usePathname();

  const title = pageTitles[pathname] ?? (pathname.includes('/invitations/') ? 'Detail Undangan' : 'Dashboard');

  return (
    <header className="flex h-16 items-center gap-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm px-6 sticky top-0 z-10">
      <button onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex items-center gap-2">
        <h1 className="text-base font-semibold text-gray-900">{title}</h1>
      </div>
    </header>
  );
}
