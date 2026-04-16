import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'WeddingInvite - Undangan Pernikahan Digital',
  description: 'Buat undangan pernikahan digital yang indah dan mudah',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { borderRadius: '12px', fontSize: '14px', fontWeight: '500' },
              success: { iconTheme: { primary: '#f43f5e', secondary: '#fff' } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
