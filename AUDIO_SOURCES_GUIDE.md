# Audio Sources Guide

## Where to Get Songs for Your App

### Option 1: Free Sample Audio (Quick Testing)

**SoundHelix** - Free royalty-free music for testing:
```typescript
const SAMPLE_SONGS: Song[] = [
  {
    id: '1',
    title: 'Electronic Melody',
    artist: 'SoundHelix',
    album: 'Sample Collection',
    duration: '3:45',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    imageUrl: 'https://picsum.photos/200/200?random=1'
  },
  {
    id: '2',
    title: 'Ambient Waves',
    artist: 'SoundHelix',
    album: 'Sample Collection',
    duration: '4:20',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    imageUrl: 'https://picsum.photos/200/200?random=2'
  },
  // Available: SoundHelix-Song-1.mp3 through SoundHelix-Song-16.mp3
];
```

### Option 2: Spotify API Integration (Production)

#### Step 1: Get Spotify Credentials
1. Go to https://developer.spotify.com/dashboard
2. Create an app
3. Get your **Client ID** and **Client Secret**
4. Add redirect URI: `exp://localhost:8081` (for Expo)

#### Step 2: Install Spotify SDK
```bash
npm install @spotify/web-api-js
```

#### Step 3: Authenticate & Fetch Songs
```typescript
import SpotifyWebApi from '@spotify/web-api-js';

const spotify = new SpotifyWebApi();

// After authentication, fetch user's liked songs
const getLikedSongs = async () => {
  const response = await spotify.getMySavedTracks({ limit: 50 });
  return response.items.map(item => ({
    id: item.track.id,
    title: item.track.name,
    artist: item.track.artists[0].name,
    album: item.track.album.name,
    duration: formatDuration(item.track.duration_ms),
    audioUrl: item.track.preview_url, // 30-second preview
    imageUrl: item.track.album.images[0]?.url
  }));
};
```

**Note**: Spotify only provides 30-second previews via API. For full playback, you need Spotify Premium and use their SDK.

### Option 3: Host Your Own Audio Files

#### Using Firebase Storage
```bash
npm install firebase
```

```typescript
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage();
const audioRef = ref(storage, 'songs/my-song.mp3');
const audioUrl = await getDownloadURL(audioRef);
```

#### Using AWS S3
```bash
npm install @aws-sdk/client-s3
```

### Option 4: Local Assets (Bundled with App)

For small audio files, bundle them with your app:

```typescript
// Place files in assets/audio/
const DATA: Song[] = [
  {
    id: '1',
    title: 'Local Song',
    artist: 'Artist',
    album: 'Album',
    duration: '3:45',
    audioUrl: require('../../assets/audio/song1.mp3') // Local file
  }
];
```

**Pros**: Works offline, no internet needed
**Cons**: Increases app size

### Option 5: Free Music Archives

Download royalty-free music from:

1. **Free Music Archive**: https://freemusicarchive.org
   - Filter by license (CC0, CC BY)
   - Download MP3 files
   - Host on your server or cloud storage

2. **Incompetech**: https://incompetech.com/music/royalty-free/
   - Kevin MacLeod's music
   - Requires attribution

3. **YouTube Audio Library**: https://www.youtube.com/audiolibrary
   - Free music for creators
   - Download and host

4. **Bensound**: https://www.bensound.com
   - Free with attribution

### Recommended Approach for Your App

**For Development/Testing:**
```typescript
// Use SoundHelix samples (no setup required)
const DATA: Song[] = new Array(10).fill(0).map((_, i) => ({
  id: String(i + 1),
  title: `Song ${i + 1}`,
  artist: `Artist ${i + 1}`,
  album: `Album ${i + 1}`,
  duration: `${Math.floor(Math.random() * 4) + 1}:${String(Math.floor(Math.random() * 59) + 1).padStart(2, '0')}`,
  audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`,
  imageUrl: `https://picsum.photos/200/200?random=${i + 1}`
}));
```

**For Production:**
1. Set up Firebase/AWS for audio hosting
2. Create backend API to serve song metadata
3. Upload your licensed music files
4. Fetch songs from your API

### Legal Considerations

⚠️ **Important**: 
- Don't use copyrighted music without permission
- Use royalty-free or licensed music
- For commercial apps, get proper licenses
- Spotify API only provides 30-second previews
- Always check license terms before using any audio

### Quick Start (Update likedSongs.tsx)

Replace the current DATA array with varied SoundHelix songs:

```typescript
const DATA: Song[] = [
  { id: '1', title: 'Melodic Journey', artist: 'SoundHelix', album: 'Collection 1', duration: '3:45', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', title: 'Electronic Dreams', artist: 'SoundHelix', album: 'Collection 1', duration: '4:20', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '3', title: 'Ambient Flow', artist: 'SoundHelix', album: 'Collection 1', duration: '3:15', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '4', title: 'Digital Waves', artist: 'SoundHelix', album: 'Collection 2', duration: '4:05', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '5', title: 'Synth Paradise', artist: 'SoundHelix', album: 'Collection 2', duration: '3:50', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  // Add more up to Song-16.mp3
];
```

This will give you different songs to test with immediately!
