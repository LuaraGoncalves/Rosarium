import { Pause, Play } from 'lucide-react';
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
        className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#d6ad61]/70 bg-[#080808] p-0 text-church-text-muted shadow-lg shadow-black/25 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5bd68]"
        aria-pressed={isPlaying}
        title="Som ambiente"
        aria-label={isPlaying ? 'Pausar musica contemplativa' : 'Tocar musica contemplativa'}
      >
        <span className={`absolute inset-0 overflow-hidden rounded-full border border-[#3b3b3b] bg-[#090909] shadow-[inset_0_0_7px_#000,0_1px_3px_rgba(0,0,0,.5)] ${isPlaying ? 'animate-spin [animation-duration:3.5s]' : ''}`} aria-hidden="true">
          <img src="/images/vinyl-record-realistic.png" alt="" className="h-full w-full object-cover" />
        </span>
        <span className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
          {isPlaying ? <Pause className="h-5 w-5 text-white drop-shadow" /> : <Play className="h-5 w-5 text-white drop-shadow" />}
        </span>
      </button>
    </>
  );
}
