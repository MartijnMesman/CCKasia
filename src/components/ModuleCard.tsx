'use client'

interface ModuleCardProps {
  module: {
    id: number
    title: string
    type: 'online' | 'physical'
    status: 'available' | 'locked'
    duration: string
    week: number
    description: string
  }
  onClick: (moduleId: number) => void
}

export default function ModuleCard({ module, onClick }: ModuleCardProps) {
  const isLocked = module.status === 'locked'
  const isOnline = module.type === 'online'

  const handleClick = () => {
    console.log(`ModuleCard clicked: ${module.id}, locked: ${isLocked}`)
    if (!isLocked) {
      onClick(module.id)
    }
  }

  // Helper function to get clean title for display
  const getCleanTitle = (title: string, moduleId: number) => {
    // Remove the "Week X - Type -" prefix from all module titles
    const cleanTitle = title.replace(/^Week \d+ - (Physical|Online) - /, '')
    return cleanTitle
  }

  return (
    <div
      onClick={handleClick}
      className={`
        relative bg-gray-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 group
        ${isLocked 
          ? 'border-gray-700/50 cursor-not-allowed opacity-60' 
          : 'border-gray-700/50 hover:border-purple-500/50 cursor-pointer hover:bg-gray-800/70 hover:scale-105'
        }
      `}
    >
      {/* Week Number & Lock Icon */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-purple-400">
          Week {module.week}
        </span>
        {isLocked && (
          <div className="text-gray-500">
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

      {/* Title - Now using clean title */}
      <h3 className={`text-xl font-semibold mb-3 ${isLocked ? 'text-gray-400' : 'text-white'}`}>
        {getCleanTitle(module.title, module.id)}
      </h3>

      {/* Description */}
      <p className={`text-sm mb-4 leading-relaxed ${isLocked ? 'text-gray-500' : 'text-gray-300'}`}>
        {module.description}
      </p>

      {/* Badge & Duration */}
      <div className="flex items-center justify-between">
        <span 
          className={`
            inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
            ${isOnline 
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
              : 'bg-green-500/20 text-green-400 border border-green-500/30'
            }
            ${isLocked ? 'opacity-60' : ''}
          `}
        >
          {isOnline ? '💻 Online' : '🏢 Physical'}
        </span>
        
        <span className={`text-xs ${isLocked ? 'text-gray-500' : 'text-gray-400'}`}>
          {module.duration}
        </span>
      </div>

      {/* Click Indicator for Available Modules */}
      {!isLocked && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}

      {/* Hover Effect Overlay */}
      {!isLocked && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 hover:from-purple-500/5 hover:to-pink-500/5 transition-all duration-300 pointer-events-none" />
      )}

      {/* Debug indicator */}
      {!isLocked && (
        <div className="absolute bottom-2 left-2 text-xs text-purple-400 opacity-50">
          Click to open
        </div>
      )}
    </div>
  )
}