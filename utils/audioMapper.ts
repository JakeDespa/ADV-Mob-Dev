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

// Local audio files from assets/audio folder
const AUDIO_FILES: any[] = [
  require("../assets/audio/Alors on danse - Radio Edit.mp3"),
  require("../assets/audio/Amour plastique.mp3"),
  require("../assets/audio/baguette.mp3"),
  require("../assets/audio/danse.mp3"),
  require("../assets/audio/fete.mp3"),
  require("../assets/audio/Love Story.mp3"),
  require("../assets/audio/memes.mp3"),
  require("../assets/audio/moi.mp3"),
  require("../assets/audio/Papaoutai.mp3"),
  require("../assets/audio/Suavemente.mp3"),
  require("../assets/audio/Tourner Dans Le Vide.mp3"),
];

/**
 * Convert Spotify track to Song format with local audio
 */
export function mapSpotifyTrackToSong(
  track: SpotifyTrack,
  index: number,
  formatDuration: (ms: number) => string
): Song {
  // Get audio URL from audio files
  const audioUrl = AUDIO_FILES[index % AUDIO_FILES.length];

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

// Song metadata for your local files
const SONG_METADATA = [
  { title: 'Alors on danse', artist: 'Stromae', album: 'Cheese' },
  { title: 'Amour plastique', artist: 'Videoclub', album: 'Euphories' },
  { title: 'L\'Amour, Les Baguettes, Paris', artist: 'Stella Jang', album: 'Single' },
  { title: 'Dernière danse', artist: 'Indila', album: 'Mini World' },
  { title: 'Ta fête', artist: 'Stromae', album: 'Racine carrée' },
  { title: 'Love Story', artist: 'Indila', album: 'Mini World' },
  { title: 'Tous les mêmes', artist: 'Stromae', album: 'Racine carrée' },
  { title: 'Moi c\'est', artist: 'Camille Lellouche', album: 'Single' },
  { title: 'Papaoutai', artist: 'Stromae', album: 'Racine carrée' },
  { title: 'Suavemente', artist: 'Elvis Crespo', album: 'Suavemente' },
  { title: 'Tourner Dans Le Vide', artist: 'Indila', album: 'Mini World' },
];

/**
 * Generate songs using local audio files with real metadata
 */
export function generateDemoSongs(count: number = 20): Song[] {
  return new Array(count).fill(0).map((_, i) => {
    const index = i % AUDIO_FILES.length;
    const metadata = SONG_METADATA[index];
    return {
      id: String(i + 1),
      title: metadata.title,
      artist: metadata.artist,
      album: metadata.album,
      duration: `${Math.floor(Math.random() * 4) + 2}:${String(Math.floor(Math.random() * 59) + 1).padStart(2, '0')}`,
      audioUrl: AUDIO_FILES[index],
      imageUrl: `https://picsum.photos/200/200?random=${index + 1}`,
    };
  });
}
