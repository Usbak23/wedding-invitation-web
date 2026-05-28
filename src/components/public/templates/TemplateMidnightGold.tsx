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

function MandalaOrnament({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`w-16 h-16 ${className}`} fill="none">
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
      <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => (
        <line key={i}
          x1="50" y1="5"
          x2="50" y2="95"
          stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="5" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

export default function TemplateMidnightGold({ invitation, guestData, guestLoading, guestError, rsvps, slug, code }: TemplateProps) {
  const wishes = rsvps?.filter((r) => r.message) ?? [];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Georgia', serif", background: '#0a0a14' }}>

      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
        style={{
          background: invitation.cover_photo
            ? `linear-gradient(rgba(10,10,30,0.85), rgba(10,10,30,0.78)), url(${invitation.cover_photo}) center/cover fixed`
            : 'linear-gradient(160deg, #0a0a1e 0%, #0f0f2e 50%, #1a1040 100%)',
        }}
      >
        {/* Gold particle dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 rounded-full bg-yellow-400/20"
              style={{ left: `${(i * 37 + 10) % 100}%`, top: `${(i * 53 + 5) % 100}%` }} />
          ))}
        </div>

        {/* Mandala corners */}
        <div className="absolute top-4 left-4 text-yellow-400/20"><MandalaOrnament /></div>
        <div className="absolute top-4 right-4 text-yellow-400/20"><MandalaOrnament /></div>

        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-yellow-300/70 text-base tracking-[0.5em] mb-2">بِسْمِ اللَّهِ</p>
          <p className="text-slate-300/60 text-sm italic mb-2">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-yellow-400/40" />
            <span className="text-yellow-400/60 text-xs">✦</span>
            <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-yellow-400/40" />
          </div>

          {guestData && (
            <p className="text-slate-300/70 text-sm mb-4">
              Kepada Yth. <span className="text-yellow-300 font-semibold">{guestData.guest.name}</span>
            </p>
          )}

          <p className="text-yellow-400/50 text-xs tracking-[0.4em] uppercase mb-6">Undangan Pernikahan</p>

          <h1>
            <span className="block text-5xl md:text-6xl font-bold text-white leading-tight">{invitation.bride_nickname || invitation.bride_name}</span>
            {/* {invitation.bride_nickname && <span className="block text-slate-400/50 text-sm mt-1">{invitation.bride_name}</span>} */}
            <span className="block text-yellow-400 text-3xl my-3">✦</span>
            <span className="block text-5xl md:text-6xl font-bold text-white leading-tight">{invitation.groom_nickname || invitation.groom_name}</span>
            {/* {invitation.groom_nickname && <span className="block text-slate-400/50 text-sm mt-1">{invitation.groom_name}</span>} */}
          </h1>

          {invitation.custom_message && (
            <p className="text-slate-300/50 mt-6 text-sm max-w-sm mx-auto leading-relaxed italic">"{invitation.custom_message}"</p>
          )}

          <p className="text-yellow-300/60 text-sm mt-4">{formatDate(invitation.resepsi_date)}</p>

          <div className="mt-6">
            <SaveTheDate
              groomName={invitation.groom_name}
              brideName={invitation.bride_name}
              resepsiDate={invitation.resepsi_date}
              resepsiLocation={invitation.resepsi_location}
              className="border-yellow-400/40 text-yellow-300/80 hover:border-yellow-400 hover:text-yellow-300"
            />
          </div>

          <div className="mt-10">
            <Countdown targetDate={invitation.resepsi_date} />
          </div>

          {/* Ayat */}
          <div className="mt-8 max-w-sm mx-auto">
            <div className="text-yellow-400/30 mb-3"><MandalaOrnament className="mx-auto w-10 h-10" /></div>
            <p className="text-yellow-300/60 text-xs tracking-widest uppercase mb-2">QS. Ar-Rum: 21</p>
            <p className="text-slate-300/60 text-xs leading-relaxed italic">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
            </p>
          </div>
        </div>
      </section>

      {/* Profil Pengantin */}
      <section className="py-16 px-6" style={{ background: '#0f0f2e' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-yellow-400/50 text-xs tracking-widest uppercase mb-2">Mempelai</p>
            <h2 className="text-3xl font-bold text-white">Yang Berbahagia</h2>
            <div className="flex items-center gap-3 justify-center mt-3">
              <div className="h-px flex-1 max-w-16 bg-yellow-400/30" />
              <span className="text-yellow-400/50 text-xs">✦</span>
              <div className="h-px flex-1 max-w-16 bg-yellow-400/30" />
            </div>
            <p className="text-slate-300/50 text-sm italic mt-4 max-w-sm mx-auto">
              "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-36 h-36 mx-auto rounded-full border-4 overflow-hidden mb-4 bg-slate-800" style={{ borderColor: 'rgba(212,175,55,0.4)' }}>
                {invitation.bride_photo
                  ? <img src={invitation.bride_photo} alt={invitation.bride_name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-yellow-400/40 text-4xl">✦</div>
                }
              </div>
              <p className="text-white font-bold text-lg">{invitation.bride_name}</p>
              {invitation.bride_bio && <p className="text-slate-400/60 text-xs mt-2 leading-relaxed">{invitation.bride_bio}</p>}
              {invitation.bride_instagram && (
                <a href={`https://instagram.com/${invitation.bride_instagram}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs text-yellow-300/70 hover:text-yellow-300 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  @{invitation.bride_instagram}
                </a>
              )}
            </div>
            <div className="text-center">
              <div className="w-36 h-36 mx-auto rounded-full border-4 overflow-hidden mb-4 bg-slate-800" style={{ borderColor: 'rgba(212,175,55,0.4)' }}>
                {invitation.groom_photo
                  ? <img src={invitation.groom_photo} alt={invitation.groom_name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-yellow-400/40 text-4xl">☽</div>
                }
              </div>
              <p className="text-white font-bold text-lg">{invitation.groom_name}</p>
              {invitation.groom_bio && <p className="text-slate-400/60 text-xs mt-2 leading-relaxed">{invitation.groom_bio}</p>}
              {invitation.groom_instagram && (
                <a href={`https://instagram.com/${invitation.groom_instagram}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs text-yellow-300/70 hover:text-yellow-300 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  @{invitation.groom_instagram}
                </a>
              )}
            </div>
          </div>
          <div className="text-center mt-8">
            <span className="text-yellow-400/50 text-2xl">✦</span>
          </div>
        </div>
      </section>

      {/* Detail Acara */}
      <section className="py-16 px-6" style={{ background: '#0a0a14' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-yellow-400/50 text-xs tracking-widest uppercase mb-2">Acara</p>
            <h2 className="text-3xl font-bold text-white">Detail Acara</h2>
            <div className="flex items-center gap-3 justify-center mt-3">
              <div className="h-px flex-1 max-w-16 bg-yellow-400/30" />
              <span className="text-yellow-400/50 text-xs">✦</span>
              <div className="h-px flex-1 max-w-16 bg-yellow-400/30" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {invitation.akad_date && (
              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #1a1040 0%, #0f0f2e 100%)', border: '1px solid rgba(212,175,55,0.2)' }}>
                <p className="text-yellow-400 text-2xl mb-3">☽</p>
                <h3 className="font-bold text-yellow-300 text-lg mb-3">Akad Nikah</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-slate-300/70 text-sm">
                    <Calendar className="h-4 w-4 mt-0.5 shrink-0 text-yellow-400/50" />
                    <p>{formatDate(invitation.akad_date)}</p>
                  </div>
                  {invitation.akad_location && (
                    <div className="flex items-start gap-2 text-slate-300/70 text-sm">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-yellow-400/50" />
                      <p>{invitation.akad_location}</p>
                    </div>
                  )}
                </div>
                {invitation.akad_maps_url && (
                  <a href={invitation.akad_maps_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs text-yellow-400 hover:underline">
                    <MapPin className="h-3 w-3" />Buka Maps
                  </a>
                )}
              </div>
            )}

            {invitation.resepsi_date && (
              <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #1a1040 0%, #0f0f2e 100%)', border: '1px solid rgba(212,175,55,0.2)' }}>
                <p className="text-yellow-400 text-2xl mb-3">✦</p>
                <h3 className="font-bold text-yellow-300 text-lg mb-3">Resepsi</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-slate-300/70 text-sm">
                    <Calendar className="h-4 w-4 mt-0.5 shrink-0 text-yellow-400/50" />
                    <p>{formatDate(invitation.resepsi_date)}</p>
                  </div>
                  {invitation.resepsi_location && (
                    <div className="flex items-start gap-2 text-slate-300/70 text-sm">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-yellow-400/50" />
                      <p>{invitation.resepsi_location}</p>
                    </div>
                  )}
                </div>
                {invitation.resepsi_maps_url && (
                  <a href={invitation.resepsi_maps_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs text-yellow-400 hover:underline">
                    <MapPin className="h-3 w-3" />Buka Maps
                  </a>
                )}
              </div>
            )}
          </div>

          {invitation.resepsi_location && (
            <div className="mt-6 rounded-2xl overflow-hidden h-56" style={{ border: '1px solid rgba(212,175,55,0.2)' }}>
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(invitation.resepsi_location)}&output=embed`}
                className="w-full h-full border-0" loading="lazy"
              />
            </div>
          )}
        </div>
      </section>

      <AdabWalimah theme="dark" accentColor="#fbbf24" />
      <GiftSection bankAccounts={invitation.bankAccounts ?? []} theme="dark" accentColor="#fbbf24" />

      {/* RSVP */}
      <section className="py-16 px-6" style={{ background: '#0f0f2e' }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-yellow-400/50 text-xs tracking-widest uppercase mb-2">Konfirmasi</p>
            <h2 className="text-3xl font-bold text-white">Kehadiran Anda</h2>
          </div>
          <div className="rounded-2xl p-6" style={{ background: '#1a1040', border: '1px solid rgba(212,175,55,0.2)' }}>
            {!code ? (
              <p className="text-center text-slate-400/50 text-sm py-6">Buka link undangan dengan kode tamu untuk mengisi RSVP.<br /><span className="text-xs font-mono mt-1 block text-slate-400/30">/{slug}?code=XXXXXXXX</span></p>
            ) : guestLoading ? (
              <Skeleton className="h-32" />
            ) : guestError || !guestData ? (
              <p className="text-center text-sm text-red-400 py-4">Kode tamu tidak valid.</p>
            ) : (
              <RSVPForm guestId={guestData.guest.id} invitationId={invitation.id} guestName={guestData.guest.name} existingRsvp={guestData.guest.rsvp} />
            )}
          </div>
        </div>
      </section>

      {/* Ucapan */}
      {wishes.length > 0 && (
        <section className="py-16 px-6" style={{ background: '#0a0a14' }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-yellow-400/50 text-xs tracking-widest uppercase mb-2">Doa & Harapan</p>
              <h2 className="text-3xl font-bold text-white">Ucapan Tamu</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {wishes.map((r) => (
                <div key={r.id} className="rounded-2xl p-5" style={{ background: '#1a1040', border: '1px solid rgba(212,175,55,0.15)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-yellow-600 flex items-center justify-center text-white text-xs font-bold">
                      {r.guest_name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <p className="font-semibold text-yellow-300 text-sm">{r.guest_name}</p>
                  </div>
                  <p className="text-slate-300/60 text-sm leading-relaxed italic">"{r.message}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-10 px-6 text-center" style={{ background: '#050510' }}>
        <p className="text-yellow-400/50 text-lg mb-1">✦ ☽ ✦</p>
        <p className="text-2xl font-bold text-white">{invitation.bride_nickname || invitation.bride_name} & {invitation.groom_nickname || invitation.groom_name}</p>
        <p className="text-slate-500/40 text-xs">Dibuat dengan ♥ WeddingInvite</p>
      </footer>
    </div>
  );
}
