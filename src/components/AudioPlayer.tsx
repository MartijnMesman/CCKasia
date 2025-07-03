'use client'

import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
  src: string
  title?: string
  className?: string
}

export default function AudioPlayer({ src, title, className = '' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [audioSrc, setAudioSrc] = useState<string>('')
  const audioRef = useRef<HTMLAudioElement>(null)

  // Convert Dropbox share URL to direct download URL
  const convertDropboxUrl = (url: string): string => {
    if (url.includes('dropbox.com') && url.includes('dl=0')) {
      return url.replace('dl=0', 'dl=1')
    }
    if (url.includes('dropbox.com') && !url.includes('dl=')) {
      return url + (url.includes('?') ? '&dl=1' : '?dl=1')
    }
    return url
  }

  // Fallback URLs in order of preference
  const getAudioSources = (originalSrc: string): string[] => {
    const sources = []
    
    // 1. Local file (highest priority)
    if (originalSrc.includes('body-awareness-exercise')) {
      sources.push('/audio/body-awareness-exercise.mp3')
    }
    
    // 2. Converted Dropbox URL
    sources.push(convertDropboxUrl(originalSrc))
    
    // 3. Alternative Dropbox format
    if (originalSrc.includes('dropbox.com')) {
      const fileId = originalSrc.match(/\/fi\/([^\/]+)\//)?.[1]
      if (fileId) {
        sources.push(`https://dl.dropboxusercontent.com/s/${fileId}/body-awareness-exercise.mp3`)
      }
    }
    
    return sources
  }

  useEffect(() => {
    const sources = getAudioSources(src)
    let currentSourceIndex = 0
    
    const tryNextSource = () => {
      if (currentSourceIndex < sources.length) {
        const currentSrc = sources[currentSourceIndex]
        console.log(`Trying audio source ${currentSourceIndex + 1}:`, currentSrc)
        setAudioSrc(currentSrc)
        setError(null)
        setIsLoading(true)
        currentSourceIndex++
      } else {
        setError('Alle audio bronnen gefaald. Probeer de download optie hieronder.')
        setIsLoading(false)
      }
    }

    // Start with first source
    tryNextSource()

    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
      setError(null)
      console.log('Audio loaded successfully:', audioSrc)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handleError = (e: Event) => {
      console.error('Audio error:', e, 'Source:', audioSrc)
      setIsLoading(false)
      // Try next source
      setTimeout(tryNextSource, 100)
    }

    const handleLoadedData = () => {
      setIsLoading(false)
      console.log('Audio data loaded:', audioSrc)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadeddata', handleLoadedData)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [src])

  // Update audio src when audioSrc changes
  useEffect(() => {
    const audio = audioRef.current
    if (audio && audioSrc) {
      audio.src = audioSrc
      audio.load()
    }
  }, [audioSrc])

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio || isLoading || error) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        // For mobile browsers, ensure user interaction
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          await playPromise
          setIsPlaying(true)
        }
      }
    } catch (err) {
      console.error('Playback error:', err)
      setError('Playback gefaald. Probeer opnieuw of gebruik de download optie.')
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || isLoading || error) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const progressWidth = rect.width
    const clickRatio = clickX / progressWidth
    const newTime = clickRatio * duration

    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00'
    
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  // Download function for fallback
  const handleDownload = () => {
    const downloadUrl = convertDropboxUrl(src)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = 'body-awareness-exercise.mp3'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 ${className}`}>
      <audio 
        ref={audioRef} 
        preload="metadata"
        crossOrigin="anonymous"
        playsInline
      />
      
      {/* Title */}
      {title && (
        <div className="mb-4">
          <h3 className="text-white font-medium text-sm truncate">{title}</h3>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="text-red-400 flex-shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-red-300 font-semibold text-sm mb-1">Audio Playback Probleem</h4>
              <p className="text-red-200 text-xs mb-2">{error}</p>
              <button
                onClick={handleDownload}
                className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded border border-red-500/30 transition-colors duration-200"
              >
                📥 Download Audio Bestand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          disabled={isLoading || !!error}
          className="flex items-center justify-center w-10 h-10 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full transition-colors duration-200"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : error ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          ) : isPlaying ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Progress Bar */}
        <div className="flex-1 flex items-center space-x-3">
          <span className="text-xs text-gray-400 font-mono min-w-[35px]">
            {formatTime(currentTime)}
          </span>
          
          <div 
            className="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div className="relative h-full">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all duration-150"
                style={{ width: `${progressPercentage}%` }}
              />
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ left: `calc(${progressPercentage}% - 6px)` }}
              />
            </div>
          </div>
          
          <span className="text-xs text-gray-400 font-mono min-w-[35px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="flex items-center justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors duration-200"
          title="Download audio bestand"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-gray-500">
          <div>Current source: {audioSrc}</div>
          <div>Ready state: {audioRef.current?.readyState}</div>
          <div>Network state: {audioRef.current?.networkState}</div>
        </div>
      )}
    </div>
  )
}