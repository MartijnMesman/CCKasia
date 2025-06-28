'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const progressPercentage = 18

  const handleNavigation = (item: string) => {
    setIsMenuOpen(false) // Close mobile menu
    
    switch (item) {
      case 'Home':
        router.push('/')
        break
      case 'Modules':
        // Scroll to modules section if on home page, otherwise go to home
        if (window.location.pathname === '/') {
          const modulesSection = document.getElementById('modules-section')
          if (modulesSection) {
            modulesSection.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        } else {
          router.push('/#modules-section')
        }
        break
      default:
        console.log(`Navigation to ${item} not implemented yet`)
    }
  }

  const menuItems = [
    { name: 'Home', action: () => handleNavigation('Home') },
    { name: 'Modules', action: () => handleNavigation('Modules') }
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-md border-b border-gray-700/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clickable to go home */}
          <div className="flex-shrink-0">
            <button
              onClick={() => router.push('/')}
              className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              Connected Creativity
            </button>
          </div>

          {/* Progress Indicator - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-300 font-medium">
                {progressPercentage}% Progress
              </span>
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white hover:bg-gray-700/50 p-2 rounded-md transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700/50">
              {/* Progress Indicator - Mobile */}
              <div className="px-3 py-2 mb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300 font-medium">
                    Progress
                  </span>
                  <span className="text-sm text-purple-400 font-medium">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}