'use client';
import { MapPin, Calendar } from 'lucide-react';
import Countdown from '@/components/public/Countdown';
import RSVPForm from '@/components/public/RSVPForm';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate } from '@/lib/utils';
import type { PublicInvitation, RSVP } from '@/types';
import type { Guest } from '@/services/guest.service';

interface TemplateProps {
  invitation: PublicInvitation;
  guestData?: { guest: Guest } | null;
  guestLoading?: boolean;
  guestError?: boolean;
  rsvps?: RSVP[];
  slug: string;
  code: string;
}

function FloralDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 justify-center ${className}`}>
      <div className="h-px flex-1 max-w-16 bg-current opacity-30" />
      <span className="text-current opacity-50 text-sm">❀</span>
      <div className="h-px flex-1 max-w-16 bg-current opacity-30" />
    </div>
  );
}

export default function TemplateSageGarden({ invitation, guestData, guestLoading, guestError, rsvps, slug, code }: TemplateProps) {
  const wishes = rsvps?.filter((r) => r.message) ?? [];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Georgia', serif", background: '#f5f0e8' }}>

      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
        style={{
          background: invitation.cover_photo
            ? `linear-gradient(rgba(74,90,74,0.78), rgba(74,90,74,0.70)), url(${invitation.cover_photo}) center/cover fixed`
            : 'linear-gradient(160deg, #3d5a3e 0%, #4a5a4a 40%, #5a6e5a 70%, #6b7f6b 100%)',
        }}
      >
        {/* Subtle leaf pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 Q55 25 40 40 Q25 25 40 10Z' fill='%23f5f0e8'/%3E%3Cpath d='M40 40 Q55 55 40 70 Q25 55 40 40Z' fill='%23f5f0e8'/%3E%3C/svg%3E")`,
        }} />

        {/* Corner floral */}
        <div className="absolute top-6 left-6 text-white/20 text-4xl">❀</div>
        <div className="absolute top-6 right-6 text-white/20 text-4xl">❀</div>
        <div className="absolute bottom-6 left-6 text-white/20 text-4xl">❀</div>
        <div className="absolute bottom-6 right-6 text-white/20 text-4xl">❀</div>

        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-amber-200/80 text-sm tracking-[0.4em] mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
          <FloralDivider className="text-white mb-6" />

          {guestData && (
            <p className="text-white/70 text-sm mb-4">
              Kepada Yth. <span className="text-amber-200 font-semibold">{guestData.guest.name}</span>
            </p>
          )}

          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-6">— Undangan Pernikahan —</p>

          <h1>
            <span className="block text-5xl md:text-6xl font-bold text-white leading-tight">{invitation.groom_name}</span>
            <span className="block text-amber-200/70 text-2xl my-3 italic font-light">&amp;</span>
            <span className="block text-5xl md:text-6xl font-bold text-white leading-tight">{invitation.bride_name}</span>
          </h1>

          {invitation.custom_message && (
            <p className="text-white/50 mt-6 text-sm max-w-sm mx-auto leading-relaxed italic">"{invitation.custom_message}"</p>
          )}

          <p className="text-white/60 text-sm mt-4">{formatDate(invitation.resepsi_date)}</p>

          <div className="mt-10">
            <Countdown targetDate={invitation.resepsi_date} />
          </div>
        </div>
      </section>

      {/* Ayat */}
      <section className="py-14 px-6 text-center" style={{ background: '#eee8d8' }}>
        <div className="max-w-xl mx-auto">
          <FloralDivider className="text-stone-500 mb-6" />
          <p className="text-stone-400 text-xs tracking-widest uppercase mb-3">QS. Ar-Rum: 21</p>
          <p className="text-stone-600 text-sm leading-relaxed italic">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <FloralDivider className="text-stone-500 mt-6" />
        </div>
      </section>

      {/* Detail Acara */}
      <section className="py-16 px-6" style={{ background: '#f5f0e8' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-stone-400 text-xs tracking-widest uppercase mb-2">Acara</p>
            <h2 className="text-3xl font-bold text-stone-800">Detail Acara</h2>
            <FloralDivider className="text-stone-400 mt-3" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {invitation.akad_date && (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center mb-4">
                  <span className="text-stone-500 text-lg">☽</span>
                </div>
                <h3 className="font-bold text-stone-800 text-lg mb-3">Akad Nikah</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-stone-500 text-sm">
                    <Calendar className="h-4 w-4 mt-0.5 shrink-0 text-stone-400" />
                    <p>{formatDate(invitation.akad_date)}</p>
                  </div>
                  {invitation.akad_location && (
                    <div className="flex items-start gap-2 text-stone-500 text-sm">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-stone-400" />
                      <p>{invitation.akad_location}</p>
                    </div>
                  )}
                </div>
                {invitation.akad_maps_url && (
                  <a href={invitation.akad_maps_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs text-stone-500 hover:text-stone-700 hover:underline">
                    <MapPin className="h-3 w-3" />Buka Maps
                  </a>
                )}
              </div>
            )}

            {invitation.resepsi_date && (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center mb-4">
                  <span className="text-stone-500 text-lg">❀</span>
                </div>
                <h3 className="font-bold text-stone-800 text-lg mb-3">Resepsi</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-stone-500 text-sm">
                    <Calendar className="h-4 w-4 mt-0.5 shrink-0 text-stone-400" />
                    <p>{formatDate(invitation.resepsi_date)}</p>
                  </div>
                  {invitation.resepsi_location && (
                    <div className="flex items-start gap-2 text-stone-500 text-sm">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-stone-400" />
                      <p>{invitation.resepsi_location}</p>
                    </div>
                  )}
                </div>
                {invitation.resepsi_maps_url && (
                  <a href={invitation.resepsi_maps_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs text-stone-500 hover:text-stone-700 hover:underline">
                    <MapPin className="h-3 w-3" />Buka Maps
                  </a>
                )}
              </div>
            )}
          </div>

          {invitation.resepsi_location && (
            <div className="mt-6 rounded-2xl overflow-hidden h-56 border border-stone-200 shadow-sm">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(invitation.resepsi_location)}&output=embed`}
                className="w-full h-full border-0" loading="lazy"
              />
            </div>
          )}
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 px-6" style={{ background: '#eee8d8' }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-stone-400 text-xs tracking-widest uppercase mb-2">Konfirmasi</p>
            <h2 className="text-3xl font-bold text-stone-800">Kehadiran Anda</h2>
            <FloralDivider className="text-stone-400 mt-3" />
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            {!code ? (
              <p className="text-center text-stone-400 text-sm py-6">Buka link undangan dengan kode tamu untuk mengisi RSVP.<br /><span className="text-xs font-mono mt-1 block text-stone-300">/{slug}?code=XXXXXXXX</span></p>
            ) : guestLoading ? (
              <Skeleton className="h-32" />
            ) : guestError || !guestData ? (
              <p className="text-center text-sm text-red-500 py-4">Kode tamu tidak valid.</p>
            ) : (
              <RSVPForm guestId={guestData.guest.id} invitationId={invitation.id} guestName={guestData.guest.name} existingRsvp={guestData.guest.rsvp} />
            )}
          </div>
        </div>
      </section>

      {/* Ucapan */}
      {wishes.length > 0 && (
        <section className="py-16 px-6" style={{ background: '#f5f0e8' }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-stone-400 text-xs tracking-widest uppercase mb-2">Doa & Harapan</p>
              <h2 className="text-3xl font-bold text-stone-800">Ucapan Tamu</h2>
              <FloralDivider className="text-stone-400 mt-3" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {wishes.map((r) => (
                <div key={r.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stone-400 to-stone-600 flex items-center justify-center text-white text-xs font-bold">
                      {r.guest_name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <p className="font-semibold text-stone-700 text-sm">{r.guest_name}</p>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed italic">"{r.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-10 px-6 text-center" style={{ background: '#3d5a3e' }}>
        <p className="text-amber-200/60 text-lg mb-1">❀</p>
        <p className="text-2xl font-bold text-white">{invitation.groom_name} & {invitation.bride_name}</p>
        <FloralDivider className="text-white/30 mt-3 mb-3" />
        <p className="text-white/30 text-xs">Dibuat dengan ♥ WeddingInvite</p>
      </footer>
    </div>
  );
}
