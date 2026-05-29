'use client';
import { MapPin, Calendar } from 'lucide-react';
import Countdown from '@/components/public/Countdown';
import RSVPForm from '@/components/public/RSVPForm';
import AdabWalimah from '@/components/public/AdabWalimah';
import GiftSection from '@/components/public/GiftSection';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate } from '@/lib/utils';
import SaveTheDate from '@/components/public/SaveTheDate';
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
          <p className="text-white/60 text-sm italic mb-2">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
          <FloralDivider className="text-white mb-6" />

          {guestData && (
            <p className="text-white/70 text-sm mb-4">
              Kepada Yth. <span className="text-amber-200 font-semibold">{guestData.guest.name}</span>
            </p>
          )}

          <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-6">— Undangan Pernikahan —</p>

          <h1>
            <span className="block text-5xl md:text-6xl font-bold text-white leading-tight">{invitation.bride_nickname || invitation.bride_name}</span>
            {/* {invitation.bride_nickname && <span className="block text-white/40 text-sm mt-1">{invitation.bride_name}</span>} */}
            <span className="block text-amber-200/70 text-2xl my-3 italic font-light">&amp;</span>
            <span className="block text-5xl md:text-6xl font-bold text-white leading-tight">{invitation.groom_nickname || invitation.groom_name}</span>
            {/* {invitation.groom_nickname && <span className="block text-white/40 text-sm mt-1">{invitation.groom_name}</span>} */}
          </h1>

          {invitation.custom_message && (
            <p className="text-white/50 mt-6 text-sm max-w-sm mx-auto leading-relaxed italic">"{invitation.custom_message}"</p>
          )}

          <p className="text-white/60 text-sm mt-4">{formatDate(invitation.resepsi_date)}</p>

          <div className="mt-6">
            <SaveTheDate
              groomName={invitation.groom_name}
              brideName={invitation.bride_name}
              resepsiDate={invitation.resepsi_date}
              resepsiLocation={invitation.resepsi_location}
              className="border-white/30 text-white/70 hover:border-white/60 hover:text-white"
            />
          </div>

          <div className="mt-10">
            <Countdown targetDate={invitation.resepsi_date} />
          </div>

          {/* Ayat */}
          <div className="mt-8 max-w-sm mx-auto">
            <FloralDivider className="text-white/40 mb-3" />
            <p className="text-white/50 text-xs tracking-widest uppercase mb-2">QS. Ar-Rum: 21</p>
            <p className="text-white/60 text-xs leading-relaxed italic">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
            </p>
            <FloralDivider className="text-white/40 mt-3" />
          </div>
        </div>
      </section>

      {/* Profil Pengantin */}
      <section className="py-16 px-6" style={{ background: '#eee8d8' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-stone-400 text-xs tracking-widest uppercase mb-2">Mempelai</p>
            <h2 className="text-3xl font-bold text-stone-800">Yang Berbahagia</h2>
            <FloralDivider className="text-stone-400 mt-3" />
            <p className="text-stone-500 text-sm italic mt-4 max-w-sm mx-auto">
              "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-36 h-36 mx-auto rounded-full border-4 border-stone-300 overflow-hidden mb-4 bg-stone-200">
                {invitation.bride_photo
                  ? <img src={invitation.bride_photo} alt={invitation.bride_name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-stone-400 text-4xl">❀</div>
                }
              </div>
              <p className="text-stone-800 font-bold text-lg">{invitation.bride_name}</p>
              {invitation.bride_bio && <p className="text-stone-500 text-xs mt-2 leading-relaxed">{invitation.bride_bio}</p>}
              {invitation.bride_instagram && (
                <a href={`https://instagram.com/${invitation.bride_instagram}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs text-stone-500 hover:text-stone-800 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  @{invitation.bride_instagram}
                </a>
              )}
            </div>
            <div className="text-center">
              <div className="w-36 h-36 mx-auto rounded-full border-4 border-stone-300 overflow-hidden mb-4 bg-stone-200">
                {invitation.groom_photo
                  ? <img src={invitation.groom_photo} alt={invitation.groom_name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-stone-400 text-4xl">☽</div>
                }
              </div>
              <p className="text-stone-800 font-bold text-lg">{invitation.groom_name}</p>
              {invitation.groom_bio && <p className="text-stone-500 text-xs mt-2 leading-relaxed">{invitation.groom_bio}</p>}
              {invitation.groom_instagram && (
                <a href={`https://instagram.com/${invitation.groom_instagram}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs text-stone-500 hover:text-stone-800 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  @{invitation.groom_instagram}
                </a>
              )}
            </div>
          </div>
          <div className="text-center mt-8">
            <FloralDivider className="text-stone-400" />
          </div>
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

          {invitation.resepsi_maps_url && (
            <div className="mt-6 rounded-2xl overflow-hidden h-56 border border-stone-200 shadow-sm">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(invitation.resepsi_maps_url)}&output=embed`}
                className="w-full h-full border-0" loading="lazy"
              />
            </div>
          )}
        </div>
      </section>

      <AdabWalimah theme="light" accentColor="#65a30d" />
      <GiftSection bankAccounts={invitation.bankAccounts ?? []} theme="light" accentColor="#65a30d" />

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
        <p className="text-2xl font-bold text-white">{invitation.bride_nickname || invitation.bride_name} & {invitation.groom_nickname || invitation.groom_name}</p>
        <FloralDivider className="text-white/30 mt-3 mb-3" />
        <p className="text-white/30 text-xs">©️ 2026 Ahmad Mubarok — Innovative Digital Solutions.</p>
      </footer>
    </div>
  );
}
