'use client'

interface PointsDisplayProps {
  points?: number
  streak?: number
  className?: string
}

export default function PointsDisplay({ 
  points = 0, 
  streak = 0, 
  className = '' 
}: PointsDisplayProps) {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Points Display */}
      <div className="flex items-center space-x-2">
        <div className="text-yellow-400">
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <span className="text-white font-semibold text-sm">
          {points.toLocaleString()}
        </span>
      </div>

      {/* Streak Display */}
      <div className="flex items-center space-x-2">
        <div className="text-orange-400">
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
          </svg>
        </div>
        <span className="text-white font-semibold text-sm">
          {streak}
        </span>
      </div>
    </div>
  )
}