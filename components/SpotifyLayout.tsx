import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import { useState, ReactNode } from 'react';

interface SpotifyLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

export default function SpotifyLayout({ children, activeTab = 'home' }: SpotifyLayoutProps) {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(activeTab);

  const navigateTo = (screen: string, tab: string) => {
    setCurrentTab(tab);
    router.push(`/(tabs)/${screen}` as any);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.logoContainer}>
          <Ionicons name="musical-notes" size={28} color="#1DB954" />
          <ThemedText style={styles.logoText}>Spotify</ThemedText>
        </View>
        
        <View style={styles.navSection}>
          <TouchableOpacity 
            style={[styles.navItem, currentTab === 'home' && styles.navItemActive]}
            onPress={() => navigateTo('index', 'home')}
          >
            <Ionicons name="home" size={24} color={currentTab === 'home' ? '#fff' : '#b3b3b3'} />
            <ThemedText style={[styles.navText, { color: currentTab === 'home' ? '#fff' : '#b3b3b3' }]}>Home</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navItem, currentTab === 'search' && styles.navItemActive]}
            onPress={() => navigateTo('searchRecommendations', 'search')}
          >
            <Ionicons name="search" size={24} color={currentTab === 'search' ? '#fff' : '#b3b3b3'} />
            <ThemedText style={[styles.navText, { color: currentTab === 'search' ? '#fff' : '#b3b3b3' }]}>Search</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navItem, currentTab === 'library' && styles.navItemActive]}
            onPress={() => navigateTo('explore', 'library')}
          >
            <Ionicons name="library" size={24} color={currentTab === 'library' ? '#fff' : '#b3b3b3'} />
            <ThemedText style={[styles.navText, { color: currentTab === 'library' ? '#fff' : '#b3b3b3' }]}>Your Library</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.playlistSection}>
          <TouchableOpacity 
            style={styles.createPlaylistButton}
            onPress={() => navigateTo('scrollable', 'scrollable')}
          >
            <View style={styles.plusIcon}>
              <Ionicons name="add" size={20} color="#000" />
            </View>
            <ThemedText style={styles.createPlaylistText}>Create Playlist</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.likedSongsButton}
            onPress={() => navigateTo('likedSongs', 'liked')}
          >
            <View style={styles.heartIcon}>
              <Ionicons name="heart" size={16} color="#fff" />
            </View>
            <ThemedText style={styles.likedSongsText}>Liked Songs</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.navButtons}>
            <TouchableOpacity style={styles.navButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navButton, { marginLeft: 16 }]}>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigateTo('profileSetup', 'profile')}
          >
            <ThemedText style={styles.profileText}>Profile</ThemedText>
            <View style={styles.profileIcon}>
              <FontAwesome5 name="user" size={16} color="#000" />
            </View>
          </TouchableOpacity>
        </View>

        {children}
      </View>

      {/* Player Bar */}
      <View style={styles.playerBar}>
        <View style={styles.nowPlaying}>
          <View style={styles.trackImage} />
          <View style={styles.trackInfo}>
            <ThemedText style={styles.trackTitle}>Song Title</ThemedText>
            <ThemedText style={styles.artistName}>Artist Name</ThemedText>
          </View>
          <TouchableOpacity style={styles.likeButton}>
            <Ionicons name="heart-outline" size={20} color="#b3b3b3" />
          </TouchableOpacity>
        </View>

        <View style={styles.playerControls}>
          <View style={styles.playerButtons}>
            <TouchableOpacity>
              <Ionicons name="shuffle" size={20} color="#1DB954" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="play-skip-back" size={20} color="#b3b3b3" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="play-skip-forward" size={20} color="#b3b3b3" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="repeat" size={20} color="#b3b3b3" />
            </TouchableOpacity>
          </View>
          <View style={styles.progressBar}>
            <ThemedText style={styles.timeText}>0:00</ThemedText>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
            <ThemedText style={styles.timeText}>3:45</ThemedText>
          </View>
        </View>

        <View style={styles.volumeControls}>
          <Ionicons name="volume-medium" size={16} color="#b3b3b3" />
          <View style={styles.volumeBar}>
            <View style={styles.volumeFill} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#121212',
  },
  sidebar: {
    width: 240,
    backgroundColor: '#000',
    paddingTop: 12,
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#282828',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    marginBottom: 24,
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  navSection: {
    marginBottom: 24,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  navItemActive: {
    backgroundColor: '#282828',
  },
  navText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
    fontWeight: '600',
  },
  playlistSection: {
    paddingHorizontal: 8,
  },
  createPlaylistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  plusIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  createPlaylistText: {
    color: '#fff',
    fontWeight: '600',
  },
  likedSongsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
  },
  heartIcon: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#5f27cd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  likedSongsText: {
    color: '#fff',
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    height: 64,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
  },
  navButtons: {
    flexDirection: 'row',
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 23,
    paddingVertical: 4,
    paddingLeft: 8,
    paddingRight: 4,
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
  },
  profileIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
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
  },
  progressFill: {
    width: '30%',
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
    width: '70%',
    height: '100%',
    backgroundColor: '#b3b3b3',
    borderRadius: 2,
  },
});
