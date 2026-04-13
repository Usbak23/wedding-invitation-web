'use client';
import { Menu } from 'lucide-react';
import { useUIStore } from '@/store/ui.store';

interface TopbarProps {
  title?: string;
}

export default function Topbar({ title }: TopbarProps) {
  const { toggleSidebar } = useUIStore();
  return (
    <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
      <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700">
        <Menu className="h-5 w-5" />
      </button>
      {title && <h1 className="text-lg font-semibold text-gray-900">{title}</h1>}
    </header>
  );
}
