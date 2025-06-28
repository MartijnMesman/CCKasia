'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import sessionComponents from '@/data/sessionComponents'
import { useModuleProgress } from '@/hooks/useModuleProgress'
import AudioPlayer from './AudioPlayer'
import courseModules from '@/data/courseModules'

export default function WeekSevenContent() {
  const router = useRouter()
  const { completeModule, isModuleCompleted } = useModuleProgress()
  const [completedComponents, setCompletedComponents] = useState<number[]>([])
  
  const moduleInfo = {
    id: 7,
    title: "Entrepreneurship",
    week: 7,
    type: "online",
    duration: "3.5 hours",
    description: "Exploring the entrepreneurial mindset and turning creative ideas into viable projects"
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
      title: "Creative Entrepreneurship Fundamentals",
      type: "Guide",
      description: "Essential principles for building a sustainable creative business",
      url: "#",
      icon: "🚀"
    },
    {
      id: 2,
      title: "From Idea to Market: Validation Strategies",
      type: "Worksheet",
      description: "Step-by-step process for testing and refining your creative concepts",
      url: "#",
      icon: "📊"
    },
    {
      id: 3,
      title: "Building Your Creative Brand",
      type: "Video",
      description: "Strategies for developing an authentic and compelling creative identity",
      url: "#",
      icon: "🎨"
    },
    {
      id: 4,
      title: "Funding Your Creative Vision",
      type: "Resource",
      description: "Overview of funding options for creative projects and businesses",
      url: "#",
      icon: "💰"
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
                        🎯
                      </span>
                      Entrepreneurial Mindset Preparation:
                    </h4>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <ul className="space-y-2 text-green-200 text-sm">
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Gather any creative projects or ideas you've been considering developing</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Have a notebook ready for business planning and idea development</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Set aside 3.5 hours for deep strategic thinking and planning</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Approach with an open mind—entrepreneurship is about creative problem-solving</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Remember: every successful business started with someone taking the first step</span>
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
                      <h3 className="text-blue-300 font-bold text-xl mb-4">The Creative Entrepreneur Revolution</h3>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        We're living in the most exciting time in history to be a creative entrepreneur. 
                        The barriers that once separated artists from business success have largely disappeared. 
                        Technology has democratized access to markets, tools, and audiences.
                      </p>
                      
                      <p className="text-blue-100 mb-6 leading-relaxed font-medium">
                        But here's what many miss: entrepreneurship isn't about abandoning your creativity—it's about 
                        amplifying it. The most successful creative entrepreneurs don't choose between art and business; 
                        they use business as a vehicle for greater creative impact.
                      </p>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">The Myth of the Starving Artist</h4>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        The "starving artist" narrative isn't romantic—it's limiting. This outdated story suggests that:
                      </p>

                      <ul className="text-blue-100 mb-6 space-y-2 ml-4">
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Financial success corrupts artistic integrity</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Business skills are somehow incompatible with creativity</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Artists should focus only on their craft and let others handle the "business stuff"</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>Struggling financially is a necessary part of the creative journey</span>
                        </li>
                      </ul>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">The New Creative Economy</h4>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        Today's creative entrepreneurs understand that business skills enhance rather than diminish their creative work:
                      </p>

                      <ul className="text-blue-100 mb-6 space-y-2 ml-4">
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Financial freedom</strong> provides time and resources for creative exploration</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Market understanding</strong> helps create work that truly serves and impacts people</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Business systems</strong> free up mental energy for creative work</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Entrepreneurial thinking</strong> is itself a creative practice</span>
                        </li>
                      </ul>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">Your Creative Advantage</h4>
                      
                      <p className="text-blue-100 font-medium leading-relaxed">
                        As a creative person, you already possess many entrepreneurial superpowers: problem-solving, 
                        innovation, adaptability, and the ability to see possibilities others miss. Today's session 
                        will help you recognize these strengths and learn to apply them strategically to build 
                        something meaningful and sustainable around your creative work.
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
                        💡
                      </span>
                      Creative Business Development Workshop
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      This comprehensive workshop will guide you through developing a viable business concept 
                      around your creative work, from initial idea validation to basic business planning.
                    </p>
                  </div>
                  
                  <AudioPlayer
                    src="/audio/entrepreneurship-workshop.mp3"
                    title="Creative Business Development Workshop"
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
                          Workshop Components
                        </h5>
                        <ul className="text-blue-200 text-xs leading-relaxed space-y-1">
                          <li>• Idea validation and market research techniques</li>
                          <li>• Business model canvas for creative ventures</li>
                          <li>• Pricing strategies for creative work</li>
                          <li>• Building your minimum viable product (MVP)</li>
                          <li>• Creating sustainable revenue streams</li>
                          <li>• Balancing creativity with business requirements</li>
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
                      <h3 className="text-orange-300 font-bold text-xl mb-6">Choose Your Entrepreneurial Journey</h3>
                      
                      <div className="mb-8 p-5 bg-green-800/20 border border-green-500/30 rounded-lg">
                        <h4 className="text-green-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🌱</span>
                          Creative Explorer
                        </h4>
                        
                        <p className="text-green-100 mb-4 leading-relaxed">
                          If entrepreneurship feels overwhelming or you're just starting to consider it:
                        </p>

                        <ul className="text-green-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Start by documenting one creative skill or service you could potentially offer</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Research 3 people who have built businesses around similar creative work</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Practice talking about your creative work in terms of the value it provides</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Join one online community of creative entrepreneurs for inspiration</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-8 p-5 bg-blue-800/20 border border-blue-500/30 rounded-lg">
                        <h4 className="text-blue-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🚀</span>
                          Business Builder
                        </h4>
                        
                        <p className="text-blue-100 mb-4 leading-relaxed">
                          Complete the workshop and develop a basic business plan for one creative venture.
                        </p>

                        <ul className="text-blue-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Choose one creative project or skill to develop into a business concept</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Complete a business model canvas using the workshop template</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Conduct basic market research and validate your idea with 5 potential customers</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Create a simple pricing strategy and revenue projection</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-6 p-5 bg-purple-800/20 border border-purple-500/30 rounded-lg">
                        <h4 className="text-purple-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🏆</span>
                          Venture Launcher
                        </h4>
                        
                        <p className="text-purple-100 mb-4 leading-relaxed">
                          Take concrete steps toward launching your creative business:
                        </p>

                        <ul className="text-purple-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Create and test a minimum viable product (MVP) within 30 days</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Set up basic business infrastructure (website, social media, payment systems)</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Develop a 90-day launch plan with specific milestones and metrics</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Build a network of mentors, collaborators, and potential customers</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Document your journey to help other creative entrepreneurs</span>
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
                        <span className="text-2xl mr-3">💼</span>
                        Entrepreneurial Vision Reflection
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="p-4 bg-indigo-800/20 border border-indigo-400/30 rounded-lg">
                          <h4 className="text-indigo-200 font-semibold text-lg mb-4">
                            Reflect on your entrepreneurial exploration:
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>What excites me most about the possibility of building a creative business?</strong> Consider both the creative and business aspects that energize you.
                              </p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>What fears or concerns do I have about entrepreneurship?</strong> Acknowledge these honestly and consider which are realistic vs. limiting beliefs.
                              </p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>How could entrepreneurial skills enhance my creative practice, even if I don't start a business?</strong> Consider the broader applications of business thinking.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-indigo-800/30 border border-indigo-400/20 rounded-lg">
                          <h4 className="text-indigo-200 font-semibold text-lg mb-3 flex items-center">
                            <span className="w-6 h-6 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-2">
                              🎯
                            </span>
                            Next Steps Planning
                          </h4>
                          
                          <p className="text-indigo-100 text-sm leading-relaxed mb-3">
                            Entrepreneurship is a journey of continuous learning and adaptation. Consider these ways to continue developing your business mindset:
                          </p>
                          
                          <ul className="text-indigo-100 text-sm space-y-2 ml-4">
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Set aside time each week to work on your business concept or skills</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Connect with other creative entrepreneurs for support and learning</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Start small—test ideas before making major commitments</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Keep learning through books, courses, and real-world experimentation</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-indigo-800/10 border border-indigo-400/20 rounded-lg">
                          <h5 className="text-indigo-300 font-semibold text-sm mb-2 flex items-center">
                            <span className="w-5 h-5 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-2">
                              🌟
                            </span>
                            Your Creative Impact
                          </h5>
                          <p className="text-indigo-200 text-sm leading-relaxed">
                            Remember that entrepreneurship isn't just about making money—it's about creating value, solving problems, 
                            and making a positive impact through your unique creative gifts. Whether you build a business or simply 
                            apply entrepreneurial thinking to your creative practice, you're developing skills that will serve you 
                            throughout your creative journey.
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