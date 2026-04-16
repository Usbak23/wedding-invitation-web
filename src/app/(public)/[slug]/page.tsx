'use client';
import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Calendar, Heart } from 'lucide-react';
import { usePublicInvitation, useGuestByCode } from '@/hooks/usePublicInvitation';
import { useRSVPs } from '@/hooks/useRSVP';
import Countdown from '@/components/public/Countdown';
import RSVPForm from '@/components/public/RSVPForm';
import MusicPlayer from '@/components/public/MusicPlayer';
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
      <div className="min-h-screen bg-stone-50 p-6 space-y-4">
        <Skeleton className="h-screen w-full rounded-none" />
      </div>
    );
  }

  if (isError || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center animate-fade-in-up">
          <p className="text-7xl mb-6">💔</p>
          <h1 className="font-serif text-3xl text-gray-900 mb-2">Undangan tidak ditemukan</h1>
          <p className="text-gray-500">Link undangan mungkin sudah tidak aktif.</p>
        </div>
      </div>
    );
  }

  const wishes = rsvps?.filter((r) => r.message) ?? [];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {invitation.music_url && <MusicPlayer url={invitation.music_url} />}

      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
        style={{
          background: invitation.cover_photo
            ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.4)), url(${invitation.cover_photo}) center/cover fixed`
            : 'linear-gradient(160deg, #4c0519 0%, #881337 40%, #9f1239 70%, #be123c 100%)',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
          <div className="absolute top-20 left-20 w-16 h-16 border border-white/10 rounded-full" />
          <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/10 rounded-full" />
          <div className="absolute bottom-20 right-20 w-20 h-20 border border-white/10 rounded-full" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          {guestData && (
            <p className="text-white/60 text-sm mb-3 animate-fade-in">
              Kepada Yth. <span className="text-white font-medium">{guestData.guest.name}</span>
            </p>
          )}

          <p className="text-white/70 text-xs tracking-[0.3em] uppercase mb-6 animate-fade-in animate-delay-100">
            — Undangan Pernikahan —
          </p>

          <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in animate-delay-200">
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-white/40" />
            <Heart className="h-5 w-5 text-rose-300 fill-rose-300 animate-float" />
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-white/40" />
          </div>

          <h1 className="animate-fade-in-up animate-delay-200" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <span className="block text-5xl md:text-7xl font-semibold text-white leading-tight">
              {invitation.groom_name}
            </span>
            <span className="block text-2xl md:text-3xl text-white/60 font-light italic my-3">
              &amp; 
            </span>
            <span className="block text-5xl md:text-7xl font-semibold text-white leading-tight">
              {invitation.bride_name}
            </span>
          </h1>

          {invitation.custom_message && (
            <p className="text-white/60 mt-6 text-sm max-w-sm mx-auto leading-relaxed italic animate-fade-in animate-delay-300">
              "{invitation.custom_message}"
            </p>
          )}

          <div className="mt-4 animate-fade-in animate-delay-300">
            <p className="text-white/70 text-sm">{formatDate(invitation.resepsi_date)}</p>
          </div>

          <div className="mt-10 animate-fade-in-up animate-delay-400">
            <Countdown targetDate={invitation.resepsi_date} />
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce animate-delay-500">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 bg-white/50 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Bismillah / Opening */}
      <section className="bg-stone-50 py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-gray-400 text-xs tracking-widest uppercase mb-4">Dengan memohon rahmat dan ridho Allah SWT</p>
          <div className="w-16 h-px bg-rose-300 mx-auto mb-4" />
          <p className="text-gray-600 text-sm leading-relaxed">
            Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan putra-putri kami.
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-widest uppercase text-rose-400 mb-2">Acara</p>
            <h2 className="font-serif text-3xl text-gray-900">Detail Acara</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {invitation.akad_date && (
              <div className="relative rounded-2xl border border-rose-100 bg-rose-50/50 p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center mb-4">
                    <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">Akad Nikah</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <Calendar className="h-4 w-4 mt-0.5 shrink-0 text-rose-400" />
                      <p>{formatDate(invitation.akad_date)}</p>
                    </div>
                    {invitation.akad_location && (
                      <div className="flex items-start gap-2 text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-rose-400" />
                        <p>{invitation.akad_location}</p>
                      </div>
                    )}
                  </div>
                  {invitation.akad_maps_url && (
                    <a href={invitation.akad_maps_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-xs text-rose-500 font-medium hover:underline">
                      <MapPin className="h-3 w-3" />Buka Maps
                    </a>
                  )}
                </div>
              </div>
            )}

            {invitation.resepsi_date && (
              <div className="relative rounded-2xl border border-pink-100 bg-pink-50/50 p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                    <Calendar className="h-5 w-5 text-pink-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">Resepsi</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <Calendar className="h-4 w-4 mt-0.5 shrink-0 text-pink-400" />
                      <p>{formatDate(invitation.resepsi_date)}</p>
                    </div>
                    {invitation.resepsi_location && (
                      <div className="flex items-start gap-2 text-gray-600 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-pink-400" />
                        <p>{invitation.resepsi_location}</p>
                      </div>
                    )}
                  </div>
                  {invitation.resepsi_maps_url && (
                    <a href={invitation.resepsi_maps_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-xs text-pink-500 font-medium hover:underline">
                      <MapPin className="h-3 w-3" />Buka Maps
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Maps embed */}
          {invitation.resepsi_location && (
            <div className="mt-6 rounded-2xl overflow-hidden h-56 border border-gray-100 shadow-sm">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(invitation.resepsi_location)}&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </section>

      {/* RSVP */}
      <section className="bg-stone-50 py-16 px-6">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs tracking-widest uppercase text-rose-400 mb-2">Konfirmasi</p>
            <h2 className="font-serif text-3xl text-gray-900">Kehadiran Anda</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {!code ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-7 w-7 text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm">Buka link undangan dengan kode tamu untuk mengisi RSVP.</p>
                <p className="text-gray-400 text-xs mt-1">/{slug}?code=XXXXXXXX</p>
              </div>
            ) : guestLoading ? (
              <Skeleton className="h-32" />
            ) : guestError || !guestData ? (
              <p className="text-center text-sm text-red-500 py-4">Kode tamu tidak valid.</p>
            ) : (
              <RSVPForm
                guestId={guestData.guest.id}
                invitationId={invitation.id}
                guestName={guestData.guest.name}
                existingRsvp={guestData.guest.rsvp}
              />
            )}
          </div>
        </div>
      </section>

      {/* Wishes */}
      {wishes.length > 0 && (
        <section className="bg-white py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs tracking-widest uppercase text-rose-400 mb-2">Doa &amp; Harapan</p>
              <h2 className="font-serif text-3xl text-gray-900">Ucapan Tamu</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {wishes.map((r) => (
                <div key={r.id} className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {r.guest_name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <p className="font-medium text-gray-900 text-sm">{r.guest_name}</p>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic">"{r.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-center py-10 px-6">
        <Heart className="h-5 w-5 text-rose-400 fill-rose-400 mx-auto mb-3" />
        <p className="font-serif text-xl text-white mb-1">{invitation.groom_name} & {invitation.bride_name}</p>
        <p className="text-stone-500 text-xs mt-4 flex items-center justify-center gap-1">
          Dibuat dengan <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> WeddingInvite
        </p>
      </footer>
    </div>
  );
}
