import { PrayerMusicPlayer } from './PrayerMusicPlayer';

export function AppFloatingControls() {
  return (
    <div className="fixed right-4 top-3 z-[60] md:right-6">
      <PrayerMusicPlayer />
    </div>
  );
}
