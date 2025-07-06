'use client'

import { useRouter } from 'next/navigation'

// Type definitions for the component props
interface ModuleResource {
  id: number
  title: string
  description: string
  type: string
  icon: string
  url: string
}

interface ModuleInfo {
  week: number
  type: 'physical' | 'online'
  duration: string
  title: string
  subtitle: string
}

interface ModulePageProps {
  moduleInfo: ModuleInfo
  resources: ModuleResource[]
  hasPreviousModule?: boolean
  hasNextModule?: boolean
  onPreviousModule?: () => void
  onNextModule?: () => void
  children?: React.ReactNode
}

export default function ModulePage({
  moduleInfo,
  resources,
  hasPreviousModule = false,
  hasNextModule = false,
  onPreviousModule,
  onNextModule,
  children
}: ModulePageProps) {
  const router = useRouter()

  const handleNavigation = (item: string) => {
    switch (item) {
      case 'Home':
        router.push('/')
        break
      case 'Modules':
        if (window.location.pathname === '/') {
          const modulesSection = document.getElementById('modules-section')
          if (modulesSection) {
            modulesSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        } else {
          router.push('/#modules-section')
        }
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => router.push('/')}
                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
              >
                Connected Creativity
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex items-baseline space-x-8">
              <button
                onClick={() => handleNavigation('Home')}
                className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('Modules')}
                className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Modules
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Module Information */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-purple-400">
              Week {moduleInfo.week}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              moduleInfo.type === 'online' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-green-500/20 text-green-400 border border-green-500/30'
            }`}>
              {moduleInfo.type === 'online' ? '💻 Online' : '🏢 Physical'}
            </span>
            <span className="text-sm text-gray-400">
              {moduleInfo.duration}
            </span>
          </div>
          
          {/* Title and Subtitle */}
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {moduleInfo.title}
          </h1>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            {moduleInfo.subtitle}
          </p>
        </div>

        {/* Children Content (for custom module content) */}
        {children && (
          <div className="mb-12">
            {children}
          </div>
        )}

        {/* Module Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
              📚
            </span>
            Module Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:bg-gray-800/70 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl flex-shrink-0">
                    {resource.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-300 transition-colors duration-200">
                      {resource.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-2 leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {resource.type}
                      </span>
                      <a
                        href={resource.url}
                        className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors duration-200 flex items-center space-x-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Access</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Developer Note */}
          <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="text-blue-400 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-blue-300 font-semibold text-sm mb-1">
                  Developer Note
                </h4>
                <p className="text-blue-200 text-xs leading-relaxed">
                  Deze ModulePage component is volledig herbruikbaar. Pas de <code className="bg-blue-800/30 px-1 rounded">moduleInfo</code> en 
                  <code className="bg-blue-800/30 px-1 rounded"> resources</code> props aan om verschillende module content te tonen. 
                  Gebruik de <code className="bg-blue-800/30 px-1 rounded">children</code> prop voor aangepaste module content tussen de header en resources.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onPreviousModule}
            disabled={!hasPreviousModule}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              hasPreviousModule
                ? 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous Module</span>
          </button>

          <div className="text-center">
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Back to Modules
            </button>
          </div>

          <button
            onClick={onNextModule}
            disabled={!hasNextModule}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              hasNextModule
                ? 'bg-purple-600 hover:bg-purple-700 text-white hover:scale-105'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Next Module</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}