# Spotify API Integration Guide

## Overview

You can integrate Spotify API to fetch real song data. However, there are important limitations:

### ⚠️ Important Limitations

1. **30-Second Previews Only**: Spotify Web API only provides 30-second preview URLs
2. **Full Playback Requires**: Spotify Premium + Spotify SDK (not all songs have previews)
3. **Authentication Required**: Users must log in with Spotify account

## Option 1: Simple Preview Integration (Recommended for Learning)

### Step 1: Get Spotify Credentials

1. Go to https://developer.spotify.com/dashboard
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in:
   - **App Name**: "My Spotify Clone"
   - **App Description**: "Learning project"
   - **Redirect URI**: `exp://localhost:8081` (for Expo)
5. Copy your **Client ID** and **Client Secret**

### Step 2: Install Dependencies

```bash
npm install axios
npm install expo-auth-session expo-crypto
```

### Step 3: Create Spotify Service

Create `services/spotifyService.ts`:

```typescript
import axios from 'axios';
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';

const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });

const SCOPES = [
  'user-library-read',
  'user-read-recently-played',
  'playlist-read-private',
];

export class SpotifyService {
  private accessToken: string | null = null;

  // Authenticate user
  async authenticate() {
    const codeVerifier = await this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      scope: SCOPES.join(' '),
    })}`;

    const result = await AuthSession.startAsync({ authUrl });
    
    if (result.type === 'success') {
      const { code } = result.params;
      await this.exchangeCodeForToken(code, codeVerifier);
    }
  }

  // Get user's liked songs
  async getLikedSongs(limit = 50) {
    if (!this.accessToken) throw new Error('Not authenticated');

    const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: { Authorization: `Bearer ${this.accessToken}` },
      params: { limit },
    });

    return response.data.items.map((item: any) => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      duration: this.formatDuration(item.track.duration_ms),
      audioUrl: item.track.preview_url, // 30-second preview
      imageUrl: item.track.album.images[0]?.url,
    }));
  }

  // Search for tracks
  async searchTracks(query: string) {
    if (!this.accessToken) throw new Error('Not authenticated');

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${this.accessToken}` },
      params: { q: query, type: 'track', limit: 20 },
    });

    return response.data.tracks.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      duration: this.formatDuration(track.duration_ms),
      audioUrl: track.preview_url,
      imageUrl: track.album.images[0]?.url,
    }));
  }

  // Get featured playlists
  async getFeaturedPlaylists() {
    if (!this.accessToken) throw new Error('Not authenticated');

    const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: { Authorization: `Bearer ${this.accessToken}` },
      params: { limit: 10 },
    });

    return response.data.playlists.items;
  }

  private async generateCodeVerifier() {
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    return this.base64URLEncode(randomBytes);
  }

  private async generateCodeChallenge(verifier: string) {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      verifier
    );
    return this.base64URLEncode(hash);
  }

  private base64URLEncode(str: string | ArrayBuffer) {
    return btoa(String.fromCharCode(...new Uint8Array(str as ArrayBuffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async exchangeCodeForToken(code: string, verifier: string) {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: verifier,
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    this.accessToken = response.data.access_token;
  }

  private formatDuration(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

export const spotifyService = new SpotifyService();
```

### Step 4: Update likedSongs.tsx

```typescript
import { ThemedText } from '@/components/ThemedText';
import SpotifyLayout from '@/components/SpotifyLayout';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import type { Song } from '@/contexts/AudioPlayerContext';
import { spotifyService } from '@/services/spotifyService';

export default function LikedSongsScreen() {
  const { playSong, currentSong, isPlaying, setPlaylist } = useAudioPlayer();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      // Try to load Spotify songs
      const spotifySongs = await spotifyService.getLikedSongs();
      setSongs(spotifySongs);
      setPlaylist(spotifySongs);
      setAuthenticated(true);
    } catch (error) {
      console.log('Not authenticated, using demo songs');
      // Fallback to demo songs
      const demoSongs = generateDemoSongs();
      setSongs(demoSongs);
      setPlaylist(demoSongs);
    } finally {
      setLoading(false);
    }
  };

  const handleSpotifyLogin = async () => {
    try {
      await spotifyService.authenticate();
      await loadSongs();
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const generateDemoSongs = (): Song[] => {
    return new Array(20).fill(0).map((_, i) => ({
      id: String(i + 1),
      title: `Demo Song ${i + 1}`,
      artist: `Artist ${i + 1}`,
      album: `Album ${i + 1}`,
      duration: `${Math.floor(Math.random() * 4) + 1}:${String(Math.floor(Math.random() * 59) + 1).padStart(2, '0')}`,
      audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`,
      imageUrl: `https://picsum.photos/200/200?random=${i + 1}`,
    }));
  };

  if (loading) {
    return (
      <SpotifyLayout activeTab="liked">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      </SpotifyLayout>
    );
  }

  return (
    <SpotifyLayout activeTab="liked">
      {!authenticated && (
        <View style={styles.loginPrompt}>
          <ThemedText style={styles.loginText}>
            Connect to Spotify to see your real liked songs!
          </ThemedText>
          <TouchableOpacity style={styles.spotifyButton} onPress={handleSpotifyLogin}>
            <Ionicons name="logo-spotify" size={24} color="#fff" />
            <ThemedText style={styles.spotifyButtonText}>Connect Spotify</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Rest of your existing UI */}
    </SpotifyLayout>
  );
}
```

## Option 2: Full Playback with Spotify SDK (Advanced)

For full song playback (not just previews), you need:

1. **Spotify Premium Account** (required)
2. **Spotify SDK for React Native**: Use `react-native-spotify-remote`
3. **More complex setup**: Native modules, iOS/Android configuration

```bash
npm install react-native-spotify-remote
```

This requires ejecting from Expo or using a custom dev client.

## Comparison

| Feature | Web API (Previews) | Spotify SDK (Full) |
|---------|-------------------|-------------------|
| Song Length | 30 seconds | Full songs |
| Setup Complexity | Easy | Complex |
| Requires Premium | No | Yes |
| Works in Expo | Yes | Requires custom build |
| Authentication | OAuth | OAuth |

## Recommended Approach

**For Learning/Demo:**
- Use Spotify Web API for song metadata
- Use 30-second previews for playback
- Show "Preview" badge on songs
- Easy to implement, works in Expo

**For Production App:**
- Use your own audio hosting (Firebase/AWS)
- License music properly
- Or integrate full Spotify SDK with Premium requirement

## Quick Start

1. Get Spotify credentials from developer dashboard
2. Install: `npm install axios expo-auth-session expo-crypto`
3. Create the `spotifyService.ts` file
4. Update your `likedSongs.tsx` to use Spotify data
5. Add "Connect Spotify" button for authentication

Would you like me to implement the Spotify integration for you?
