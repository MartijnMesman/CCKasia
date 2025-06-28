'use client'

interface StatsCardProps {
  title: string
  icon: string
  value: number
  maxValue?: number
  label: string
  unit?: string
  color?: 'purple' | 'blue' | 'green' | 'yellow' | 'red'
  className?: string
}

export default function StatsCard({ 
  title, 
  icon, 
  value, 
  maxValue = 100, 
  label, 
  unit = '',
  color = 'purple',
  className = '' 
}: StatsCardProps) {
  const percentage = Math.min((value / maxValue) * 100, 100)
  
  const colorClasses = {
    purple: {
      bg: 'bg-purple-500/20',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      progress: 'bg-purple-500',
      glow: 'shadow-purple-500/20'
    },
    blue: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/30', 
      text: 'text-blue-400',
      progress: 'bg-blue-500',
      glow: 'shadow-blue-500/20'
    },
    green: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/30',
      text: 'text-green-400', 
      progress: 'bg-green-500',
      glow: 'shadow-green-500/20'
    },
    yellow: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      progress: 'bg-yellow-500',
      glow: 'shadow-yellow-500/20'
    },
    red: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/30',
      text: 'text-red-400',
      progress: 'bg-red-500', 
      glow: 'shadow-red-500/20'
    }
  }

  const colors = colorClasses[color]

  return (
    <div className={`
      bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 
      hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-300 
      hover:scale-105 hover:shadow-lg ${colors.glow} ${className}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <div className="text-2xl">{icon}</div>
      </div>

      {/* Value Display */}
      <div className="mb-4">
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold text-white">
            {value.toLocaleString()}
          </span>
          {unit && (
            <span className="text-lg text-gray-400">{unit}</span>
          )}
        </div>
        <p className="text-sm text-gray-400 mt-1">{label}</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Voortgang</span>
          <span className={`text-xs font-medium ${colors.text}`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${colors.progress} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>0</span>
          <span>{maxValue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}