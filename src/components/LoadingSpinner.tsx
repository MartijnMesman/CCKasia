'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  centered?: boolean
}

export default function LoadingSpinner({ 
  size = 'md', 
  className = '',
  centered = true 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  const spinnerSize = sizeClasses[size]

  const spinner = (
    <div className={`${spinnerSize} relative ${className}`}>
      {/* Outer Ring */}
      <div className={`${spinnerSize} rounded-full border-2 border-gray-700`} />
      
      {/* Animated Gradient Ring */}
      <div 
        className={`
          ${spinnerSize} rounded-full border-2 border-transparent 
          bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600
          absolute top-0 left-0 animate-spin
        `}
        style={{
          background: 'conic-gradient(from 0deg, transparent, #a855f7, #ec4899, #a855f7, transparent)',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))'
        }}
      />
      
      {/* Inner Glow Effect */}
      <div 
        className={`
          ${spinnerSize} rounded-full absolute top-0 left-0
          bg-gradient-to-r from-purple-400/20 to-pink-400/20 
          animate-pulse
        `}
      />
    </div>
  )

  if (centered) {
    return (
      <div className="flex items-center justify-center">
        {spinner}
      </div>
    )
  }

  return spinner
}