import { Disc3, Music, Pause } from 'lucide-react';
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
        className="fixed right-20 top-3 z-[60] flex min-h-11 min-w-11 items-center justify-center rounded-md border border-church-border bg-church-bg-secondary/95 p-2 text-church-text-muted shadow-lg backdrop-blur transition-colors hover:border-church-border-hover hover:text-church-accent md:right-20"
        aria-pressed={isPlaying}
        title="Som ambiente"
        aria-label={isPlaying ? 'Pausar musica contemplativa' : 'Tocar musica contemplativa'}
      >
        {isPlaying ? (
          <>
            <Disc3
              className="absolute h-6 w-6 animate-spin text-church-accent/35"
              aria-hidden="true"
            />
            <Pause className="relative h-4 w-4 text-church-accent" aria-hidden="true" />
          </>
        ) : (
          <Music className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
