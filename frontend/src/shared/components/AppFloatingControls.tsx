import { PrayerMusicPlayer } from './PrayerMusicPlayer';

export function AppFloatingControls() {
  return (
    <div className="app-floating-controls fixed top-3 z-[60]">
      <PrayerMusicPlayer />
    </div>
  );
}
