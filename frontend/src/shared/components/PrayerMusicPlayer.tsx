import { Music, Pause } from 'lucide-react';
import { useRef, useState } from 'react';

export function PrayerMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.volume = 0.28;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/miracles-of-fatima.mp3" loop preload="metadata" />
      <button
        type="button"
        onClick={toggleMusic}
        className="relative flex min-h-11 min-w-11 items-center justify-center overflow-hidden rounded-full border border-church-border bg-church-bg-secondary/95 p-2 text-church-text-muted shadow-sm backdrop-blur transition-colors hover:border-church-border-hover hover:text-church-accent"
        aria-pressed={isPlaying}
        title="Som ambiente"
        aria-label={isPlaying ? 'Pausar musica contemplativa' : 'Tocar musica contemplativa'}
      >
        {isPlaying ? (
          <>
            <span
              className="absolute h-9 w-9 animate-spin rounded-full border border-church-accent/35 bg-[conic-gradient(from_120deg,var(--church-accent)_0deg,var(--church-accent-hover)_58deg,transparent_60deg,transparent_118deg,var(--church-accent)_120deg,var(--church-accent-hover)_178deg,transparent_180deg,transparent_238deg,var(--church-accent)_240deg,var(--church-accent-hover)_298deg,transparent_300deg)] opacity-80 shadow-inner"
              aria-hidden="true"
            />
            <span
              className="absolute h-5 w-5 rounded-full bg-church-bg-secondary/95 shadow-sm"
              aria-hidden="true"
            />
            <Pause className="relative h-3.5 w-3.5 text-church-accent" aria-hidden="true" />
          </>
        ) : (
          <Music className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
