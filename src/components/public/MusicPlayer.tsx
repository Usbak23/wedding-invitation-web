'use client';
import { useState, useRef, useEffect } from 'react';
import { Music } from 'lucide-react';

export default function MusicPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !url) return;
    audio.addEventListener('canplay', () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }, { once: true });
    audio.addEventListener('error', () => setError(true), { once: true });
  }, [url]);

  if (!url || error) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => setError(true)); }
  };

  return (
    <>
      <audio ref={audioRef} src={url} loop preload="auto" />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg border border-gray-200 flex items-center justify-center hover:scale-110 transition-transform"
        title={playing ? 'Pause musik' : 'Play musik'}
      >
        {playing ? (
          <div className="flex items-end gap-0.5 h-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1 bg-rose-500 rounded-full animate-bounce"
                style={{ height: `${[60, 100, 40][i - 1]}%`, animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        ) : (
          <Music className="h-5 w-5 text-rose-500" />
        )}
      </button>
    </>
  );
}
