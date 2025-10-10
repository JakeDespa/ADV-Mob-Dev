import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function SpotifyHomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1DB954', dark: '#0E6B2D' }}
      headerImage={
        <IconSymbol
          name="music.note.list"
          size={260}
          color="#ffffff"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Good Evening</ThemedText>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Featured
        </ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontal}>
          {['Daily Mix', 'Top Hits', 'Chill Vibes', 'Focus'].map((title, i) => (
            <TouchableOpacity key={i} style={styles.card}>
              <View style={styles.cardImage} />
              <ThemedText type="defaultSemiBold">{title}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Recently played
        </ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontal}>
          {['Song A', 'Song B', 'Song C'].map((s, i) => (
            <TouchableOpacity key={i} style={styles.smallCard}>
              <View style={styles.smallImage} />
              <ThemedText>{s}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  headerImage: {
    position: 'absolute',
    bottom: -60,
    left: -20,
    color: '#fff',
  },
  sectionTitle: {
    marginTop: 6,
  },
  horizontal: {
    paddingVertical: 8,
  },
  card: {
    width: 160,
    height: 160,
    marginRight: 12,
    borderRadius: 6,
    backgroundColor: '#222',
    padding: 12,
    justifyContent: 'flex-end',
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#444',
    borderRadius: 6,
  },
  smallCard: {
    width: 100,
    marginRight: 12,
    alignItems: 'center',
  },
  smallImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#666',
    marginBottom: 6,
  },
});
