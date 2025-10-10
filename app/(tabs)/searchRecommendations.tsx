import { ThemedText } from '@/components/ThemedText';
import SpotifyLayout from '@/components/SpotifyLayout';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchRecommendationsScreen() {
  const [query, setQuery] = useState('');

  const recommendations = ['Lo-fi Beats', 'Indie Rock', 'Pop Rising', 'Instrumental', 'Jazz Vibes', 'Electronic', 'Hip Hop', 'Classical'];
  const genres = [
    { name: 'Pop', color: '#E13300' },
    { name: 'Hip-Hop', color: '#BA5D07' },
    { name: 'Rock', color: '#8D67AB' },
    { name: 'Latin', color: '#E8115B' },
    { name: 'Dance', color: '#1E3264' },
    { name: 'Electronic', color: '#148A08' },
  ];

  return (
    <SpotifyLayout activeTab="search">
      <ScrollView style={styles.contentScroll}>
        <View style={styles.searchSection}>
          <ThemedText style={styles.title}>Search</ThemedText>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="What do you want to listen to?"
            placeholderTextColor="#b3b3b3"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Browse all</ThemedText>
          <View style={styles.genreGrid}>
            {genres.map((genre) => (
              <TouchableOpacity key={genre.name} style={[styles.genreCard, { backgroundColor: genre.color }]}>
                <ThemedText style={styles.genreText}>{genre.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Recommended for you</ThemedText>
          <View style={styles.recommendationList}>
            {recommendations.map((r) => (
              <TouchableOpacity key={r} style={styles.recCard}>
                <View style={styles.recImage} />
                <View style={styles.recInfo}>
                  <ThemedText style={styles.recTitle}>{r}</ThemedText>
                  <ThemedText style={styles.recSubtitle}>Playlist</ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SpotifyLayout>
  );
}

const styles = StyleSheet.create({
  contentScroll: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  searchSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  searchInput: {
    padding: 12,
    borderRadius: 24,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#000',
  },
  section: {
    marginBottom: 100,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  genreCard: {
    width: '47%',
    height: 100,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'flex-end',
  },
  genreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recommendationList: {
    gap: 8,
  },
  recCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#181818',
  },
  recImage: {
    width: 56,
    height: 56,
    backgroundColor: '#282828',
    borderRadius: 4,
  },
  recInfo: {
    marginLeft: 12,
    flex: 1,
  },
  recTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recSubtitle: {
    color: '#b3b3b3',
    fontSize: 14,
  },
});
