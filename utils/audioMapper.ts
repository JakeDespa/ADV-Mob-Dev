import type { Song } from '@/contexts/AudioPlayerContext';
import type { SpotifyTrack } from '@/services/spotifyService';

/**
 * Maps Spotify track metadata to your Song format with local audio files
 * 
 * How to use:
 * 1. Place your audio files in assets/audio/ folder
 * 2. Name them like: song1.mp3, song2.mp3, etc.
 * 3. Or use URLs from your server/cloud storage
 */

// Option 1: Use local audio files (bundled with app)
// Uncomment and add your local files
/*
const LOCAL_AUDIO_FILES: { [key: string]: any } = {
  'song1': require('../assets/audio/song1.mp3'),
  'song2': require('../assets/audio/song2.mp3'),
  'song3': require('../assets/audio/song3.mp3'),
  // Add more files...
};
*/

// Option 2: Use remote URLs (your server or cloud storage)
const REMOTE_AUDIO_URLS: { [key: string]: string } = {
  // Example: Map Spotify track IDs to your audio URLs
  // 'spotify_track_id': 'https://your-server.com/audio/song.mp3',
  // Or use a pattern-based approach
};

// Option 3: Use demo audio (fallback)
const DEMO_AUDIO_URLS = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
];

/**
 * Convert Spotify track to Song format with local audio
 */
export function mapSpotifyTrackToSong(
  track: SpotifyTrack,
  index: number,
  formatDuration: (ms: number) => string
): Song {
  // Get audio URL - priority: remote URL > local file > demo audio
  let audioUrl: string | any;

  // Try to get from remote URLs mapping
  if (REMOTE_AUDIO_URLS[track.id]) {
    audioUrl = REMOTE_AUDIO_URLS[track.id];
  }
  // Try to get from local files
  // else if (LOCAL_AUDIO_FILES[`song${index + 1}`]) {
  //   audioUrl = LOCAL_AUDIO_FILES[`song${index + 1}`];
  // }
  // Fallback to demo audio
  else {
    audioUrl = DEMO_AUDIO_URLS[index % DEMO_AUDIO_URLS.length];
  }

  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
    duration: formatDuration(track.duration_ms),
    audioUrl: audioUrl,
    imageUrl: track.album.images[0]?.url || `https://picsum.photos/200/200?random=${index}`,
  };
}

/**
 * Convert array of Spotify tracks to Songs
 */
export function mapSpotifyTracksToSongs(
  tracks: SpotifyTrack[],
  formatDuration: (ms: number) => string
): Song[] {
  return tracks.map((track, index) => 
    mapSpotifyTrackToSong(track, index, formatDuration)
  );
}

/**
 * Generate demo songs (fallback when not authenticated)
 */
export function generateDemoSongs(count: number = 20): Song[] {
  return new Array(count).fill(0).map((_, i) => ({
    id: String(i + 1),
    title: `Demo Song ${i + 1}`,
    artist: `Artist ${i + 1}`,
    album: `Album ${i + 1}`,
    duration: `${Math.floor(Math.random() * 4) + 1}:${String(Math.floor(Math.random() * 59) + 1).padStart(2, '0')}`,
    audioUrl: DEMO_AUDIO_URLS[i % DEMO_AUDIO_URLS.length],
    imageUrl: `https://picsum.photos/200/200?random=${i + 1}`,
  }));
}
