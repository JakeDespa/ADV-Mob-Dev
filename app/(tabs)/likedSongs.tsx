
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

const DATA = new Array(12).fill(0).map((_, i) => ({ id: String(i + 1), title: `Liked Song ${i + 1}`, artist: `Artist ${i + 1}` }));

export default function LikedSongsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f6f6f6', dark: '#111' }}
      headerImage={<IconSymbol name="heart.fill" size={260} color="#E63946" style={{ position: 'absolute', bottom: -60, left: -20 }} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Liked Songs</ThemedText>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}>
              <View style={styles.thumb} />
              <View style={styles.meta}>
                <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                <ThemedText type="default">{item.artist}</ThemedText>
              </View>
              <ThemedText type="default">{Math.floor(Math.random() * 4) + 1}:{('0' + (Math.floor(Math.random() * 59) + 1)).slice(-2)}</ThemedText>
            </TouchableOpacity>
          )}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  thumb: { width: 56, height: 56, backgroundColor: '#333', borderRadius: 6 },
  meta: { flex: 1 },
});
