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
        className="fixed right-4 top-20 z-[60] flex min-h-11 items-center gap-2 rounded-full border border-church-border-hover bg-church-bg-secondary/95 px-3 py-2 text-xs font-medium text-church-accent shadow-lg backdrop-blur transition-colors hover:border-church-accent-hover hover:text-church-accent-hover md:right-6 md:px-4 md:text-sm"
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Pausar musica contemplativa' : 'Tocar musica contemplativa'}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Music className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="hidden sm:inline">{isPlaying ? 'Pausar ambiente' : 'Som ambiente'}</span>
      </button>
    </>
  );
}
