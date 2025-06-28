'use client'

import { useState } from 'react'

interface AchievementCardProps {
  achievement: {
    id: number
    icon: string
    title: string
    description: string
    isUnlocked: boolean
    requirement?: string
    points?: number
  }
  className?: string
}

export default function AchievementCard({ achievement, className = '' }: AchievementCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const { icon, title, description, isUnlocked, requirement, points } = achievement

  return (
    <div 
      className={`
        relative bg-gray-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 cursor-pointer
        ${isUnlocked 
          ? 'border-yellow-500/50 hover:border-yellow-400/70 hover:bg-yellow-500/5 hover:scale-105' 
          : 'border-gray-700/50 hover:border-gray-600/70 opacity-60'
        }
        ${className}
      `}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Achievement Icon */}
      <div className="text-center mb-4">
        <div className={`
          text-4xl mb-2 transition-all duration-300
          ${isUnlocked ? 'filter-none' : 'grayscale'}
        `}>
          {icon}
        </div>
        
        {/* Lock Overlay for Locked Achievements */}
        {!isUnlocked && (
          <div className="absolute top-4 right-4 text-gray-500">
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        )}
      </div>

      {/* Achievement Title */}
      <h3 className={`
        text-lg font-semibold text-center mb-2 transition-colors duration-300
        ${isUnlocked ? 'text-white' : 'text-gray-400'}
      `}>
        {title}
      </h3>

      {/* Achievement Description */}
      <p className={`
        text-sm text-center leading-relaxed transition-colors duration-300
        ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}
      `}>
        {description}
      </p>

      {/* Points Badge */}
      {points && isUnlocked && (
        <div className="flex justify-center mt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {points} punten
          </span>
        </div>
      )}

      {/* Status Indicator */}
      <div className="flex justify-center mt-4">
        <div className={`
          w-2 h-2 rounded-full transition-all duration-300
          ${isUnlocked ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-gray-600'}
        `} />
      </div>

      {/* Hover Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-gray-900 text-white text-sm rounded-xl opacity-100 transition-all duration-300 pointer-events-none z-20 shadow-xl min-w-max max-w-xs">
          <div className="text-center">
            <div className={`font-semibold mb-1 ${isUnlocked ? 'text-yellow-300' : 'text-gray-300'}`}>
              {isUnlocked ? '🏆 Behaald!' : '🔒 Vergrendeld'}
            </div>
            
            {isUnlocked ? (
              <div className="text-xs text-gray-300">
                Je hebt deze prestatie succesvol behaald!
                {points && (
                  <div className="mt-1 text-yellow-400">
                    +{points} punten verdiend
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-gray-400">
                {requirement || 'Vereisten nog niet voldaan'}
              </div>
            )}
          </div>
          
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}

      {/* Unlock Animation Effect */}
      {isUnlocked && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/0 via-yellow-400/5 to-yellow-500/0 pointer-events-none" />
      )}
    </div>
  )
}