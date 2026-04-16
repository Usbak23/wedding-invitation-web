'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.register(form);
      // After register, login to get token
      const loginData = await authService.login({ email: form.email, password: form.password });
      setAuth(loginData.access_token);
      router.push('/dashboard');
    } catch {
      setError('Pendaftaran gagal. Email mungkin sudah digunakan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mb-4">
            <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Buat akun baru</h1>
          <p className="text-gray-500 mt-1 text-sm">Mulai buat undangan pernikahan digital Anda</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nama Lengkap"
              placeholder="Nama Anda"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
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
                placeholder="Min. 6 karakter"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Daftar
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-rose-500 font-medium hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
