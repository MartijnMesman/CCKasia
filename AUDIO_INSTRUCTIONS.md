# 🎵 Adding Audio Files to Your Project

## Current Setup
The project already has an audio file integrated in the Main Exercise section of Week 2:
- **File**: `public/audio/mindwondering-online (2).mp3`
- **Component**: `AudioPlayer` in `WeekTwoContent.tsx`

## Adding New Audio Files

### Step 1: Add Audio File to Public Directory
1. Place your audio file in the `public/audio/` directory
2. Supported formats: MP3, WAV, OGG, AAC, M4A, FLAC

### Step 2: Update Component
Replace the `src` prop in the AudioPlayer component:

```tsx
<AudioPlayer
  src="/audio/your-new-audio-file.mp3"
  title="Your Audio Title"
  className="max-w-md"
/>
```

### Step 3: Multiple Audio Files
You can add multiple AudioPlayer components:

```tsx
{/* First audio */}
<AudioPlayer
  src="/audio/introduction.mp3"
  title="Introduction to Body Awareness"
  className="max-w-md mb-4"
/>

{/* Second audio */}
<AudioPlayer
  src="/audio/guided-exercise.mp3"
  title="Guided Movement Exercise"
  className="max-w-md"
/>
```

## AudioPlayer Component Features

### Props
- `src` (required): Path to audio file
- `title` (optional): Display title
- `className` (optional): CSS styling classes

### Built-in Features
- ✅ Play/pause controls
- ✅ Progress bar with click-to-seek
- ✅ Time display (current/total)
- ✅ Loading states
- ✅ Professional styling
- ✅ Responsive design

### Example Usage in Other Modules
```tsx
// In any module component
import AudioPlayer from '@/components/AudioPlayer'

// Inside your component JSX
<AudioPlayer
  src="/audio/module-3-exercise.mp3"
  title="Visual Perception Exercise"
  className="w-full max-w-lg"
/>
```

## File Organization
```
public/
  audio/
    ├── mindwondering-online (2).mp3  (current file)
    ├── module-1-intro.mp3            (example)
    ├── module-3-exercise.mp3         (example)
    └── guided-meditation.wav         (example)
```

## Tips
1. **File Naming**: Use descriptive names without spaces (use hyphens or underscores)
2. **File Size**: Keep files under 50MB for better loading performance
3. **Quality**: 128-320 kbps MP3 files work well for voice content
4. **Testing**: Always test audio playback after adding new files

## Current Integration
The audio is currently integrated in the Main Exercise section with:
- Setup instructions for users
- Usage tips and guidance
- Professional audio player interface
- Developer notes for easy modification