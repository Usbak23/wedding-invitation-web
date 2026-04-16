'use client';
import { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play } from 'lucide-react';

export default function MusicPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener('canplay', () => setReady(true));
    // Auto play on load
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  return (
    <>
      <audio ref={audioRef} src={url} loop />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:scale-110 transition-transform"
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
