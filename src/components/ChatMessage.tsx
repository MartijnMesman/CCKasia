'use client'

interface ChatMessageProps {
  message: {
    id: number
    text: string
    isUser: boolean
    timestamp: Date
  }
  className?: string
}

export default function ChatMessage({ message, className = '' }: ChatMessageProps) {
  const { text, isUser, timestamp } = message

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${className}`}>
      <div className={`flex items-end space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-purple-500' 
            : 'bg-gradient-to-r from-blue-500 to-indigo-500'
        }`}>
          {isUser ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ) : (
            <span className="text-white text-xs font-bold">AI</span>
          )}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col">
          <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-purple-500 text-white rounded-br-md'
              : 'bg-gray-700 text-gray-100 rounded-bl-md'
          }`}>
            {text}
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-gray-500 mt-1 px-1 ${
            isUser ? 'text-right' : 'text-left'
          }`}>
            {formatTime(timestamp)}
          </div>
        </div>
      </div>
    </div>
  )
}