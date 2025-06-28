'use client'

import { useState } from 'react'
import ModuleCard from './ModuleCard'
import courseModules from '@/data/courseModules'

export default function ModulesSection() {
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null)

  const handleModuleClick = (moduleId: number) => {
    setActiveModuleId(moduleId)
    console.log(`Module ${moduleId} clicked`)
    // Add navigation logic here
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Cursus Modules
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ontdek je creatieve reis door onze zorgvuldig samengestelde modules, 
            elk ontworpen om je vaardigheden stap voor stap te ontwikkelen.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseModules.map((module) => (
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
                Module {activeModuleId} geselecteerd
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}