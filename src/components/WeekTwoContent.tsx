'use client'

import { useState } from 'react'
import sessionComponents from '@/data/sessionComponents'
import { useModuleProgress } from '@/hooks/useModuleProgress'
import AudioPlayer from './AudioPlayer'

export default function WeekTwoContent() {
  const { completeModule, isModuleCompleted } = useModuleProgress()
  const [completedComponents, setCompletedComponents] = useState<number[]>([])
  
  const moduleInfo = {
    id: 2,
    title: "Body Awareness & Movement",
    week: 2,
    type: "physical",
    duration: "1.5 hours",
    description: "Exploring the connection between physical awareness and creative expression. This module focuses on understanding how our body influences our creative process and how movement can unlock new forms of artistic expression."
  }

  const isModuleComplete = isModuleCompleted(moduleInfo.id)
  const allComponentsCompleted = completedComponents.length === sessionComponents.length

  const toggleComponentCompletion = (componentId: number) => {
    setCompletedComponents(prev => 
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    )
  }

  const handleCompleteModule = () => {
    completeModule(moduleInfo.id)
  }

  // Sample resources for this module
  const moduleResources = [
    {
      id: 1,
      title: "Body Awareness Meditation Guide",
      type: "PDF",
      description: "A comprehensive guide to body awareness meditation techniques for creative practice",
      url: "#", // Developer can replace with actual URL
      icon: "📄"
    },
    {
      id: 2,
      title: "Movement & Creativity Research Paper",
      type: "Article",
      description: "Scientific research on the connection between physical movement and creative thinking",
      url: "#", // Developer can replace with actual URL
      icon: "📚"
    },
    {
      id: 3,
      title: "Guided Movement Exercise Video",
      type: "Video",
      description: "15-minute guided movement session designed to enhance creative flow",
      url: "#", // Developer can replace with actual URL
      icon: "🎥"
    },
    {
      id: 4,
      title: "Body-Mind Connection Worksheet",
      type: "Worksheet",
      description: "Reflective exercises to explore your personal body-mind creative connections",
      url: "#", // Developer can replace with actual URL
      icon: "📝"
    },
    {
      id: 5,
      title: "Recommended Reading List",
      type: "List",
      description: "Curated books and articles about embodied creativity and somatic practices",
      url: "#", // Developer can replace with actual URL
      icon: "📖"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Module Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-medium text-purple-400">
            Week {moduleInfo.week}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            🏢 {moduleInfo.type}
          </span>
          <span className="text-sm text-gray-400">
            {moduleInfo.duration}
          </span>
          {isModuleComplete && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
              ✅ Completed
            </span>
          )}
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {moduleInfo.title}
        </h1>
        
        <p className="text-lg text-gray-300 leading-relaxed">
          {moduleInfo.description}
        </p>
      </div>

      {/* Session Components */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Session Components
          </h2>
          <div className="text-sm text-gray-400">
            {completedComponents.length} of {sessionComponents.length} completed
          </div>
        </div>
        
        {sessionComponents.map((component, index) => {
          const isCompleted = completedComponents.includes(component.id)
          const isMainExercise = component.title === "Main Exercise"
          
          return (
            <div 
              key={component.id}
              className={`bg-gray-800 rounded-lg p-6 border transition-all duration-300 ${
                isCompleted 
                  ? 'border-purple-500/50 bg-purple-500/5' 
                  : 'border-gray-700/50 hover:border-purple-500/30'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleComponentCompletion(component.id)}
                    className={`flex items-center justify-center w-6 h-6 rounded border-2 transition-all duration-200 ${
                      isCompleted
                        ? 'bg-purple-500 border-purple-500 text-white'
                        : 'border-gray-500 hover:border-purple-400'
                    }`}
                  >
                    {isCompleted && (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                    isCompleted 
                      ? 'bg-purple-500/30 text-purple-300' 
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className={`text-xl font-semibold ${isCompleted ? 'text-purple-300' : 'text-white'}`}>
                    {component.title}
                  </h3>
                </div>
                <span className="text-sm font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                  {component.duration}
                </span>
              </div>
              
              <p className={`leading-relaxed ml-10 mb-4 ${isCompleted ? 'text-gray-400' : 'text-gray-300'}`}>
                {component.description}
              </p>

              {/* Audio Player for Main Exercise */}
              {isMainExercise && (
                <div className="ml-10 mt-6">
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2 flex items-center">
                      <span className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center mr-2">
                        🎵
                      </span>
                      Guided Exercise Audio
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Listen to this guided audio while performing the main exercise. The audio will help you 
                      connect with your body awareness and enhance your creative flow through mindful movement.
                    </p>
                  </div>
                  
                  <AudioPlayer
                    src="/audio/mindwondering-online (2).mp3"
                    title="Body Awareness & Movement Exercise"
                    className="max-w-md"
                  />
                  
                  {/* Audio Instructions */}
                  <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-400 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-blue-300 font-semibold text-sm mb-1">
                          Audio Instructions
                        </h5>
                        <ul className="text-blue-200 text-xs leading-relaxed space-y-1">
                          <li>• Find a comfortable, quiet space where you can move freely</li>
                          <li>• Use headphones for the best experience</li>
                          <li>• Follow along with the guided movements</li>
                          <li>• Pause anytime if you need to rest or reflect</li>
                          <li>• The exercise is designed to be repeated multiple times</li>
                          <li>• Focus on the connection between your body and creative mind</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Developer Note for Audio */}
                  <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="text-yellow-400 flex-shrink-0">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h6 className="text-yellow-300 font-semibold text-xs mb-1">
                          Developer Note
                        </h6>
                        <p className="text-yellow-200 text-xs leading-relaxed">
                          Currently using <code className="bg-yellow-800/30 px-1 rounded">/audio/mindwondering-online (2).mp3</code>. 
                          You can replace this with any audio file by placing it in the <code className="bg-yellow-800/30 px-1 rounded">public/audio/</code> directory 
                          and updating the <code className="bg-yellow-800/30 px-1 rounded">src</code> prop of the AudioPlayer component.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Resources Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
            📚
          </span>
          Module Resources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleResources.map((resource) => (
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
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
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
                The resource URLs are currently set to "#" placeholders. Replace these with actual links to your content. 
                You can easily add, remove, or modify resources by editing the <code className="bg-blue-800/30 px-1 rounded">moduleResources</code> array in this component.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Module Button */}
      <div className="mt-12 text-center">
        <button
          onClick={handleCompleteModule}
          disabled={isModuleComplete}
          className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
            isModuleComplete
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : allComponentsCompleted
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-105'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isModuleComplete ? '✅ Module Completed' : 'Mark as Complete'}
        </button>
        
        {!allComponentsCompleted && !isModuleComplete && (
          <p className="text-sm text-gray-500 mt-2">
            Complete all components to finish the module
          </p>
        )}
      </div>

      {/* Session Summary */}
      <div className="mt-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">
          Session Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {sessionComponents.map((component) => {
            const isCompleted = completedComponents.includes(component.id)
            return (
              <div key={component.id} className="text-center">
                <div className={`text-sm font-medium mb-1 ${
                  isCompleted ? 'text-purple-300' : 'text-purple-400'
                }`}>
                  {isCompleted && '✓ '}{component.title}
                </div>
                <div className="text-xs text-gray-400">
                  {component.duration}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700/50 text-center">
          <span className="text-sm text-gray-400">
            Total session duration: {moduleInfo.duration}
          </span>
        </div>
      </div>
    </div>
  )
}