'use client';

interface OpeningScreenProps {
  groomName: string;
  brideName: string;
  guestName?: string;
  template?: string | null;
  onOpen: () => void;
  closing?: boolean;
}

const THEME = {
  emerald: {
    bg: 'linear-gradient(160deg, #052e16 0%, #14532d 50%, #166534 100%)',
    accent: '#d4af37',
    accentMuted: 'rgba(212,175,55,0.5)',
    accentFaint: 'rgba(212,175,55,0.15)',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.6)',
    btnBg: 'rgba(212,175,55,0.12)',
    btnBorder: 'rgba(212,175,55,0.4)',
    btnHover: 'rgba(212,175,55,0.25)',
  },
  'midnight-gold': {
    bg: 'linear-gradient(160deg, #0a0a1e 0%, #0f0f2e 50%, #1a1040 100%)',
    accent: '#d4af37',
    accentMuted: 'rgba(212,175,55,0.5)',
    accentFaint: 'rgba(212,175,55,0.12)',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.5)',
    btnBg: 'rgba(212,175,55,0.08)',
    btnBorder: 'rgba(212,175,55,0.35)',
    btnHover: 'rgba(212,175,55,0.2)',
  },
  'sage-garden': {
    bg: 'linear-gradient(160deg, #3d5a3e 0%, #4a5a4a 40%, #5a6e5a 100%)',
    accent: '#f5e6c8',
    accentMuted: 'rgba(245,230,200,0.6)',
    accentFaint: 'rgba(245,230,200,0.1)',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.6)',
    btnBg: 'rgba(245,230,200,0.08)',
    btnBorder: 'rgba(245,230,200,0.35)',
    btnHover: 'rgba(245,230,200,0.18)',
  },
};

// SVG corner frame ornamen islami
function CornerOrnament({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`w-20 h-20 ${className}`} fill="none">
      {/* Outer L-shape */}
      <path d="M4 4 L4 32 M4 4 L32 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Inner L-shape */}
      <path d="M12 12 L12 24 M12 12 L24 12" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      {/* Diamond at corner */}
      <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.3" />
      {/* Small dots */}
      <circle cx="20" cy="8" r="1" fill="currentColor" fillOpacity="0.5" />
      <circle cx="8" cy="20" r="1" fill="currentColor" fillOpacity="0.5" />
      <circle cx="28" cy="8" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="8" cy="28" r="1" fill="currentColor" fillOpacity="0.3" />
      {/* Arabesque curl */}
      <path d="M16 16 Q22 14 24 18 Q26 22 22 24 Q18 26 16 22 Q14 18 16 16Z" stroke="currentColor" strokeWidth="0.6" fillOpacity="0" />
    </svg>
  );
}

// Bulan sabit + bintang SVG
function CrescentStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={`w-16 h-8 ${className}`} fill="currentColor">
      {/* Crescent */}
      <path d="M15 15 A10 10 0 1 1 15 14.9 A6 6 0 1 0 15 15Z" fillOpacity="0.8" />
      {/* Star */}
      <path d="M38 5 L39.5 10 L45 10 L40.5 13 L42 18 L38 15 L34 18 L35.5 13 L31 10 L36.5 10 Z" fillOpacity="0.9" />
    </svg>
  );
}

// Geometric arabesque pattern tile (SVG background)
function getPatternSvg(color: string) {
  const encoded = encodeURIComponent(`
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="${color}" stroke-width="0.5" opacity="0.4">
        <polygon points="30,2 58,16 58,44 30,58 2,44 2,16"/>
        <polygon points="30,10 50,20 50,40 30,50 10,40 10,20"/>
        <line x1="30" y1="2" x2="30" y2="58"/>
        <line x1="2" y1="16" x2="58" y2="44"/>
        <line x1="2" y1="44" x2="58" y2="16"/>
        <circle cx="30" cy="30" r="6" fill="${color}" fill-opacity="0.15"/>
      </g>
    </svg>
  `);
  return `url("data:image/svg+xml,${encoded}")`;
}

export default function OpeningScreen({ groomName, brideName, guestName, template, onOpen, closing }: OpeningScreenProps) {
  const t = THEME[(template as keyof typeof THEME) ?? 'emerald'] ?? THEME.emerald;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{
        background: t.bg,
        fontFamily: "'Georgia', serif",
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        opacity: closing ? 0 : 1,
        transform: closing ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: closing ? 'none' : 'auto',
      }}
    >
      {/* Geometric arabesque background pattern */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: getPatternSvg(t.accent),
        backgroundSize: '60px 60px',
      }} />

      {/* Vignette overlay */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)`,
      }} />

      {/* Corner frame ornaments */}
      <div className="absolute top-3 left-3" style={{ color: t.accentMuted }}>
        <CornerOrnament />
      </div>
      <div className="absolute top-3 right-3 scale-x-[-1]" style={{ color: t.accentMuted }}>
        <CornerOrnament />
      </div>
      <div className="absolute bottom-3 left-3 scale-y-[-1]" style={{ color: t.accentMuted }}>
        <CornerOrnament />
      </div>
      <div className="absolute bottom-3 right-3 scale-x-[-1] scale-y-[-1]" style={{ color: t.accentMuted }}>
        <CornerOrnament />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-sm w-full">

        {/* Crescent + star */}
        <div className="flex justify-center mb-3" style={{ color: t.accent }}>
          <CrescentStar />
        </div>

        {/* Bismillah */}
        <p className="text-base tracking-[0.2em] mb-1" style={{ color: t.accentMuted }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>

        {/* Divider atas */}
        <div className="flex items-center gap-2 justify-center my-4">
          <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(to right, transparent, ${t.accentMuted})` }} />
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: t.accent }}>
            <path d="M12 2L13.5 8.5L20 7L15 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9 12L4 7L10.5 8.5Z" opacity="0.8"/>
          </svg>
          <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(to left, transparent, ${t.accentMuted})` }} />
        </div>

        {/* Walimatul Urs */}
        <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: t.textMuted }}>Walimatul 'Urs</p>

        {/* Names dengan frame */}
        <div className="relative py-5 px-4 my-4" style={{
          border: `1px solid ${t.accentFaint}`,
          borderRadius: '1rem',
          background: t.accentFaint,
        }}>
          {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos) => (
            <div key={pos} className={`absolute ${pos} w-1.5 h-1.5 rounded-full`} style={{ background: t.accentMuted }} />
          ))}
          <p className="text-4xl font-bold leading-tight" style={{ color: t.text }}>{groomName}</p>
          <p className="text-lg my-2 font-light italic" style={{ color: t.accentMuted }}>&amp;</p>
          <p className="text-4xl font-bold leading-tight" style={{ color: t.text }}>{brideName}</p>
        </div>

        {/* Guest greeting */}
        <div className="mb-5">
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: t.textMuted }}>Kepada Yth.</p>
          <p className="text-sm mb-0.5" style={{ color: t.textMuted }}>Bapak/Ibu/Saudara/i</p>
          {guestName && <p className="font-semibold text-lg" style={{ color: t.accent }}>{guestName}</p>}
          <p className="text-xs mt-0.5" style={{ color: t.textMuted }}>Di Tempat</p>
        </div>

        {/* Divider bawah */}
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(to right, transparent, ${t.accentMuted})` }} />
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" style={{ color: t.accent }}>
            <path d="M12 2L13.5 8.5L20 7L15 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9 12L4 7L10.5 8.5Z" opacity="0.8"/>
          </svg>
          <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(to left, transparent, ${t.accentMuted})` }} />
        </div>

        {/* Open button */}
        <button
          onClick={onOpen}
          className="w-full py-3 px-8 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: t.btnBg,
            border: `1px solid ${t.btnBorder}`,
            color: t.accent,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = t.btnHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = t.btnBg)}
        >
          Buka Undangan
        </button>
      </div>
    </div>
  );
}
