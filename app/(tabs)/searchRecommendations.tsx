import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchRecommendationsScreen() {
  const [query, setQuery] = useState('');

  const recommendations = ['Lo-fi Beats', 'Indie Rock', 'Pop Rising', 'Instrumental'];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#000' }}
      headerImage={<IconSymbol name="magnifyingglass" size={260} color="#888" style={{ position: 'absolute', bottom: -60, left: -20 }} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Search</ThemedText>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search songs, artists, or albums"
          style={styles.searchInput}
        />

        <ThemedText type="subtitle" style={{ marginTop: 6 }}>
          Recommended for you
        </ThemedText>
        <ScrollView style={styles.recs} showsVerticalScrollIndicator={false}>
          {recommendations.map((r) => (
            <TouchableOpacity key={r} style={styles.recCard}>
              <View style={styles.recImage} />
              <ThemedText type="defaultSemiBold">{r}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  searchInput: { padding: 10, borderRadius: 8, backgroundColor: '#efefef' },
  recs: { marginTop: 8 },
  recCard: { flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 10 },
  recImage: { width: 56, height: 56, backgroundColor: '#ddd', borderRadius: 6 },
});
