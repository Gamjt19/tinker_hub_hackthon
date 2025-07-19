import { Link } from 'react-router-dom'
import { SparklesIcon, MoonIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-900 to-dark-900"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Logo and Title */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-gold-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <MoonIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Svapna AI</span>
            </h1>
            <p className="text-2xl md:text-3xl text-dark-300 mb-8">
              The Dream Decoder
            </p>
            
            <p className="text-lg text-dark-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Unlock the hidden meanings of your dreams with advanced AI analysis. 
              Discover psychological insights, spiritual interpretations, and creative visualizations 
              that help you understand your subconscious mind.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/auth"
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
              >
                <SparklesIcon className="w-6 h-6" />
                <span>Start Decoding Dreams</span>
              </Link>
              <button className="btn-secondary text-lg px-8 py-4">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Svapna AI?
            </h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              Our advanced AI combines psychology, spirituality, and creativity to provide 
              comprehensive dream analysis that goes beyond surface interpretation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center">
                          <div className="w-16 h-16 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <AcademicCapIcon className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Psychological Analysis</h3>
              <p className="text-dark-400">
                Deep psychological insights based on modern dream psychology and subconscious patterns.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="w-8 h-8 text-gold-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Spiritual Interpretation</h3>
              <p className="text-dark-400">
                Explore the spiritual and metaphysical meanings behind your dream symbols and experiences.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MoonIcon className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Visual Dreamscapes</h3>
              <p className="text-dark-400">
                Generate stunning visual representations of your dreams using advanced AI art generation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-800 border-t border-dark-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-dark-400">
            © 2024 Svapna AI. Unlock the mysteries of your dreams.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage 