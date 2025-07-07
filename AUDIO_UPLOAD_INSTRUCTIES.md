# 🎵 Audio Bestanden Uploaden

## Stap 1: Upload je MP3-bestand
1. **Locatie**: Sleep je MP3-bestand naar de map `public/audio/`
2. **Bestandsnaam**: Gebruik een duidelijke naam zonder spaties
   - ✅ Goed: `mijn-oefening.mp3`, `week-2-meditatie.mp3`
   - ❌ Slecht: `Mijn Audio Bestand (1).mp3`

## Stap 2: Gebruik in je website
Na het uploaden kun je het bestand gebruiken met de AudioPlayer component:

```tsx
<AudioPlayer 
  src="/audio/jouw-bestandsnaam.mp3" 
  title="Jouw Audio Titel"
  className="max-w-md"
/>
```

## Ondersteunde Formaten
- MP3 (aanbevolen)
- WAV
- OGG
- AAC
- M4A
- FLAC

## Bestandsgrootte Tips
- Houd bestanden onder 50MB voor betere laadprestaties
- Voor spraak: 128-320 kbps MP3 werkt goed
- Voor muziek: 320 kbps of hoger

## Voorbeeld Locaties
Je kunt audio toevoegen aan verschillende modules:
- Week 2: Mind Wandering (al aanwezig)
- Week 4: Intuition
- Week 6: Inner Critic
- Week 7: Entrepreneurship
- Week 9: Technology
- Week 10: Creative Flow

## Huidige Audio
Er is al een audio-bestand aanwezig:
- `mindwondering-online_compressed.mp3` (Week 2 module)

## Problemen Oplossen
Als audio niet afspeelt:
1. Controleer of het bestand in `public/audio/` staat
2. Controleer de bestandsnaam (geen spaties)
3. Test de directe URL: `http://localhost:3000/audio/jouw-bestand.mp3`
4. Controleer browser console voor fouten