# Spotify Metadata Integration - Setup Instructions

## What This Does

✅ Fetches **real song metadata** from Spotify (titles, artists, albums, artwork)  
✅ Uses **your local audio files** for playback (not 30-second previews)  
✅ Shows demo songs when not connected to Spotify

## Setup Steps

### 1. Install Required Packages

```bash
npm install axios expo-auth-session expo-crypto
```

### 2. Get Spotify API Credentials

1. Go to https://developer.spotify.com/dashboard
2. Log in with your Spotify account
3. Click **"Create App"**
4. Fill in the form:
   - **App Name**: My Spotify Clone (or any name)
   - **App Description**: Learning project
   - **Redirect URI**: `exp://localhost:8081`
   - Check the boxes for Terms of Service
5. Click **"Save"**
6. Copy your **Client ID**

### 3. Add Your Client ID

Open `services/spotifyService.ts` and replace:

```typescript
const CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID_HERE';
```

With your actual Client ID:

```typescript
const CLIENT_ID = 'abc123def456...'; // Your Client ID from Spotify Dashboard
```

### 4. Add Your Local Audio Files

You have 3 options:

#### Option A: Use Demo Audio (Current - No Setup Needed)
The app currently uses SoundHelix demo songs. This works out of the box!

#### Option B: Add Local Audio Files (Bundled with App)

1. Create folder: `assets/audio/`
2. Add your MP3 files: `song1.mp3`, `song2.mp3`, etc.
3. Update `utils/audioMapper.ts`:

```typescript
const LOCAL_AUDIO_FILES: { [key: string]: any } = {
  'song1': require('../assets/audio/song1.mp3'),
  'song2': require('../assets/audio/song2.mp3'),
  'song3': require('../assets/audio/song3.mp3'),
  // Add more...
};
```

4. Uncomment the local file section in `audioMapper.ts`

#### Option C: Use Remote URLs (Cloud Storage)

1. Upload your audio files to Firebase Storage, AWS S3, or your server
2. Update `utils/audioMapper.ts`:

```typescript
const REMOTE_AUDIO_URLS: { [key: string]: string } = {
  // Map Spotify track IDs to your audio URLs
  'spotify_track_id_1': 'https://your-server.com/audio/song1.mp3',
  'spotify_track_id_2': 'https://your-server.com/audio/song2.mp3',
  // Or use a pattern-based approach
};
```

## How It Works

1. **Without Spotify Connection**: Shows 20 demo songs with SoundHelix audio
2. **With Spotify Connection**: 
   - Fetches your real liked songs from Spotify
   - Gets metadata: song names, artists, albums, artwork
   - Uses local/demo audio for playback (not Spotify's 30-sec previews)

## Usage

1. Run the app: `npm start`
2. Navigate to **Liked Songs**
3. You'll see a banner: **"Connect to Spotify"**
4. Click **"Connect"** button
5. Log in with your Spotify account
6. Your real liked songs will appear with correct metadata!
7. Audio plays from your local files or demo URLs

## Features

✅ Real song metadata from Spotify  
✅ Album artwork from Spotify  
✅ Full-length audio playback (not limited to 30 seconds)  
✅ Fallback to demo songs if not authenticated  
✅ Loading states and error handling  
✅ Clean UI with connection banner

## Troubleshooting

### "Authentication Failed"
- Check your Client ID is correct
- Make sure redirect URI is exactly: `exp://localhost:8081`
- Check you're connected to the internet

### "No songs showing"
- Make sure you have liked songs in your Spotify account
- Check browser console for errors
- Try disconnecting and reconnecting

### TypeScript Errors in spotifyService.ts
These are expected if packages aren't installed yet. They'll disappear after running:
```bash
npm install axios expo-auth-session expo-crypto
```

## File Structure

```
services/
  └── spotifyService.ts          # Spotify API integration
utils/
  └── audioMapper.ts             # Maps Spotify metadata to local audio
app/(tabs)/
  └── likedSongs.tsx             # Updated to use Spotify data
```

## Next Steps

1. Install packages
2. Add your Spotify Client ID
3. Test with demo audio first
4. Add your own audio files later
5. Optionally: Add more Spotify features (search, playlists, etc.)

## Optional Enhancements

Want to add more Spotify features? You can:
- Search for songs: `spotifyService.searchTracks('query')`
- Get top tracks: `spotifyService.getTopTracks()`
- Get recently played: `spotifyService.getRecentlyPlayed()`

All methods are already implemented in `spotifyService.ts`!
