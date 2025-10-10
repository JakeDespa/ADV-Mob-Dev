import { ThemedText } from '@/components/ThemedText';
import SpotifyLayout from '@/components/SpotifyLayout';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';

const DATA = new Array(20).fill(0).map((_, i) => ({ 
  id: String(i + 1), 
  title: `Liked Song ${i + 1}`, 
  artist: `Artist ${i + 1}`,
  album: `Album ${i + 1}`,
  duration: `${Math.floor(Math.random() * 4) + 1}:${('0' + (Math.floor(Math.random() * 59) + 1)).slice(-2)}`
}));

export default function LikedSongsScreen() {
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
              <ThemedText style={styles.playlistMeta}>{DATA.length} songs</ThemedText>
            </View>
          </View>
          
          <View style={styles.controls}>
            <TouchableOpacity style={styles.playButton}>
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
          
          {DATA.map((item, index) => (
            <TouchableOpacity key={item.id} style={styles.songRow}>
              <ThemedText style={styles.songNumber}>{index + 1}</ThemedText>
              <View style={styles.songMain}>
                <View style={styles.songThumb} />
                <View style={styles.songMeta}>
                  <ThemedText style={styles.songTitle}>{item.title}</ThemedText>
                  <ThemedText style={styles.songArtist}>{item.artist}</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.songAlbum}>{item.album}</ThemedText>
              <ThemedText style={styles.songDuration}>{item.duration}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SpotifyLayout>
  );
}

const styles = StyleSheet.create({
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
  songNumber: {
    width: 40,
    color: '#b3b3b3',
    fontSize: 14,
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
