import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';

export const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    position,
    duration,
    pauseSong,
    resumeSong,
    playNext,
    playPrevious,
    seekTo,
    toggleShuffle,
    toggleRepeat,
    isShuffled,
    isRepeating,
  } = useAudioPlayer();

  const [volume, setVolume] = useState(0.7);

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  const handleSeek = (value: number) => {
    seekTo(value);
  };

  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View style={styles.playerBar}>
      <View style={styles.nowPlaying}>
        <View style={styles.trackImage} />
        <View style={styles.trackInfo}>
          <ThemedText style={styles.trackTitle}>
            {currentSong?.title || 'No song playing'}
          </ThemedText>
          <ThemedText style={styles.artistName}>
            {currentSong?.artist || 'Select a song to play'}
          </ThemedText>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart-outline" size={20} color="#b3b3b3" />
        </TouchableOpacity>
      </View>

      <View style={styles.playerControls}>
        <View style={styles.playerButtons}>
          <TouchableOpacity onPress={toggleShuffle}>
            <Ionicons 
              name="shuffle" 
              size={20} 
              color={isShuffled ? '#1DB954' : '#b3b3b3'} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playPrevious}>
            <Ionicons name="play-skip-back" size={20} color="#b3b3b3" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.playButton}
            onPress={handlePlayPause}
          >
            <Ionicons 
              name={isPlaying ? 'pause' : 'play'} 
              size={24} 
              color="#000" 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playNext}>
            <Ionicons name="play-skip-forward" size={20} color="#b3b3b3" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleRepeat}>
            <Ionicons 
              name="repeat" 
              size={20} 
              color={isRepeating ? '#1DB954' : '#b3b3b3'} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
          <ThemedText style={styles.timeText}>
            {formatTime(position)}
          </ThemedText>
          <View style={styles.progressTrack}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progressPercentage}%` }
              ]} 
            />
          </View>
          <ThemedText style={styles.timeText}>
            {formatTime(duration)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.volumeControls}>
        <Feather name="speaker" size={16} color="#b3b3b3" />
        <View style={styles.volumeBar}>
          <View style={[styles.volumeFill, { width: `${volume * 100}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#181818',
    borderTopWidth: 1,
    borderTopColor: '#282828',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  nowPlaying: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 180,
  },
  trackImage: {
    width: 56,
    height: 56,
    backgroundColor: '#282828',
    borderRadius: 4,
  },
  trackInfo: {
    marginLeft: 12,
    maxWidth: 200,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  artistName: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  likeButton: {
    marginLeft: 16,
  },
  playerControls: {
    flex: 1,
    maxWidth: 722,
    alignItems: 'center',
  },
  playerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 16,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  progressBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#b3b3b3',
    fontSize: 11,
    width: 40,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#404040',
    borderRadius: 2,
    marginHorizontal: 8,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#b3b3b3',
    borderRadius: 2,
  },
  volumeControls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 180,
  },
  volumeBar: {
    width: 100,
    height: 4,
    backgroundColor: '#404040',
    borderRadius: 2,
    marginLeft: 8,
  },
  volumeFill: {
    height: '100%',
    backgroundColor: '#b3b3b3',
    borderRadius: 2,
  },
});
