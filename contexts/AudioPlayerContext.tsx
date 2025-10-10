import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  audioUrl?: string;
  imageUrl?: string;
}

interface AudioPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  playSong: (song: Song) => Promise<void>;
  pauseSong: () => Promise<void>;
  resumeSong: () => Promise<void>;
  stopSong: () => Promise<void>;
  seekTo: (position: number) => Promise<void>;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  isShuffled: boolean;
  isRepeating: boolean;
  playlist: Song[];
  setPlaylist: (songs: Song[]) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
};

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  
  const soundRef = useRef<Audio.Sound | null>(null);
  const currentIndexRef = useRef<number>(0);

  useEffect(() => {
    // Configure audio mode
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish && !status.isLooping) {
        playNext();
      }
    }
  };

  const playSong = async (song: Song) => {
    try {
      // Stop current song if playing
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // For demo purposes, use a sample audio URL
      // In production, you'd use song.audioUrl
      const audioUrl = song.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      soundRef.current = sound;
      setCurrentSong(song);
      setIsPlaying(true);

      // Update current index in playlist
      const index = playlist.findIndex(s => s.id === song.id);
      if (index !== -1) {
        currentIndexRef.current = index;
      }
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };

  const pauseSong = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resumeSong = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const stopSong = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setIsPlaying(false);
      setPosition(0);
    }
  };

  const seekTo = async (positionMillis: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(positionMillis);
    }
  };

  const playNext = async () => {
    if (playlist.length === 0) return;

    let nextIndex: number;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndexRef.current + 1) % playlist.length;
    }

    currentIndexRef.current = nextIndex;
    await playSong(playlist[nextIndex]);
  };

  const playPrevious = async () => {
    if (playlist.length === 0) return;

    let prevIndex: number;
    if (position > 3000) {
      // If more than 3 seconds played, restart current song
      await seekTo(0);
      return;
    }

    prevIndex = currentIndexRef.current - 1;
    if (prevIndex < 0) {
      prevIndex = playlist.length - 1;
    }

    currentIndexRef.current = prevIndex;
    await playSong(playlist[prevIndex]);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
    if (soundRef.current) {
      soundRef.current.setIsLoopingAsync(!isRepeating);
    }
  };

  const value: AudioPlayerContextType = {
    currentSong,
    isPlaying,
    position,
    duration,
    playSong,
    pauseSong,
    resumeSong,
    stopSong,
    seekTo,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
    isShuffled,
    isRepeating,
    playlist,
    setPlaylist,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
