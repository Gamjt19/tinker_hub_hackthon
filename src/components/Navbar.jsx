import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { UserCircleIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'

function Navbar({ session }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <nav className="bg-dark-800/50 backdrop-blur-sm border-b border-dark-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold gradient-text">
              Svapna AI
            </h1>
            <span className="ml-2 text-sm text-dark-400">Dream Decoder</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/dashboard" className="text-dark-300 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="/dashboard" className="text-dark-300 hover:text-white transition-colors">
              Dream History
            </a>
          </div>

          {/* Right side - Theme toggle and user menu */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5 text-gold-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-primary-400" />
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
              >
                <UserCircleIcon className="h-6 w-6 text-primary-400" />
                <span className="text-sm font-medium">
                  {session?.user?.email?.split('@')[0] || 'User'}
                </span>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-dark-400 border-b border-dark-700">
                    {session?.user?.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 