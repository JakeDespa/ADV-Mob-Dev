# Audio Playback Setup Guide

## Installation Required

Before running the app, you need to install the audio playback dependency:

```bash
npm install
```

This will install `expo-av` which has been added to package.json.

## Features Implemented

### 1. Audio Player Context (`contexts/AudioPlayerContext.tsx`)
- Global audio player state management
- Play, pause, resume, stop functionality
- Next/previous track navigation
- Shuffle and repeat modes
- Playlist management
- Progress tracking

### 2. Player Bar Component (`components/PlayerBar.tsx`)
- Displays current playing song
- Play/pause button with real-time state
- Skip forward/backward buttons
- Shuffle and repeat toggles (highlighted when active)
- Progress bar showing current position
- Time display (current/total)
- Volume controls

### 3. Liked Songs Screen (`app/(tabs)/likedSongs.tsx`)
- Click any song to play it
- Visual indicator for currently playing song (green color + volume icon)
- "Play All" button to start playlist from first song
- Automatic playlist setup

## How to Use

1. **Install dependencies**: Run `npm install`
2. **Start the app**: Run `npm start`
3. **Navigate to Liked Songs**: Click on "Liked Songs" in the sidebar
4. **Play a song**: Click on any song in the list
5. **Use player controls**: 
   - Play/Pause button in the bottom player bar
   - Skip to next/previous track
   - Toggle shuffle mode (green when active)
   - Toggle repeat mode (green when active)

## Demo Audio

The app currently uses a demo audio file from SoundHelix for all songs. In production, you would:
1. Replace the `audioUrl` in the song data with actual song URLs
2. Add proper audio files to your backend/storage
3. Update the `Song` interface if you need additional metadata

## Customization

To use your own audio files:
1. Update the `DATA` array in `likedSongs.tsx` with real song data
2. Provide valid `audioUrl` for each song
3. Optionally add `imageUrl` for album art

## Architecture

- **Context Provider**: Wraps the entire app in `app/_layout.tsx`
- **Audio Engine**: Uses `expo-av` Audio API
- **State Management**: React Context + useState hooks
- **Playback Status**: Real-time updates via callback
