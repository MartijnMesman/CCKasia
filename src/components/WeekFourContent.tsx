'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import sessionComponents from '@/data/sessionComponents'
import { useModuleProgress } from '@/hooks/useModuleProgress'
import AudioPlayer from './AudioPlayer'
import courseModules from '@/data/courseModules'

export default function WeekFourContent() {
  const router = useRouter()
  const { completeModule, isModuleCompleted } = useModuleProgress()
  const [completedComponents, setCompletedComponents] = useState<number[]>([])
  
  const moduleInfo = {
    id: 4,
    title: "Intuition",
    week: 4,
    type: "online",
    duration: "3 hours",
    description: "Developing and trusting your creative intuition as a guide for artistic decisions"
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

  // Navigation functions
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
      title: "The Science of Intuition",
      type: "Research",
      description: "Scientific studies on how intuitive decision-making works in creative processes",
      url: "#",
      icon: "🧠"
    },
    {
      id: 2,
      title: "Trusting Your Creative Voice",
      type: "Article",
      description: "Practical strategies for developing confidence in your creative instincts",
      url: "#",
      icon: "📄"
    },
    {
      id: 3,
      title: "Intuition vs Analysis in Design",
      type: "Video",
      description: "Understanding when to trust gut feelings versus analytical thinking",
      url: "#",
      icon: "🎥"
    },
    {
      id: 4,
      title: "Creative Decision Making Framework",
      type: "Tool",
      description: "A structured approach to balancing intuition with practical considerations",
      url: "#",
      icon: "🛠️"
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

              {/* Anchoring Content */}
              {isAnchoring && (
                <div className="ml-10 mt-6">
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <span className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center mr-2">
                        🧘
                      </span>
                      Intuition Preparation:
                    </h4>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <ul className="space-y-2 text-green-200 text-sm">
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Find a quiet, comfortable space where you won't be interrupted</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Have a journal or notebook ready for capturing insights</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Set aside 45 minutes for the complete intuition exploration</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Approach with openness - there are no wrong answers in intuitive work</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Trust your first instincts - they often contain valuable wisdom</span>
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
                      <h3 className="text-blue-300 font-bold text-xl mb-4">The Power of Creative Intuition</h3>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        In our data-driven world, we're often taught to distrust our gut feelings. We're told to rely on metrics, 
                        research, and logical analysis. But what if this approach is limiting our creative potential?
                      </p>
                      
                      <p className="text-blue-100 mb-6 leading-relaxed font-medium">
                        Creative intuition isn't mystical—it's your brain's sophisticated pattern recognition system working 
                        at lightning speed, drawing from years of experience, observation, and subconscious processing.
                      </p>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">What Science Tells Us</h4>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        Neuroscientists have discovered that intuitive decisions often engage the same brain regions involved 
                        in emotional processing and memory consolidation. When you have a "gut feeling" about a creative direction, 
                        your brain is rapidly processing thousands of subtle cues and past experiences.
                      </p>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        Research shows that creative professionals who learn to trust their intuition while maintaining 
                        analytical skills produce more innovative and emotionally resonant work. The key is knowing when 
                        to use each approach.
                      </p>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">The Intuition-Analysis Balance</h4>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        The most successful creatives don't choose between intuition and analysis—they integrate both:
                      </p>

                      <ul className="text-blue-100 mb-6 space-y-2 ml-4">
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Initial Direction:</strong> Use intuition to sense promising creative paths</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Development:</strong> Apply analytical thinking to refine and execute ideas</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Evaluation:</strong> Return to intuition to assess emotional impact and authenticity</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Final Decisions:</strong> Trust your gut when logic reaches its limits</span>
                        </li>
                      </ul>

                      <p className="text-blue-100 font-medium leading-relaxed">
                        Today's session will help you develop this crucial creative skill—learning to hear, trust, 
                        and act on your creative intuition while maintaining the analytical skills that support your work.
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
                        🎯
                      </span>
                      Intuitive Decision Making Exercise
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      This guided exercise will help you practice accessing and trusting your creative intuition 
                      through a series of decision-making scenarios and reflection prompts.
                    </p>
                  </div>
                  
                  <AudioPlayer
                    src="/audio/intuition-exercise.mp3"
                    title="Intuitive Decision Making Exercise"
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
                          Exercise Instructions
                        </h5>
                        <ul className="text-blue-200 text-xs leading-relaxed space-y-1">
                          <li>• Have your journal ready to capture insights and decisions</li>
                          <li>• Trust your first instincts—don't overthink the scenarios</li>
                          <li>• Notice physical sensations that accompany different choices</li>
                          <li>• Pay attention to which decisions feel energizing vs. draining</li>
                          <li>• Practice distinguishing between fear and genuine intuitive guidance</li>
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
                      <h3 className="text-orange-300 font-bold text-xl mb-6">Choose Your Intuition Development Path</h3>
                      
                      <div className="mb-8 p-5 bg-green-800/20 border border-green-500/30 rounded-lg">
                        <h4 className="text-green-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🌱</span>
                          Gentle Explorer
                        </h4>
                        
                        <p className="text-green-100 mb-4 leading-relaxed">
                          If trusting intuition feels challenging or unfamiliar:
                        </p>

                        <ul className="text-green-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Start with low-stakes decisions: which route to take home, what to have for lunch</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Notice your body's responses to different options—tension, ease, excitement</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Keep a simple intuition journal: decision, gut feeling, outcome</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Practice the "first thought" technique—what's your immediate response before analysis kicks in?</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-8 p-5 bg-blue-800/20 border border-blue-500/30 rounded-lg">
                        <h4 className="text-blue-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🎯</span>
                          Balanced Practitioner
                        </h4>
                        
                        <p className="text-blue-100 mb-4 leading-relaxed">
                          Complete the guided exercise and apply intuitive decision-making to one creative project this week.
                        </p>

                        <ul className="text-blue-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Choose a current creative project where you feel stuck or uncertain</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Use the exercise techniques to explore different directions</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Document both your intuitive insights and analytical considerations</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-6 p-5 bg-purple-800/20 border border-purple-500/30 rounded-lg">
                        <h4 className="text-purple-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🚀</span>
                          Advanced Integrator
                        </h4>
                        
                        <p className="text-purple-100 mb-4 leading-relaxed">
                          Develop a personal intuition-analysis integration system:
                        </p>

                        <ul className="text-purple-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Create a decision-making framework that honors both intuitive and analytical input</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Practice "intuitive prototyping"—quickly creating based on gut feelings, then analyzing</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Experiment with different states of consciousness for accessing intuition (meditation, movement, nature)</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Teach someone else about balancing intuition and analysis in creative work</span>
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
                        <span className="text-2xl mr-3">🤔</span>
                        Intuition Integration Reflection
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="p-4 bg-indigo-800/20 border border-indigo-400/30 rounded-lg">
                          <h4 className="text-indigo-200 font-semibold text-lg mb-4">
                            Reflect on your intuitive decision-making experience:
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>What did my body tell me about different creative choices?</strong> Notice physical sensations, energy levels, and emotional responses.
                              </p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>When did my intuition conflict with logical analysis?</strong> Explore these moments of tension and what they revealed.
                              </p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>How can I create more space for intuitive input in my creative process?</strong> Consider practical changes to your workflow and environment.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-indigo-800/30 border border-indigo-400/20 rounded-lg">
                          <h4 className="text-indigo-200 font-semibold text-lg mb-3 flex items-center">
                            <span className="w-6 h-6 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-2">
                              🎯
                            </span>
                            Integration Practice
                          </h4>
                          
                          <p className="text-indigo-100 text-sm leading-relaxed mb-3">
                            Your intuition is a skill that strengthens with practice. Consider these ongoing development strategies:
                          </p>
                          
                          <ul className="text-indigo-100 text-sm space-y-2 ml-4">
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Set aside time for "intuitive sketching" or brainstorming without judgment</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Practice the "24-hour rule" for important creative decisions</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Create a personal "intuition toolkit" of practices that help you access inner wisdom</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Share your insights with other creatives to build a supportive community</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-indigo-800/10 border border-indigo-400/20 rounded-lg">
                          <h5 className="text-indigo-300 font-semibold text-sm mb-2 flex items-center">
                            <span className="w-5 h-5 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-2">
                              💫
                            </span>
                            Moving Forward
                          </h5>
                          <p className="text-indigo-200 text-sm leading-relaxed">
                            Remember that developing creative intuition is a lifelong journey. Be patient with yourself as you learn 
                            to distinguish between fear-based reactions and genuine intuitive guidance. Trust the process, and allow 
                            your unique creative voice to emerge through this deeper self-awareness.
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