import sessionComponents from '@/data/sessionComponents'

export default function WeekTwoContent() {
  const moduleInfo = {
    title: "Body Awareness & Movement",
    week: 2,
    type: "physical",
    duration: "1.5 hours",
    description: "Exploring the connection between physical awareness and creative expression. This module focuses on understanding how our body influences our creative process and how movement can unlock new forms of artistic expression."
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
        <h2 className="text-2xl font-semibold text-white mb-6">
          Sessie Onderdelen
        </h2>
        
        {sessionComponents.map((component, index) => (
          <div 
            key={component.id}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {component.title}
                </h3>
              </div>
              <span className="text-sm font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                {component.duration}
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed ml-12">
              {component.description}
            </p>
          </div>
        ))}
      </div>

      {/* Session Summary */}
      <div className="mt-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">
          Sessie Overzicht
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {sessionComponents.map((component) => (
            <div key={component.id} className="text-center">
              <div className="text-sm font-medium text-purple-400 mb-1">
                {component.title}
              </div>
              <div className="text-xs text-gray-400">
                {component.duration}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700/50 text-center">
          <span className="text-sm text-gray-400">
            Totale sessieduur: {moduleInfo.duration}
          </span>
        </div>
      </div>
    </div>
  )
}