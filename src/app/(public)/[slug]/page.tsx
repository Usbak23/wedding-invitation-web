'use client';
import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Calendar, Heart } from 'lucide-react';
import { usePublicInvitation, useGuestByCode } from '@/hooks/usePublicInvitation';
import { useRSVPs } from '@/hooks/useRSVP';
import Countdown from '@/components/public/Countdown';
import RSVPForm from '@/components/public/RSVPForm';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate } from '@/lib/utils';

export default function PublicInvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const code = searchParams.get('code') ?? '';

  const { data: invitation, isLoading, isError } = usePublicInvitation(slug);
  const { data: guestData, isLoading: guestLoading, isError: guestError } = useGuestByCode(slug, code);
  const { data: rsvps } = useRSVPs(invitation?.id ?? '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 space-y-4">
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-6xl mb-4">💔</p>
          <h1 className="text-2xl font-bold text-gray-900">Undangan tidak ditemukan</h1>
          <p className="text-gray-500 mt-2">Link undangan mungkin sudah tidak aktif.</p>
        </div>
      </div>
    );
  }

  const wishes = rsvps?.filter((r) => r.message) ?? [];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20"
        style={{
          background: invitation.cover_photo
            ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${invitation.cover_photo}) center/cover`
            : 'linear-gradient(135deg, #be123c 0%, #9f1239 50%, #881337 100%)',
        }}
      >
        {guestData && (
          <p className="text-white/70 text-sm mb-2">Kepada Yth. <span className="font-semibold text-white">{guestData.guest.name}</span></p>
        )}
        <p className="text-white/80 text-sm tracking-widest uppercase mb-4">Undangan Pernikahan</p>
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-16 bg-white/40" />
          <Heart className="h-5 w-5 text-white fill-white" />
          <div className="h-px w-16 bg-white/40" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
          {invitation.groom_name}
          <span className="block text-2xl md:text-3xl font-light my-2 text-white/80">&amp;</span>
          {invitation.bride_name}
        </h1>
        {invitation.custom_message && (
          <p className="text-white/70 mt-4 text-sm max-w-md italic">"{invitation.custom_message}"</p>
        )}
        <p className="text-white/80 mt-6 text-lg">{formatDate(invitation.resepsi_date)}</p>
        <div className="mt-10">
          <Countdown targetDate={invitation.resepsi_date} />
        </div>
      </section>

      {/* Event Details */}
      <section className="max-w-2xl mx-auto px-6 py-16 space-y-8">
        <h2 className="text-2xl font-bold text-center text-gray-900">Detail Acara</h2>

        {invitation.akad_date && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
            <h3 className="font-semibold text-rose-600 text-lg">Akad Nikah</h3>
            <div className="flex items-start gap-3 text-gray-600">
              <Calendar className="h-5 w-5 mt-0.5 shrink-0 text-gray-400" />
              <p>{formatDate(invitation.akad_date)}</p>
            </div>
            {invitation.akad_location && (
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-gray-400" />
                <p>{invitation.akad_location}</p>
              </div>
            )}
          </div>
        )}

        {invitation.resepsi_date && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
            <h3 className="font-semibold text-rose-600 text-lg">Resepsi</h3>
            <div className="flex items-start gap-3 text-gray-600">
              <Calendar className="h-5 w-5 mt-0.5 shrink-0 text-gray-400" />
              <p>{formatDate(invitation.resepsi_date)}</p>
            </div>
            {invitation.resepsi_location && (
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-gray-400" />
                <p>{invitation.resepsi_location}</p>
              </div>
            )}
            {invitation.resepsi_location && (
              <div className="mt-3 rounded-xl overflow-hidden h-48">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(invitation.resepsi_location)}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}
      </section>

      {/* RSVP */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Konfirmasi Kehadiran</h2>
          {!code ? (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">Buka link undangan dengan kode tamu untuk mengisi RSVP.</p>
              <p className="text-gray-400 text-xs mt-1">Contoh: /{slug}?code=XXXXXXXX</p>
            </div>
          ) : guestLoading ? (
            <Skeleton className="h-32" />
          ) : guestError || !guestData ? (
            <p className="text-center text-sm text-red-500">Kode tamu tidak valid.</p>
          ) : (
            <RSVPForm
              guestId={guestData.guest.id}
              invitationId={invitation.id}
              guestName={guestData.guest.name}
            />
          )}
        </div>
      </section>

      {/* Wishes */}
      {wishes.length > 0 && (
        <section className="max-w-2xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ucapan &amp; Doa</h2>
          <div className="space-y-4">
            {wishes.map((r) => (
              <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="font-medium text-gray-900 text-sm">{r.guest_name}</p>
                <p className="text-gray-600 text-sm mt-1">{r.message}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="text-center py-8 text-sm text-gray-400 border-t border-gray-200">
        <div className="flex items-center justify-center gap-1">
          <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
          <span>Dibuat dengan WeddingInvite</span>
        </div>
      </footer>
    </div>
  );
}
