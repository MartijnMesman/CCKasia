'use client'

interface NotificationBellProps {
  count?: number
  onClick?: () => void
  className?: string
}

export default function NotificationBell({ 
  count = 0, 
  onClick,
  className = '' 
}: NotificationBellProps) {
  const hasNotifications = count > 0

  return (
    <button
      onClick={onClick}
      className={`relative p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group ${className}`}
      title={`${count} new notifications`}
    >
      {/* Bell Icon */}
      <svg 
        className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
        />
      </svg>

      {/* Notification Badge */}
      {hasNotifications && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse">
          {count > 99 ? '99+' : count}
        </div>
      )}
    </button>
  )
}