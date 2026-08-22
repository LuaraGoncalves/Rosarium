import { PrayerMusicPlayer } from './PrayerMusicPlayer';
import { ThemeToggle } from './ThemeToggle';

export function AppFloatingControls() {
  return (
    <div className="fixed right-20 top-3 z-[60] flex items-center gap-2 md:right-6">
      <PrayerMusicPlayer />
      <ThemeToggle />
    </div>
  );
}
