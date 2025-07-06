'use client'

import ModulePage from '@/components/ModulePage'

// Voorbeeld data voor demonstratie
const exampleModuleInfo = {
  week: 1,
  type: 'physical' as const,
  duration: '2 hours',
  title: 'Introduction + Curiosity',
  subtitle: 'Introduction to connected creativity and developing curiosity as a foundation for creative exploration'
}

const exampleResources = [
  {
    id: 1,
    title: 'Creative Foundations Guide',
    description: 'A comprehensive guide to understanding the fundamentals of creative thinking and practice',
    type: 'PDF',
    icon: '📄',
    url: '#'
  },
  {
    id: 2,
    title: 'Curiosity in Design',
    description: 'Research article exploring how curiosity drives innovation in creative fields',
    type: 'Article',
    icon: '📚',
    url: '#'
  },
  {
    id: 3,
    title: 'Introduction Workshop Video',
    description: 'Video walkthrough of the key concepts and exercises for this module',
    type: 'Video',
    icon: '🎥',
    url: '#'
  },
  {
    id: 4,
    title: 'Reflection Worksheet',
    description: 'Structured exercises to help you reflect on your creative journey and goals',
    type: 'Worksheet',
    icon: '📝',
    url: '#'
  }
]

export default function ExampleModulePage() {
  const handlePreviousModule = () => {
    console.log('Navigate to previous module')
  }

  const handleNextModule = () => {
    console.log('Navigate to next module')
  }

  return (
    <ModulePage
      moduleInfo={exampleModuleInfo}
      resources={exampleResources}
      hasPreviousModule={false}
      hasNextModule={true}
      onPreviousModule={handlePreviousModule}
      onNextModule={handleNextModule}
    >
      {/* Aangepaste module content kan hier worden toegevoegd */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Module Content</h3>
        <p className="text-gray-300 leading-relaxed">
          Dit is een voorbeeld van aangepaste content die tussen de module informatie en resources kan worden geplaatst. 
          Hier kunnen specifieke oefeningen, instructies, of andere module-specifieke elementen worden toegevoegd.
        </p>
      </div>
    </ModulePage>
  )
}