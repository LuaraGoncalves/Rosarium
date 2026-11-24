import { Minus, Pause, Plus, Play } from 'lucide-react';
import { useRef, useState } from 'react';

export function PrayerMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [volume, setVolume] = useState(0.28);
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

    audio.volume = volume;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const updateVolume = (nextVolume: number) => {
    const safeVolume = Math.min(1, Math.max(0, nextVolume));
    setVolume(safeVolume);

    if (audioRef.current) {
      audioRef.current.volume = safeVolume;
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/miracles-of-fatima.mp3" loop preload="metadata" />
      <div
        className="relative flex items-center gap-2"
        onMouseEnter={() => setIsVolumeOpen(true)}
        onMouseLeave={() => setIsVolumeOpen(false)}
      >
        <button
          type="button"
          onClick={async () => {
            setIsVolumeOpen(true);
            await toggleMusic();
          }}
          className="relative flex min-h-11 min-w-11 items-center justify-center overflow-hidden rounded-md border border-church-border bg-church-bg-secondary/95 p-2 text-church-text-muted shadow-sm backdrop-blur transition-colors hover:border-church-border-hover hover:text-church-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-accent"
          aria-expanded={isVolumeOpen}
          aria-controls="prayer-music-volume"
          title={isPlaying ? 'Pausar e controlar volume' : 'Tocar e controlar volume'}
          aria-label={isPlaying ? 'Pausar e controlar volume' : 'Tocar e controlar volume'}
        >
          <span
            className={`absolute inset-0 overflow-hidden rounded-md border border-[#3b3b3b] bg-[#090909] shadow-[inset_0_0_7px_#000,0_1px_3px_rgba(0,0,0,.5)] ${isPlaying ? 'animate-spin [animation-duration:3.5s]' : ''}`}
            aria-hidden="true"
          >
            <img
              src="/images/vinyl-record-realistic.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center bg-black/10"
            aria-hidden="true"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white drop-shadow" />
            ) : (
              <Play className="h-4 w-4 text-white drop-shadow" />
            )}
          </span>
        </button>

        {isVolumeOpen && (
          <div
            id="prayer-music-volume"
            className="absolute right-0 top-full mt-2 flex items-center gap-1 rounded-md border border-church-border bg-church-bg-secondary/95 px-2 py-1.5 shadow-lg backdrop-blur"
            role="group"
            aria-label="Controle de volume"
          >
            <button
              type="button"
              onClick={() => updateVolume(volume - 0.1)}
              className="rounded p-1 text-church-text-muted transition-colors hover:text-church-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-accent"
              aria-label="Diminuir volume"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => updateVolume(Number(event.target.value))}
              className="h-1 w-24 accent-church-accent"
              aria-label="Volume da música"
            />
            <button
              type="button"
              onClick={() => updateVolume(volume + 0.1)}
              className="rounded p-1 text-church-text-muted transition-colors hover:text-church-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-church-accent"
              aria-label="Aumentar volume"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
