'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import sessionComponents from '@/data/sessionComponents'
import { useModuleProgress } from '@/hooks/useModuleProgress'
import AudioPlayer from './AudioPlayer'
import courseModules from '@/data/courseModules'

export default function WeekNineContent() {
  const router = useRouter()
  const { completeModule, isModuleCompleted } = useModuleProgress()
  const [completedComponents, setCompletedComponents] = useState<number[]>([])
  
  const moduleInfo = {
    id: 9,
    title: "Creativity and Technology",
    week: 9,
    type: "online",
    duration: "2.5 hours",
    description: "Exploring how technology can enhance and support creative processes and expression"
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
      title: "AI Tools for Creative Professionals",
      type: "Guide",
      description: "Comprehensive overview of AI-powered tools that enhance creative workflows",
      url: "#",
      icon: "🤖"
    },
    {
      id: 2,
      title: "Digital Creativity Platforms",
      type: "Resource",
      description: "Curated list of platforms and tools for digital creative expression",
      url: "#",
      icon: "💻"
    },
    {
      id: 3,
      title: "Technology Ethics in Creative Work",
      type: "Article",
      description: "Exploring the ethical considerations of using technology in creative practice",
      url: "#",
      icon: "⚖️"
    },
    {
      id: 4,
      title: "Future of Creative Technology",
      type: "Video",
      description: "Insights into emerging technologies and their impact on creative industries",
      url: "#",
      icon: "🔮"
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
                        🔌
                      </span>
                      Technology Integration Preparation:
                    </h4>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <ul className="space-y-2 text-green-200 text-sm">
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Ensure you have access to a computer or device for exploring digital tools</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Have examples of your current creative work ready for digital experimentation</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Set aside 2.5 hours for hands-on exploration and learning</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Approach with curiosity—technology is a tool to enhance, not replace, creativity</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">•</span>
                        <span>Remember: the goal is to find technology that serves your creative vision</span>
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
                      <h3 className="text-blue-300 font-bold text-xl mb-4">Technology as Creative Partner</h3>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        We're living through the most exciting technological revolution in creative history. 
                        AI can generate images, write music, and edit videos. Virtual reality creates immersive experiences. 
                        Digital tools democratize access to professional-grade creative capabilities.
                      </p>
                      
                      <p className="text-blue-100 mb-6 leading-relaxed font-medium">
                        But here's the crucial question: In this age of technological creativity, what's the role of the human creator? 
                        The answer isn't about competing with technology—it's about partnering with it.
                      </p>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">The Fear and the Promise</h4>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        Many creatives feel threatened by advancing technology. Common concerns include:
                      </p>

                      <ul className="text-blue-100 mb-6 space-y-2 ml-4">
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>"AI will replace human creativity"</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>"Technology makes creativity too easy and therefore less valuable"</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>"Digital tools create homogenized, soulless work"</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span>"I'll lose my unique creative voice if I use these tools"</span>
                        </li>
                      </ul>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">The Human Advantage</h4>
                      
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        Technology excels at processing, generating, and optimizing. But humans bring irreplaceable qualities:
                      </p>

                      <ul className="text-blue-100 mb-6 space-y-2 ml-4">
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Intentionality:</strong> We create with purpose, meaning, and emotional depth</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Context:</strong> We understand cultural nuance, human experience, and social impact</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Curation:</strong> We make aesthetic and ethical choices about what should exist</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                          <span><strong>Connection:</strong> We create to communicate, heal, inspire, and transform</span>
                        </li>
                      </ul>

                      <h4 className="text-blue-300 font-semibold text-lg mb-3">The Partnership Model</h4>
                      
                      <p className="text-blue-100 font-medium leading-relaxed">
                        The most successful creative professionals of the future won't be those who avoid technology or 
                        those who rely on it completely. They'll be those who thoughtfully integrate technology as a 
                        creative partner—using it to amplify their human creativity, not replace it. Today's session 
                        will help you discover how to build this partnership in your own creative practice.
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
                        🛠️
                      </span>
                      Technology Integration Workshop
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      This hands-on workshop will guide you through exploring and integrating various technologies 
                      into your creative practice, from AI tools to digital platforms and emerging technologies.
                    </p>
                  </div>
                  
                  <AudioPlayer
                    src="/audio/technology-integration.mp3"
                    title="Technology Integration Workshop"
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
                          Workshop Focus Areas
                        </h5>
                        <ul className="text-blue-200 text-xs leading-relaxed space-y-1">
                          <li>• AI-powered creative tools and their applications</li>
                          <li>• Digital platforms for creative collaboration and sharing</li>
                          <li>• Automation tools for creative workflow optimization</li>
                          <li>• Emerging technologies (VR, AR, blockchain) in creative work</li>
                          <li>• Ethical considerations and best practices</li>
                          <li>• Building a personalized technology toolkit</li>
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
                      <h3 className="text-orange-300 font-bold text-xl mb-6">Choose Your Technology Integration Level</h3>
                      
                      <div className="mb-8 p-5 bg-green-800/20 border border-green-500/30 rounded-lg">
                        <h4 className="text-green-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🌱</span>
                          Digital Curious
                        </h4>
                        
                        <p className="text-green-100 mb-4 leading-relaxed">
                          If technology feels overwhelming or you prefer traditional creative methods:
                        </p>

                        <ul className="text-green-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Try one simple digital tool that could enhance your current workflow</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Explore how other creatives in your field are using technology</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Focus on tools that save time rather than replace creative decision-making</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-green-400 flex-shrink-0 mt-1">•</span>
                            <span>Start with free or low-cost options to experiment without pressure</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-8 p-5 bg-blue-800/20 border border-blue-500/30 rounded-lg">
                        <h4 className="text-blue-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">⚡</span>
                          Tech Integrator
                        </h4>
                        
                        <p className="text-blue-100 mb-4 leading-relaxed">
                          Complete the workshop and integrate 2-3 new technologies into your creative practice.
                        </p>

                        <ul className="text-blue-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Test AI tools for ideation, research, or content generation</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Set up digital systems for project management and collaboration</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Create a hybrid workflow combining traditional and digital methods</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                            <span>Document your technology integration process and results</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-6 p-5 bg-purple-800/20 border border-purple-500/30 rounded-lg">
                        <h4 className="text-purple-300 font-semibold text-lg mb-3 flex items-center">
                          <span className="text-2xl mr-3">🚀</span>
                          Innovation Pioneer
                        </h4>
                        
                        <p className="text-purple-100 mb-4 leading-relaxed">
                          Become a leader in creative technology integration:
                        </p>

                        <ul className="text-purple-100 space-y-3 ml-4">
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Experiment with cutting-edge technologies (VR, AR, AI, blockchain)</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Create original projects that showcase innovative technology use</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Develop ethical guidelines for technology use in your creative practice</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Share your discoveries and teach others about creative technology integration</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <span className="text-purple-400 flex-shrink-0 mt-1">•</span>
                            <span>Collaborate with technologists to develop new creative tools</span>
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
                        <span className="text-2xl mr-3">🔮</span>
                        Technology Partnership Reflection
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="p-4 bg-indigo-800/20 border border-indigo-400/30 rounded-lg">
                          <h4 className="text-indigo-200 font-semibold text-lg mb-4">
                            Reflect on your relationship with creative technology:
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>How has technology enhanced or hindered my creative expression?</strong> Consider both positive and challenging experiences with digital tools.
                              </p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>What unique human qualities do I bring that technology cannot replicate?</strong> Identify your irreplaceable creative strengths.
                              </p>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-indigo-400 flex-shrink-0 mt-1 text-lg">•</span>
                              <p className="text-indigo-100 leading-relaxed">
                                <strong>How can I use technology as a creative partner rather than a replacement?</strong> Envision an ideal collaboration between human creativity and digital tools.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-indigo-800/30 border border-indigo-400/20 rounded-lg">
                          <h4 className="text-indigo-200 font-semibold text-lg mb-3 flex items-center">
                            <span className="w-6 h-6 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-2">
                              🛠️
                            </span>
                            Building Your Tech Toolkit
                          </h4>
                          
                          <p className="text-indigo-100 text-sm leading-relaxed mb-3">
                            Technology evolves rapidly, but your approach to integrating it can remain grounded in your creative values:
                          </p>
                          
                          <ul className="text-indigo-100 text-sm space-y-2 ml-4">
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Regularly evaluate new tools based on how they serve your creative vision</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Maintain a balance between efficiency and creative exploration</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Stay informed about ethical implications of the technologies you use</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-indigo-400 flex-shrink-0 mt-1">→</span>
                              <span>Connect with other creatives to share discoveries and best practices</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-indigo-800/10 border border-indigo-400/20 rounded-lg">
                          <h5 className="text-indigo-300 font-semibold text-sm mb-2 flex items-center">
                            <span className="w-5 h-5 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-2">
                              🌟
                            </span>
                            The Future of Creative Partnership
                          </h5>
                          <p className="text-indigo-200 text-sm leading-relaxed">
                            Remember that you are not just adapting to technological change—you are actively shaping how technology 
                            serves creativity. Your thoughtful integration of digital tools, your ethical choices, and your commitment 
                            to maintaining human values in creative work contribute to a future where technology truly enhances rather 
                            than replaces human creativity.
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