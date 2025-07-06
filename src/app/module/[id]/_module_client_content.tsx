'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Layout from '@/components/Layout'
import WeekTwoContent from '@/components/WeekTwoContent'
import WeekFourContent from '@/components/WeekFourContent'
import WeekSixContent from '@/components/WeekSixContent'
import WeekSevenContent from '@/components/WeekSevenContent'
import WeekNineContent from '@/components/WeekNineContent'
import WeekTenContent from '@/components/WeekTenContent'
import courseModules from '@/data/courseModules'

interface ModuleClientContentProps {
  module: {
    id: number
    title: string
    week: number
    type: string
    duration: string
    description: string
    status: string
  }
}

export default function ModuleClientContent({ module }: ModuleClientContentProps) {
  const router = useRouter()

  // Sample resources template for generic modules
  const getGenericModuleResources = (moduleId: number) => [
    {
      id: 1,
      title: `${getCleanTitle(module.title)} - Study Guide`,
      type: "PDF",
      description: `Comprehensive study guide covering all key concepts in ${getCleanTitle(module.title).toLowerCase()}`,
      url: "#", // Developer can replace with actual URL
      icon: "📄"
    },
    {
      id: 2,
      title: "Recommended Reading",
      type: "Article",
      description: "Curated articles and research papers related to this module's topics",
      url: "#", // Developer can replace with actual URL
      icon: "📚"
    },
    {
      id: 3,
      title: "Practice Exercises",
      type: "Worksheet",
      description: "Hands-on exercises to reinforce learning and apply concepts practically",
      url: "#", // Developer can replace with actual URL
      icon: "📝"
    },
    {
      id: 4,
      title: "Video Tutorial",
      type: "Video",
      description: "Step-by-step video walkthrough of key techniques and concepts",
      url: "#", // Developer can replace with actual URL
      icon: "🎥"
    },
    {
      id: 5,
      title: "Additional Tools",
      type: "Tools",
      description: "Recommended software, apps, and online tools for this module",
      url: "#", // Developer can replace with actual URL
      icon: "🛠️"
    }
  ]

  // Helper function to get clean title for display - UPDATED to work for all modules
  const getCleanTitle = (title: string) => {
    // Remove the "Week X - Type -" prefix from all module titles
    return title.replace(/^Week \d+ - (Physical|Online) - /, '')
  }

  // Render specific module content based on module ID
  const renderModuleContent = () => {
    switch (module.id) {
      case 2:
        return <WeekTwoContent />
      case 4:
        return <WeekFourContent />
      case 6:
        return <WeekSixContent />
      case 7:
        return <WeekSevenContent />
      case 9:
        return <WeekNineContent />
      case 10:
        return <WeekTenContent />
      default:
        // Generic module content template with resources
        const moduleResources = getGenericModuleResources(module.id)

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
                {getCleanTitle(module.title)}
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                {module.description}
              </p>
            </div>

            {/* Resources Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                  📚
                </span>
                Module Resources
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {moduleResources.map((resource) => (
                  <div
                    key={`resource-${resource.id}`}
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
                      This module shows the generic template. To add structured content (Anchoring, Context, Main Exercise, Tier, Reflection), 
                      create a new component like <code className="bg-blue-800/30 px-1 rounded">WeekXContent.tsx</code> and add it to the switch statement 
                      in <code className="bg-blue-800/30 px-1 rounded">_module_client_content.tsx</code>.
                    </p>
                  </div>
                </div>
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
  }

  return (
    <Layout>
      {renderModuleContent()}
    </Layout>
  )
}