'use client'

import { useState } from 'react'
import sessionComponents from '@/data/sessionComponents'
import { useModuleProgress } from '@/hooks/useModuleProgress'

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
      <div className="space-y-6">
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
              
              <p className={`leading-relaxed ml-10 ${isCompleted ? 'text-gray-400' : 'text-gray-300'}`}>
                {component.description}
              </p>
            </div>
          )
        })}
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