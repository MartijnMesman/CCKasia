'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import sessionComponents from '@/data/sessionComponents'
import { useModuleProgress } from '@/hooks/useModuleProgress'
import AudioPlayer from './AudioPlayer'
import courseModules from '@/data/courseModules'

export default function WeekTwoContent() {
  const router = useRouter()
  const { completeModule, isModuleCompleted } = useModuleProgress()
  const [completedComponents, setCompletedComponents] = useState<number[]>([])
  
  const moduleInfo = {
    id: 2,
    title: "Mind Wandering", // Clean title without prefix
    week: 2,
    type: "online",
    duration: "1.5 hours",
    description: "Exploring the connection between mind wandering and creative expression through guided exercises"
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
      // If no next available module, go back to home
      router.push('/')
    }
  }

  // Check if navigation buttons should be enabled
  const hasPreviousModule = courseModules.some(m => m.id < moduleInfo.id && m.status === 'available')
  const hasNextModule = courseModules.some(m => m.id > moduleInfo.id && m.status === 'available')

  // Sample resources for this module
  const moduleResources = [
    {
      id: 1,
      title: "How to Build Creative Confidence",
      type: "Article",
      description: "Wired article exploring daydreaming, play, and creative confidence building techniques",
      url: "https://www.wired.com/2013/10/how-to-build-creative-confidence-daydream-play-video-games-and-more/",
      icon: "📄"
    },
    {
      id: 2,
      title: "Should We Embrace Boredom?",
      type: "Article",
      description: "The Guardian explores the creative benefits of boredom and mental downtime",
      url: "https://www.theguardian.com/books/2025/jun/15/the-big-idea-should-we-embrace-boredom",
      icon: "📚"
    },
    {
      id: 3,
      title: "In Praise of Mindless Time",
      type: "Article",
      description: "Discover Magazine article on the importance of unstructured thinking for creativity",
      url: "https://www.discovermagazine.com/the-sciences/in-praise-of-mindless-time",
      icon: "🎥"
    },
    {
      id: 4,
      title: "Creativity, Mind Wandering & the Default Mode Network",
      type: "Research",
      description: "Scientific exploration of how mind wandering and brain networks influence creative thinking",
      url: "https://thomasramsoy.com/index.php/2024/08/26/creativity-mind-wandering-and-the-default-mode-network-of-the-brain/",
      icon: "📝"
    },
    {
      id: 5,
      title: "The Wandering Mind Book",
      type: "Book",
      description: "Amazon listing for 'The Wandering Mind' - exploring what the brain does when you're not looking",
      url: "https://www.amazon.com/Wandering-Mind-Brain-Youre-Looking/dp/022623861X",
      icon: "📖"
    },
    {
      id: 6,
      title: "The Power of Outrospection TEDx Talk",
      type: "Video",
      description: "TEDx presentation on looking outward to find happiness and enhance creativity",
      url: "https://www.youtube.com/watch?v=9O_orVpDlZo&ab_channel=TEDxTalks",
      icon: "🎬"
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

              {/* Preparation Checklist for Anchoring */}
              {isAnchoring && (
                <div className="ml-10 mt-6">
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <span className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center mr-2">
                        ✅
                      </span>
                      Your preparation checklist:
                    </h4>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <ul className="space-y-2 text-green-200 text-sm">
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Find a natural setting (park, garden, beach, or even a tree-lined street)</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Set aside 20 uninterrupted minutes</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>After reading the instructions and downloading the audio we recommend switching your phone to airplane mode</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Bring headphones</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Approach with curiosity, not expectations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Mind Wandering Revolution Content for Context */}
              {isContext && (
                <div className="ml-10 mt-6">
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-blue-300 font-bold text-xl mb-4">The Mind-Wandering Revolution</h3>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        For too long, we've been told that wandering minds are unproductive minds. Our hustle culture demands constant focus, endless optimization, and perpetual "grinding." But here's what the science actually shows:
                      </p>
                      
                      <p className="text-blue-100 mb-6 leading-relaxed font-medium">
                        Mind-wandering isn't a bug—it's a feature. When your attention drifts, your brain doesn't shut down. Instead, it shifts into a different mode of operation that's essential for creative thinking.
                      </p>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">What Research Reveals</h4>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        Psychologists now understand that boredom functions like hunger—it's your brain signaling that it needs deeper, more meaningful engagement. When we're constantly plugged in and task-focused, we starve this essential cognitive process.
                      </p>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        During spontaneous mind-wandering, your brain activates what neuroscientists call the Default Mode Network (DMN)—a collection of brain regions that light up when you're not focused on specific tasks. This isn't downtime; it's when your brain:
                      </p>

                      <ul className="text-blue-100 mb-6 space-y-2 ml-4">
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Processes complex, big-picture ideas</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Makes unexpected connections between seemingly unrelated concepts</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Integrates experiences into creative insights</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Generates novel solutions to persistent problems</span>
                        </li>
                      </ul>

                      <p className="text-blue-100 mb-6 leading-relaxed">
                        A major study tracking over 1,300 participants found that people who frequently engage in spontaneous mind-wandering score significantly higher on creative thinking assessments.
                      </p>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">The Creative Breakthrough Pattern</h4>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        Many of history's most innovative ideas emerged during moments of mental drift:
                      </p>

                      <ul className="text-blue-100 mb-6 space-y-2 ml-4">
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Business innovations often strike during walks, showers, or commutes</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Artistic breakthroughs frequently come when creators step away from their work</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Scientific discoveries regularly happen during periods of "relaxed attention"</span>
                        </li>
                      </ul>

                      <p className="text-blue-100 font-medium leading-relaxed">
                        The pattern is clear: when we give our minds permission to wander, creativity follows.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Audio Player for Main Exercise - UPDATED WITH LOCAL FILE */}
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
                    src="/audio/body-awareness-exercise.mp3"
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

                  {/* Updated Developer Note for Local Audio */}
                  <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="text-green-400 flex-shrink-0">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h6 className="text-green-300 font-semibold text-xs mb-1">
                          Audio Source Updated for Mobile Compatibility
                        </h6>
                        <p className="text-green-200 text-xs leading-relaxed">
                          Audio now hosted locally at <code className="bg-green-800/30 px-1 rounded">/public/audio/body-awareness-exercise.mp3</code>. 
                          This ensures reliable playback across all devices, especially mobile browsers that have issues with external audio sources.
                          Download the original file from Dropbox and place it in the public/audio directory.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tier Differentiations */}
              {isTier && (
                <div className="ml-10 mt-6">
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6">
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-orange-300 font-bold text-xl mb-6">Choose Your Learning Path</h3>
                      
                      {/* Gentle Entry Level */}
                      <div className="mb-8 p-5 bg-green-800/20 border border-green-500/30 rounded-lg">
                        <h4 className="text-green-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🌿</span>
                          Gentle Entry Level
                        </h4>
                        
                        <p className="text-green-100 mb-4 leading-relaxed">
                          If you couldn't complete the full guided exercise, or if it felt overwhelming:
                        </p>

                        <ul className="text-green-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Set up your alarm on the phone for 4 minutes and simply sit in your chosen natural space without any audio.</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Let your eyes rest on something natural (trees, sky, water) without trying to focus</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>When thoughts come, just notice them like watching traffic pass by</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>If you feel restless or distracted, that's completely normal—just stay curious about what your mind wants to do</span>
                          </li>
                        </ul>
                      </div>

                      {/* Starter Level */}
                      <div className="mb-8 p-5 bg-blue-800/20 border border-blue-500/30 rounded-lg">
                        <h4 className="text-blue-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🌱</span>
                          Starter Level
                        </h4>
                        
                        <p className="text-blue-100 leading-relaxed">
                          Complete the guided exercise once and continue to the "what did you take forward" part.
                        </p>
                      </div>

                      {/* Deep Dive Level */}
                      <div className="mb-6 p-5 bg-purple-800/20 border border-purple-500/30 rounded-lg">
                        <h4 className="text-purple-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🌳</span>
                          Deep Dive Level
                        </h4>
                        
                        <p className="text-purple-100 mb-4 leading-relaxed">
                          Over the next 2 days, become a detective of your own mind-wandering:
                        </p>

                        <ul className="text-purple-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Notice when your attention naturally drifts throughout the day</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Log these moments: Where were you? What triggered the wandering? How did you return to focus?</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Pay special attention to any creative ideas or insights that emerge during or shortly after these wandering periods</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Track patterns: When does your most productive mind-wandering happen?</span>
                          </li>
                        </ul>
                      </div>

                      {/* Additional Context Section */}
                      <div className="mt-6 p-4 bg-orange-800/20 border border-orange-400/30 rounded-lg">
                        <h5 className="text-orange-300 font-semibold text-sm mb-2 flex items-center">
                          <span className="w-5 h-5 bg-orange-500/20 rounded-lg flex items-center justify-center mr-2">
                            💡
                          </span>
                          Additional Context
                        </h5>
                        <p className="text-orange-200 text-sm leading-relaxed">
                          Each tier is designed to meet you where you are in your creative journey. There's no "right" level—choose what feels most supportive and challenging for your current state. You can always return and try a different tier as your practice develops.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reflection Questions */}
              {isReflection && (
                <div className="ml-10 mt-6">
                  <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-lg p-6">
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-indigo-300 font-bold text-xl mb-6 flex items-center">
                        <span className="text-2xl mr-3">🤔</span>
                        Reflection Questions
                      </h3>
                      
                      <div className="space-y-6">
                        {/* Core Reflection Questions */}
                        <div className="p-4 bg-indigo-800/20 border border-indigo-400/30 rounded-lg">
                          <h4 className="text-indigo-200 font-semibold text-lg mb-4">
                            Take a moment to reflect on your experience:
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>What did I discover about my mental patterns today?</strong> Notice the rhythm and flow of your thoughts during the exercise.
                              </p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>When my mind wandered, what wanted to emerge?</strong> Pay attention to the themes, images, or ideas that surfaced naturally.
                              </p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>How might I create more space for this natural creative process?</strong> Consider practical ways to integrate mind-wandering into your daily routine.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Continue Your Learning Section */}
                        <div className="p-4 bg-indigo-800/30 border border-indigo-400/20 rounded-lg">
                          <h4 className="text-indigo-200 font-semibold text-lg mb-3 flex items-center">
                            <span className="w-6 h-6 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-2">
                              📚
                            </span>
                            Continue Your Learning
                          </h4>
                          
                          <p className="text-indigo-100 text-sm leading-relaxed mb-3">
                            Your mind-wandering journey doesn't end here. Consider these ways to deepen your practice:
                          </p>
                          
                          <ul className="text-indigo-100 text-sm space-y-2 ml-4">
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Schedule regular "boredom breaks" in your daily routine</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Keep a mind-wandering journal to track insights and patterns</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Explore the module resources for deeper scientific understanding</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Share your discoveries with fellow learners in the community</span>
                            </li>
                          </ul>
                        </div>

                        {/* Personal Integration */}
                        <div className="p-4 bg-indigo-800/10 border border-indigo-400/20 rounded-lg">
                          <h5 className="text-indigo-300 font-semibold text-sm mb-2 flex items-center">
                            <span className="w-5 h-5 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-2">
                              💭
                            </span>
                            Personal Integration
                          </h5>
                          <p className="text-indigo-200 text-sm leading-relaxed">
                            Remember that mind-wandering is a deeply personal experience. Your patterns, insights, and creative breakthroughs will be unique to you. Trust the process and be patient with yourself as you develop this essential creative skill.
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
                The resource URLs now contain actual links to relevant content about creativity, mind wandering, and boredom. 
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

      {/* Module Navigation - NEW SECTION */}
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