'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await authService.login(form);
      setUser(user);
      router.push('/dashboard');
    } catch {
      setError('Email atau password salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-rose-900 via-rose-800 to-pink-900 flex-col items-center justify-center p-12 text-white">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 text-center animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Image src="/Brand.png" alt="WeddingInvite" width={220} height={110} className="object-contain brightness-0 invert" style={{ width: 220, height: 110 }} priority />
          </div>
          <h2 className="font-serif text-5xl leading-tight mb-4">
            Undangan Digital<br />
            <span className="italic">yang Berkesan</span>
          </h2>
          <p className="text-white/70 text-lg max-w-sm mx-auto leading-relaxed">
            Buat undangan pernikahan digital yang elegan dan mudah dibagikan kepada semua tamu.
          </p>

          {/* Floating cards */}
          <div className="mt-12 space-y-3 max-w-xs mx-auto">
            {['✨ Desain elegan & modern', '💌 Link undangan personal', '📊 Pantau RSVP real-time'].map((text, i) => (
              <div key={i} className={`bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-sm text-left animate-fade-in-up animate-delay-${(i + 2) * 100}`}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Mobile logo */}
          <div className="flex items-center justify-center mb-8 lg:hidden">
            <Image src="/Brand.png" alt="WeddingInvite" width={140} height={70} className="object-contain" style={{ width: 140, height: 70 }} priority />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Selamat datang</h1>
            <p className="text-gray-500 mt-2">Masuk untuk mengelola undangan Anda</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
              />
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  required
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <span>⚠️</span>{error}
                </div>
              )}
              <Button type="submit" loading={loading} className="w-full" size="lg">
                Masuk
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Belum punya akun?{' '}
            <Link href="/register" className="text-rose-500 font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
