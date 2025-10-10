import { ThemedText } from '@/components/ThemedText';
import SpotifyLayout from '@/components/SpotifyLayout';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import type { Song } from '@/contexts/AudioPlayerContext';
import { spotifyService } from '@/services/spotifyService';
import { mapSpotifyTracksToSongs, generateDemoSongs } from '@/utils/audioMapper';

export default function LikedSongsScreen() {
  const { playSong, currentSong, isPlaying, setPlaylist } = useAudioPlayer();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    setLoading(true);
    try {
      // For now, just use demo songs (Spotify auth is complex for local dev)
      const demoSongs = generateDemoSongs(50);
      setSongs(demoSongs);
      setPlaylist(demoSongs);
      setAuthenticated(false);
    } catch (error) {
      console.error('Error loading songs:', error);
      const demoSongs = generateDemoSongs(20);
      setSongs(demoSongs);
      setPlaylist(demoSongs);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSpotifyLogin = async () => {
    try {
      const success = await spotifyService.authenticate();
      if (success) {
        Alert.alert('Success', 'Connected to Spotify!');
        await loadSongs();
      } else {
        Alert.alert('Error', 'Failed to connect to Spotify');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Error', 'Failed to connect to Spotify');
    }
  };

  const handleSongPress = async (song: Song) => {
    await playSong(song);
  };

  const handlePlayAll = async () => {
    if (songs.length > 0) {
      await playSong(songs[0]);
    }
  };

  if (loading) {
    return (
      <SpotifyLayout activeTab="liked">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <ThemedText style={styles.loadingText}>Loading songs...</ThemedText>
        </View>
      </SpotifyLayout>
    );
  }

  return (
    <SpotifyLayout activeTab="liked">
      <ScrollView style={styles.contentScroll}>
        <View style={styles.headerSection}>
          <View style={styles.playlistHeader}>
            <View style={styles.playlistCover}>
              <Ionicons name="heart" size={80} color="#fff" />
            </View>
            <View style={styles.playlistInfo}>
              <ThemedText style={styles.playlistType}>PLAYLIST</ThemedText>
              <ThemedText style={styles.playlistTitle}>Liked Songs</ThemedText>
              <ThemedText style={styles.playlistMeta}>{songs.length} songs</ThemedText>
            </View>
          </View>
          
          <View style={styles.controls}>
            <TouchableOpacity style={styles.playButton} onPress={handlePlayAll}>
              <Ionicons name="play" size={28} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shuffleButton}>
              <Ionicons name="shuffle" size={24} color="#b3b3b3" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#b3b3b3" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.songList}>
          <View style={styles.tableHeader}>
            <ThemedText style={styles.headerNumber}>#</ThemedText>
            <ThemedText style={styles.headerTitle}>TITLE</ThemedText>
            <ThemedText style={styles.headerAlbum}>ALBUM</ThemedText>
            <ThemedText style={styles.headerDuration}>
              <Ionicons name="time-outline" size={16} color="#b3b3b3" />
            </ThemedText>
          </View>
          
          {songs.map((item: Song, index: number) => {
            const isCurrentSong = currentSong?.id === item.id;
            return (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.songRow, isCurrentSong && styles.songRowActive]}
              onPress={() => handleSongPress(item)}
            >
              <View style={styles.songNumberContainer}>
                {isCurrentSong && isPlaying ? (
                  <Ionicons name="volume-high" size={16} color="#1DB954" />
                ) : (
                  <ThemedText style={[styles.songNumber, isCurrentSong && styles.songNumberActive]}>
                    {index + 1}
                  </ThemedText>
                )}
              </View>
              <View style={styles.songMain}>
                <View style={styles.songThumb} />
                <View style={styles.songMeta}>
                  <ThemedText style={[styles.songTitle, isCurrentSong && styles.songTitleActive]}>
                    {item.title}
                  </ThemedText>
                  <ThemedText style={styles.songArtist}>{item.artist}</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.songAlbum}>{item.album}</ThemedText>
              <ThemedText style={styles.songDuration}>{item.duration}</ThemedText>
            </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SpotifyLayout>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    color: '#fff',
    marginTop: 16,
    fontSize: 16,
  },
  spotifyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
    padding: 16,
    margin: 24,
    marginBottom: 0,
    borderRadius: 8,
    gap: 16,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  connectButton: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentScroll: {
    flex: 1,
  },
  headerSection: {
    padding: 24,
    paddingBottom: 16,
  },
  playlistHeader: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  playlistCover: {
    width: 232,
    height: 232,
    backgroundColor: 'linear-gradient(135deg, #450af5, #c4efd9)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  playlistInfo: {
    justifyContent: 'flex-end',
  },
  playlistType: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  playlistMeta: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shuffleButton: {
    padding: 8,
  },
  moreButton: {
    padding: 8,
  },
  songList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
    marginBottom: 8,
  },
  headerNumber: {
    width: 40,
    color: '#b3b3b3',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 2,
    color: '#b3b3b3',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerAlbum: {
    flex: 1,
    color: '#b3b3b3',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerDuration: {
    width: 60,
    textAlign: 'right',
    color: '#b3b3b3',
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 4,
  },
  songRowActive: {
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
  },
  songNumberContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songNumber: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  songNumberActive: {
    color: '#1DB954',
  },
  songMain: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  songThumb: {
    width: 40,
    height: 40,
    backgroundColor: '#282828',
    borderRadius: 4,
    marginRight: 12,
  },
  songMeta: {
    flex: 1,
  },
  songTitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  songTitleActive: {
    color: '#1DB954',
  },
  songArtist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  songAlbum: {
    flex: 1,
    color: '#b3b3b3',
    fontSize: 14,
  },
  songDuration: {
    width: 60,
    textAlign: 'right',
    color: '#b3b3b3',
    fontSize: 14,
  },
});
