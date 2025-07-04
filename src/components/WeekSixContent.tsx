'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import sessionComponents from '@/data/sessionComponents'
import { useModuleProgress } from '@/hooks/useModuleProgress'
import AudioPlayer from './AudioPlayer'
import courseModules from '@/data/courseModules'

export default function WeekSixContent() {
  const router = useRouter()
  const { completeModule, isModuleCompleted } = useModuleProgress()
  const [completedComponents, setCompletedComponents] = useState<number[]>([])
  
  const moduleInfo = {
    id: 6,
    title: "Inner Critic",
    week: 6,
    type: "online",
    duration: "2.5 hours",
    description: "Understanding and working with your inner critic to enhance rather than hinder creativity"
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

  const goToPreviousModule = () => {
    const prevModule = courseModules.find(m => m.id < moduleInfo.id && m.status === 'available')
    if (prevModule) {
      router.push(`/module/${prevModule.id}`)
    } else {
      router.push('/')
    }
  }

  const goToNextModule = () => {
    const nextModule = courseModules.find(m => m.id > moduleInfo.id && m.status === 'available')
    if (nextModule) {
      router.push(`/module/${nextModule.id}`)
    } else {
      router.push('/')
    }
  }

  const hasPreviousModule = courseModules.some(m => m.id < moduleInfo.id && m.status === 'available')
  const hasNextModule = courseModules.some(m => m.id > moduleInfo.id && m.status === 'available')

  const moduleResources = [
    {
      id: 1,
      title: "Understanding Your Inner Critic",
      type: "Article",
      description: "Psychological insights into the origins and functions of self-critical thoughts",
      url: "#",
      icon: "🧠"
    },
    {
      id: 2,
      title: "Transforming Self-Criticism into Self-Compassion",
      type: "Guide",
      description: "Practical techniques for developing a kinder internal dialogue",
      url: "#",
      icon: "💝"
    },
    {
      id: 3,
      title: "The Creative Benefits of Constructive Self-Reflection",
      type: "Research",
      description: "How healthy self-evaluation can improve creative output and satisfaction",
      url: "#",
      icon: "📊"
    },
    {
      id: 4,
      title: "Inner Critic Dialogue Worksheets",
      type: "Worksheet",
      description: "Structured exercises for identifying and reframing critical inner voices",
      url: "#",
      icon: "📝"
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
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
            💻 Online
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
          const isAnchoring = component.title === "Anchoring"
          const isContext = component.title === "Context"
          const isTier = component.title === "Tier"
          const isReflection = component.title === "Reflection"
          
          return (
            <div 
              key={`component-${component.id}`}
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

              {/* Anchoring Content */}
              {isAnchoring && (
                <div className="ml-10 mt-6">
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <span className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center mr-2">
                        🛡️
                      </span>
                      Inner Critic Preparation:
                    </h4>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <ul className="space-y-2 text-green-200 text-sm">
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Create a safe, private space where you can explore difficult thoughts without judgment</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Have tissues and water nearby—this work can bring up emotions</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Set aside 2.5 hours when you won't be interrupted or rushed</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Approach with self-compassion—you're learning to be kinder to yourself</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Remember: the goal is understanding, not eliminating your inner critic</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Context Content */}
              {isContext && (
                <div className="ml-10 mt-6">
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-blue-300 font-bold text-xl mb-4">Befriending Your Inner Critic</h3>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        We've all heard that voice—the one that whispers (or shouts) that our work isn't good enough, 
                        that we're not talented enough, that we should give up before we embarrass ourselves. 
                        Most creative advice tells us to "silence" or "ignore" this inner critic.
                      </p>
                      
                      <p className="text-blue-100 mb-6 leading-relaxed font-medium">
                        But what if that's exactly the wrong approach? What if your inner critic isn't your enemy, 
                        but a misguided ally trying to protect you?
                      </p>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">The Protective Function</h4>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        Your inner critic developed for a reason. Often, it's trying to protect you from:
                      </p>

                      <ul className="text-blue-100 mb-6 space-y-2 ml-4">
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Rejection and criticism:</strong> "If I criticize myself first, others can't hurt me"</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Failure and disappointment:</strong> "If I don't try too hard, I can't fail too badly"</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Standing out:</strong> "If I stay small, I'll stay safe"</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Imperfection:</strong> "If I can't do it perfectly, I shouldn't do it at all"</span>
                        </li>
                      </ul>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">The Creative Cost</h4>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        While your inner critic means well, its protective strategies often backfire in creative work:
                      </p>

                      <ul className="text-blue-100 mb-6 space-y-2 ml-4">
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Perfectionism leads to paralysis and procrastination</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Self-censorship kills spontaneity and authentic expression</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Constant self-judgment drains creative energy and joy</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Fear of failure prevents the experimentation essential for growth</span>
                        </li>
                      </ul>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">A New Relationship</h4>
                      
                      <p className="text-blue-100 font-medium leading-relaxed">
                        Instead of fighting your inner critic, today we'll learn to understand it, appreciate its intentions, 
                        and gently redirect its energy toward constructive self-reflection. You'll discover how to transform 
                        harsh self-criticism into compassionate self-awareness that actually enhances your creative work.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Exercise with Audio */}
              {isMainExercise && (
                <div className="ml-10 mt-6">
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2 flex items-center">
                      <span className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center mr-2">
                        🗣️
                      </span>
                      Inner Critic Dialogue Exercise
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      This guided exercise will help you identify, understand, and transform your relationship 
                      with your inner critic through compassionate dialogue and reframing techniques.
                    </p>
                  </div>
                  
                  <AudioPlayer
                    src="/audio/inner-critic-dialogue.mp3"
                    title="Inner Critic Dialogue Exercise"
                    className="max-w-md"
                  />
                  
                  <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-400 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-blue-300 font-semibold text-sm mb-1">
                          Exercise Guidelines
                        </h5>
                        <ul className="text-blue-200 text-xs leading-relaxed space-y-1">
                          <li>• Write down critical thoughts as they arise—don't judge them</li>
                          <li>• Practice speaking to yourself as you would a good friend</li>
                          <li>• Notice the difference between constructive feedback and harsh criticism</li>
                          <li>• Be patient—changing internal dialogue takes time and practice</li>
                          <li>• Remember that self-compassion is a strength, not weakness</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tier Content */}
              {isTier && (
                <div className="ml-10 mt-6">
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6">
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-orange-300 font-bold text-xl mb-6">Choose Your Inner Critic Work Level</h3>
                      
                      <div className="mb-8 p-5 bg-green-800/20 border border-green-500/30 rounded-lg">
                        <h4 className="text-green-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🌱</span>
                          Gentle Observer
                        </h4>
                        
                        <p className="text-green-100 mb-4 leading-relaxed">
                          If inner critic work feels overwhelming or you're new to self-compassion:
                        </p>

                        <ul className="text-green-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Simply notice when your inner critic speaks—no need to change anything yet</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Practice one self-compassionate phrase: "This is a moment of struggle"</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Try the "friend test"—would you speak to a friend the way you speak to yourself?</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>End each creative session with one thing you appreciate about your effort</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-8 p-5 bg-blue-800/20 border border-blue-500/30 rounded-lg">
                        <h4 className="text-blue-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🔄</span>
                          Active Transformer
                        </h4>
                        
                        <p className="text-blue-100 mb-4 leading-relaxed">
                          Complete the guided exercise and practice reframing critical thoughts for one week.
                        </p>

                        <ul className="text-blue-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Keep an inner critic journal—track patterns and triggers</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Practice the "reframe technique" from the exercise daily</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Create a personal self-compassion toolkit of phrases and practices</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-6 p-5 bg-purple-800/20 border border-purple-500/30 rounded-lg">
                        <h4 className="text-purple-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🌟</span>
                          Compassion Cultivator
                        </h4>
                        
                        <p className="text-purple-100 mb-4 leading-relaxed">
                          Develop a comprehensive self-compassion practice that supports your creative work:
                        </p>

                        <ul className="text-purple-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Create a "wise mentor" voice to counter your inner critic</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Develop rituals for handling creative setbacks with kindness</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Practice "failure parties"—celebrating attempts and learning from mistakes</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Help others develop self-compassion in their creative practice</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reflection Content */}
              {isReflection && (
                <div className="ml-10 mt-6">
                  <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-6">
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-indigo-300 font-bold text-xl mb-6 flex items-center">
                        <span className="text-2xl mr-3">💝</span>
                        Self-Compassion Reflection
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="p-4 bg-indigo-800/20 border border-indigo-400/30 rounded-lg">
                          <h4 className="text-indigo-200 font-semibold text-lg mb-4">
                            Reflect on your relationship with your inner critic:
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>What did I discover about my inner critic's intentions?</strong> Consider what it's trying to protect you from and how it developed.
                              </p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>How does self-criticism affect my creative energy and output?</strong> Notice the physical and emotional impact of harsh self-judgment.
                              </p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>What would change if I treated myself with the same kindness I show others?</strong> Imagine how this shift might transform your creative practice.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-indigo-800/30 border border-indigo-400/20 rounded-lg">
                          <h4 className="text-indigo-200 font-semibold text-lg mb-3 flex items-center">
                            <span className="w-6 h-6 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-2">
                              🌱
                            </span>
                            Building Self-Compassion
                          </h4>
                          
                          <p className="text-indigo-100 text-sm leading-relaxed mb-3">
                            Self-compassion is a practice, not a destination. Consider these ways to continue developing this crucial creative skill:
                          </p>
                          
                          <ul className="text-indigo-100 text-sm space-y-2 ml-4">
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Create a daily self-compassion check-in ritual</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Develop a collection of self-compassionate phrases for difficult moments</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Practice the "self-compassion break" when facing creative challenges</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Share your journey with others who are also learning to be kinder to themselves</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-indigo-800/10 border border-indigo-400/20 rounded-lg">
                          <h5 className="text-indigo-300 font-semibold text-sm mb-2 flex items-center">
                            <span className="w-5 h-5 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-2">
                              🤗
                            </span>
                            A Gentle Reminder
                          </h5>
                          <p className="text-indigo-200 text-sm leading-relaxed">
                            Remember that developing self-compassion is itself a creative act—you're literally creating a new relationship 
                            with yourself. Be patient with this process. Every moment of kindness toward yourself is a victory worth celebrating, 
                            and every step toward self-compassion makes space for more authentic, joyful creative expression.
                          </p>
                        </div>
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

      {/* Module Navigation */}
      <div className="mt-12 flex justify-between items-center">
        <button
          onClick={goToPreviousModule}
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
          onClick={goToNextModule}
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

      {/* Session Summary */}
      <div className="mt-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">
          Session Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {sessionComponents.map((component) => {
            const isCompleted = completedComponents.includes(component.id)
            return (
              <div key={`summary-${component.id}`} className="text-center">
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