import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileSetupScreen() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#5b21b6', dark: '#3b0764' }}
      headerImage={<IconSymbol name="person.crop.circle" size={260} color="#ffffff" style={{ position: 'absolute', bottom: -60, left: -20 }} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Profile Setup</ThemedText>

        <View style={styles.avatarRow}>
          <Image source={require('@/assets/images/react-logo.png')} style={styles.avatar} />
          <ThemedText type="default">Tap avatar to change</ThemedText>
        </View>

        <ThemedText type="subtitle">Display name</ThemedText>
        <TextInput value={name} onChangeText={setName} placeholder="Your name" style={styles.input} />

        <ThemedText type="subtitle">Bio</ThemedText>
        <TextInput value={bio} onChangeText={setBio} placeholder="A short bio" style={[styles.input, { height: 100 }]} multiline />

        <TouchableOpacity style={styles.saveButton}>
          <ThemedText type="defaultSemiBold">Save profile</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  avatarRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  input: { padding: 10, borderRadius: 6, backgroundColor: '#efefef' },
  saveButton: { marginTop: 12, padding: 12, borderRadius: 6, backgroundColor: '#2563eb', alignItems: 'center' },
});
