# Audio Files Directory

## How to add audio files:

1. **Place your audio files in this directory**: `public/audio/`
2. **Supported formats**: MP3, WAV, OGG, AAC, M4A, FLAC
3. **File naming**: Use descriptive names without spaces (use hyphens or underscores)
4. **File size**: Keep files under 50MB for better loading performance

## Current audio files:

- `mindwondering-online_compressed.mp3` - Week 2 Mind Wandering exercise

## To add a new audio file:

1. Download or prepare your audio file
2. Rename it appropriately (e.g., `week-2-mind-wandering.mp3`)
3. Upload it to this `public/audio/` directory
4. Update the component to reference the new file path

## Example usage in components:

```tsx
<AudioPlayer
  src="/audio/your-audio-file.mp3"
  title="Your Audio Title"
  className="max-w-md"
/>
```

## Troubleshooting:

- If audio doesn't play, check the file format and size
- Ensure the file path starts with `/audio/` (not `public/audio/`)
- Test the direct URL: `http://localhost:3000/audio/your-file.mp3`