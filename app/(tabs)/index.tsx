import { Image } from 'expo-image';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { PlayerBar } from '@/components/PlayerBar';

const PlaylistCard = ({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) => (
  <TouchableOpacity style={styles.playlistCard}>
    <Image source={{ uri: imageUrl }} style={styles.playlistImage} />
    <ThemedText style={styles.playlistTitle} numberOfLines={1}>{title}</ThemedText>
    <ThemedText style={styles.playlistDescription} numberOfLines={2}>{description}</ThemedText>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');

  const navigateTo = (screen: string, tab: string) => {
    setActiveTab(tab);
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
            style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
            onPress={() => navigateTo('index', 'home')}
          >
            <Ionicons name="home" size={24} color={activeTab === 'home' ? '#fff' : '#b3b3b3'} />
            <ThemedText style={[styles.navText, { color: activeTab === 'home' ? '#fff' : '#b3b3b3' }]}>Home</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navItem, activeTab === 'search' && styles.navItemActive]}
            onPress={() => navigateTo('searchRecommendations', 'search')}
          >
            <Ionicons name="search" size={24} color={activeTab === 'search' ? '#fff' : '#b3b3b3'} />
            <ThemedText style={[styles.navText, { color: activeTab === 'search' ? '#fff' : '#b3b3b3' }]}>Search</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.navItem, activeTab === 'library' && styles.navItemActive]}
            onPress={() => navigateTo('explore', 'library')}
          >
            <Ionicons name="library" size={24} color={activeTab === 'library' ? '#fff' : '#b3b3b3'} />
            <ThemedText style={[styles.navText, { color: activeTab === 'library' ? '#fff' : '#b3b3b3' }]}>Your Library</ThemedText>
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
            <TouchableOpacity style={styles.navButton}>
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

        <ScrollView style={styles.contentScroll}>
          <View style={styles.greetingSection}>
            <ThemedText style={styles.greeting}>Good afternoon</ThemedText>
            <View style={styles.greetingButtons}>
              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingsButton}>
                <Ionicons name="settings-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.recentlyPlayed}>
            <ThemedText style={styles.sectionTitle}>Recently played</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {[1, 2, 3, 4, 5].map((item) => (
                <View key={item} style={styles.recentItem}>
                  <View style={styles.recentImage} />
                  <ThemedText style={styles.recentTitle} numberOfLines={1}>Playlist {item}</ThemedText>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.madeForYou}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>Made For Jake</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.seeAll}>Show all</ThemedText>
              </TouchableOpacity>
            </View>
            <View style={styles.playlistGrid}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <PlaylistCard
                  key={item}
                  title={`Daily Mix ${item}`}
                  description="Made for you based on your listening history"
                  imageUrl={`https://picsum.photos/200/200?random=${item}`}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Player Bar */}
      <PlayerBar />
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
    backgroundColor: 'linear-gradient(135deg, #450af5, #c4efd9)', 
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
  contentScroll: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  greetingButtons: {
    flexDirection: 'row',
  },
  notificationButton: {
    marginRight: 16,
  },
  settingsButton: {},
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recentlyPlayed: {
    marginBottom: 32,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  recentItem: {
    width: 120,
    marginRight: 16,
  },
  recentImage: {
    width: 120,
    height: 120,
    backgroundColor: '#282828',
    borderRadius: 8,
    marginBottom: 8,
  },
  recentTitle: {
    color: '#fff',
    fontWeight: '600',
  },
  madeForYou: {
    marginBottom: 100, // Extra space for player bar
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    color: '#b3b3b3',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  playlistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  playlistCard: {
    width: '48%',
    marginBottom: 24,
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 16,
  },
  playlistImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: '#282828',
  },
  playlistTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  playlistDescription: {
    color: '#b3b3b3',
    fontSize: 12,
    lineHeight: 16,
  },
});
