import axios from 'axios';
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import * as WebBrowser from 'expo-web-browser';

// Complete authentication session when returning from browser
WebBrowser.maybeCompleteAuthSession();

// TODO: Replace with your Spotify Client ID from https://developer.spotify.com/dashboard
const CLIENT_ID = '7d4fd38cdaa24476938d34991034d2b7';

// For Spotify, we need to use a custom URI scheme
// Add this EXACT URI to your Spotify Dashboard: myapp://redirect
const REDIRECT_URI = 'myapp://redirect';

// Alternative: Use a publicly accessible URL (easier for testing)
// Uncomment this and use: https://example.com/callback
// const REDIRECT_URI = 'https://example.com/callback';

// Log the redirect URI for debugging
console.log('Spotify Redirect URI:', REDIRECT_URI);

const SCOPES = [
  'user-library-read',
  'user-read-recently-played',
  'playlist-read-private',
  'user-top-read',
];

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  duration_ms: number;
}

export class SpotifyService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private codeVerifier: string | null = null;

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  // Authenticate user with Spotify
  async authenticate(): Promise<boolean> {
    try {
      console.log('Starting Spotify authentication...');
      console.log('Redirect URI:', REDIRECT_URI);
      
      this.codeVerifier = await this.generateCodeVerifier();
      const codeChallenge = await this.generateCodeChallenge(this.codeVerifier);

      const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        scope: SCOPES.join(' '),
      })}`;

      console.log('Opening auth URL...');
      const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);

      console.log('Auth result:', result);

      if (result.type === 'success' && result.url) {
        const url = new URL(result.url);
        const code = url.searchParams.get('code');
        
        if (code) {
          console.log('Got authorization code, exchanging for token...');
          await this.exchangeCodeForToken(code);
          console.log('Authentication successful!');
          return true;
        }
      }

      console.log('Authentication failed or cancelled');
      return false;
    } catch (error) {
      console.error('Spotify authentication error:', error);
      return false;
    }
  }

  // Get user's liked/saved tracks
  async getLikedTracks(limit = 50): Promise<SpotifyTrack[]> {
    if (!this.accessToken) throw new Error('Not authenticated');

    try {
      const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        params: { limit },
      });

      return response.data.items.map((item: any) => item.track);
    } catch (error) {
      console.error('Error fetching liked tracks:', error);
      throw error;
    }
  }

  // Search for tracks
  async searchTracks(query: string, limit = 20): Promise<SpotifyTrack[]> {
    if (!this.accessToken) throw new Error('Not authenticated');

    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        params: { q: query, type: 'track', limit },
      });

      return response.data.tracks.items;
    } catch (error) {
      console.error('Error searching tracks:', error);
      throw error;
    }
  }

  // Get user's top tracks
  async getTopTracks(limit = 20): Promise<SpotifyTrack[]> {
    if (!this.accessToken) throw new Error('Not authenticated');

    try {
      const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        params: { limit, time_range: 'medium_term' },
      });

      return response.data.items;
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      throw error;
    }
  }

  // Get recently played tracks
  async getRecentlyPlayed(limit = 20): Promise<SpotifyTrack[]> {
    if (!this.accessToken) throw new Error('Not authenticated');

    try {
      const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        params: { limit },
      });

      return response.data.items.map((item: any) => item.track);
    } catch (error) {
      console.error('Error fetching recently played:', error);
      throw error;
    }
  }

  // Format duration from milliseconds to MM:SS
  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Logout
  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.codeVerifier = null;
  }

  // Private helper methods
  private async generateCodeVerifier(): Promise<string> {
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    return this.base64URLEncode(randomBytes.buffer);
  }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      verifier
    );
    return this.base64URLEncode(hash);
  }

  private base64URLEncode(input: any): string {
    let bytes: Uint8Array;
    
    if (typeof input === 'string') {
      // Convert string to Uint8Array
      const encoder = new TextEncoder();
      bytes = encoder.encode(input);
    } else {
      // Handle ArrayBuffer, ArrayBufferLike, or Uint8Array
      bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
    }
    
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  private async exchangeCodeForToken(code: string): Promise<void> {
    if (!this.codeVerifier) throw new Error('Code verifier not found');

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          code_verifier: this.codeVerifier,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }
}

export const spotifyService = new SpotifyService();
