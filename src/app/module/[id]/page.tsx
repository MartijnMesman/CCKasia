'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import WeekTwoContent from '@/components/WeekTwoContent'
import courseModules from '@/data/courseModules'

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const [module, setModule] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const moduleId = parseInt(params.id as string)
    const foundModule = courseModules.find(m => m.id === moduleId)
    
    if (!foundModule) {
      // Module not found, redirect to home
      router.push('/')
      return
    }

    if (foundModule.status === 'locked') {
      // Module is locked, redirect back with message
      router.push('/?error=module-locked')
      return
    }

    setModule(foundModule)
    setIsLoading(false)
  }, [params.id, router])

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-300">Loading module...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!module) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">Module Not Found</h1>
          <p className="text-gray-300 mb-8">The requested module could not be found.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </Layout>
    )
  }

  // For now, we'll show the WeekTwoContent for module 2, and a generic template for others
  const renderModuleContent = () => {
    if (module.id === 2) {
      return <WeekTwoContent />
    }

    // Generic module content template
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Module Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-purple-400">
              Week {module.week}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              module.type === 'online' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-green-500/20 text-green-400 border border-green-500/30'
            }`}>
              {module.type === 'online' ? '💻 Online' : '🏢 Physical'}
            </span>
            <span className="text-sm text-gray-400">
              {module.duration}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {module.title}
          </h1>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            {module.description}
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-purple-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Module Content Coming Soon
          </h2>
          
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We're currently developing the interactive content for this module. 
            Check back soon for engaging exercises, resources, and learning materials.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Back to Modules
            </button>
            
            <button
              onClick={() => {
                // Navigate to next available module
                const nextModule = courseModules.find(m => m.id > module.id && m.status === 'available')
                if (nextModule) {
                  router.push(`/module/${nextModule.id}`)
                } else {
                  router.push('/')
                }
              }}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Next Module
            </button>
          </div>
        </div>

        {/* Module Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={() => {
              const prevModule = courseModules.find(m => m.id < module.id && m.status === 'available')
              if (prevModule) {
                router.push(`/module/${prevModule.id}`)
              }
            }}
            disabled={!courseModules.find(m => m.id < module.id && m.status === 'available')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous Module</span>
          </button>

          <button
            onClick={() => {
              const nextModule = courseModules.find(m => m.id > module.id && m.status === 'available')
              if (nextModule) {
                router.push(`/module/${nextModule.id}`)
              }
            }}
            disabled={!courseModules.find(m => m.id > module.id && m.status === 'available')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          >
            <span>Next Module</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      {renderModuleContent()}
    </Layout>
  )
}