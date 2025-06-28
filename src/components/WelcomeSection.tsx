export default function WelcomeSection() {
  const infoCards = [
    {
      title: "Study Sessions",
      description: "Interactive learning modules designed to enhance your creative skills through structured practice and exploration.",
      icon: "📚"
    },
    {
      title: "Extra Content",
      description: "Supplementary resources, tutorials, and inspiration to deepen your understanding and expand your creative horizons.",
      icon: "✨"
    },
    {
      title: "Journaling",
      description: "Reflective exercises and prompts to document your creative journey and track your personal growth.",
      icon: "📝"
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Gradient Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent leading-tight">
          Connected Creativity
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
          Discover a holistic approach to design that connects mind, body, and creativity through 
          intentional practice and mindful exploration.
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {infoCards.map((card, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:border-purple-500/30"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
              <p className="text-gray-300 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
          Begin je reis
        </button>
      </div>
    </section>
  )
}