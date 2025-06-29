'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ModuleCard from './ModuleCard'
import courseModules from '@/data/courseModules'

// Define the module type to match our data structure
interface Module {
  id: number
  title: string
  type: 'online' | 'physical'
  status: 'available' | 'locked'
  duration: string
  week: number
  description: string
}

export default function ModulesSection() {
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null)
  const router = useRouter()

  const handleModuleClick = (moduleId: number) => {
    const module = courseModules.find((m: Module) => m.id === moduleId)
    
    if (!module) {
      console.error(`Module ${moduleId} not found`)
      return
    }

    // Check if module is locked
    if (module.status === 'locked') {
      console.log(`Module ${moduleId} is locked`)
      return
    }

    console.log(`Clicking Module ${moduleId}: ${module.title}`)
    setActiveModuleId(moduleId)
    
    // Use window.location for immediate navigation
    window.location.href = `/module/${moduleId}`
  }

  return (
    <section id="modules-section" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Course Modules
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover your creative journey through our carefully curated modules, 
            each designed to develop your skills step by step.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseModules.map((module: Module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onClick={handleModuleClick}
            />
          ))}
        </div>

        {/* Active Module Indicator */}
        {activeModuleId && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-full">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-purple-300 font-medium">
                Loading Module {activeModuleId}...
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}