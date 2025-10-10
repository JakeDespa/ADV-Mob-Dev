import { ThemedText } from '@/components/ThemedText';
import SpotifyLayout from '@/components/SpotifyLayout';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [name, setName] = useState('Jake Harvey Despabeladero');
  const [email, setEmail] = useState('jake@example.com');
  const [country, setCountry] = useState('Philippines');

  return (
    <SpotifyLayout activeTab="profile">
      <ScrollView style={styles.contentScroll}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <FontAwesome5 name="user" size={60} color="#b3b3b3" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={styles.profileLabel}>PROFILE</ThemedText>
            <ThemedText style={styles.profileName}>{name || 'Your Name'}</ThemedText>
            <ThemedText style={styles.profileStats}>0 Public Playlists</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account Settings</ThemedText>
          
          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Display Name</ThemedText>
            <TextInput 
              value={name} 
              onChangeText={setName} 
              placeholder="Your name" 
              placeholderTextColor="#b3b3b3"
              style={styles.input} 
            />
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput 
              value={email} 
              onChangeText={setEmail} 
              placeholder="your.email@example.com" 
              placeholderTextColor="#b3b3b3"
              style={styles.input}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <ThemedText style={styles.label}>Country</ThemedText>
            <TextInput 
              value={country} 
              onChangeText={setCountry} 
              placeholder="Your country" 
              placeholderTextColor="#b3b3b3"
              style={styles.input} 
            />
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <ThemedText style={styles.saveButtonText}>Save Profile</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>
          
          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <ThemedText style={styles.preferenceText}>Notifications</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#b3b3b3" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="lock-closed-outline" size={24} color="#fff" />
              <ThemedText style={styles.preferenceText}>Privacy</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#b3b3b3" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="musical-notes-outline" size={24} color="#fff" />
              <ThemedText style={styles.preferenceText}>Playback</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#b3b3b3" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Ionicons name="download-outline" size={24} color="#fff" />
              <ThemedText style={styles.preferenceText}>Storage</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#b3b3b3" />
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { marginBottom: 100 }]}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => router.push('/(tabs)/signin' as any)}
          >
            <ThemedText style={styles.logoutText}>Log Out</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SpotifyLayout>
  );
}

const styles = StyleSheet.create({
  contentScroll: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 24,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 24,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#121212',
  },
  profileInfo: {
    justifyContent: 'flex-end',
  },
  profileLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileName: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  profileStats: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#282828',
    fontSize: 14,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#404040',
  },
  saveButton: {
    marginTop: 12,
    padding: 14,
    borderRadius: 24,
    backgroundColor: '#1DB954',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  preferenceText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    padding: 14,
    borderRadius: 24,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
