import { useState } from 'react'
import { 
  HeartIcon, 
  SparklesIcon, 
  BookOpenIcon, 
  MusicalNoteIcon,
  FilmIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

function DreamResult({ dream }) {
  const [activeTab, setActiveTab] = useState('psychological')

  if (!dream) return null

  const interpretation = dream.interpretation_json

  const tabs = [
    { id: 'psychological', label: 'Psychological', icon: HeartIcon },
    { id: 'spiritual', label: 'Spiritual', icon: SparklesIcon },
    { id: 'completion', label: 'Dream Completion', icon: BookOpenIcon },
  ]

  return (
    <div className="space-y-6">
      {/* Generated Image */}
      {dream.image_url && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Your Dream Visualized</h3>
          <div className="relative group">
            <img
              src={dream.image_url}
              alt="Dream visualization"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
          </div>
        </div>
      )}

      {/* Analysis Tabs */}
      <div className="card">
        <div className="flex space-x-1 mb-6 bg-dark-700 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-300 hover:text-white hover:bg-dark-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          {activeTab === 'psychological' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary-400">Psychological Analysis</h4>
              <p className="text-dark-300 leading-relaxed">
                {interpretation.psychologicalMeaning}
              </p>
              {interpretation.keySymbols && (
                <div>
                  <h5 className="font-medium text-dark-200 mb-2">Key Symbols:</h5>
                  <div className="flex flex-wrap gap-2">
                    {interpretation.keySymbols.map((symbol, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                      >
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'spiritual' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gold-400">Spiritual Interpretation</h4>
              <p className="text-dark-300 leading-relaxed">
                {interpretation.spiritualMeaning}
              </p>
            </div>
          )}

          {activeTab === 'completion' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary-400">Dream Completion</h4>
              <p className="text-dark-300 leading-relaxed">
                {interpretation.dreamCompletion}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {interpretation.recommendations && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">Personalized Recommendations</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Songs */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gold-400">
                <MusicalNoteIcon className="w-5 h-5" />
                <h4 className="font-semibold">Songs</h4>
              </div>
              <ul className="space-y-2">
                {interpretation.recommendations.songs?.map((song, index) => (
                  <li key={index} className="text-dark-300 text-sm">
                    {song}
                  </li>
                ))}
              </ul>
            </div>

            {/* Movies */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-primary-400">
                <FilmIcon className="w-5 h-5" />
                <h4 className="font-semibold">Movies</h4>
              </div>
              <ul className="space-y-2">
                {interpretation.recommendations.movies?.map((movie, index) => (
                  <li key={index} className="text-dark-300 text-sm">
                    {movie}
                  </li>
                ))}
              </ul>
            </div>

            {/* Journal Prompt */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gold-400">
                <PencilIcon className="w-5 h-5" />
                <h4 className="font-semibold">Journal Prompt</h4>
              </div>
              <p className="text-dark-300 text-sm leading-relaxed">
                {interpretation.recommendations.journalPrompt}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dream Details */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Dream Details</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-dark-400">Mood:</span>
            <span className="ml-2 text-dark-200 font-medium">
              {interpretation.mood || dream.mood}
            </span>
          </div>
          <div>
            <span className="text-dark-400">Date:</span>
            <span className="ml-2 text-dark-200">
              {new Date(dream.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DreamResult 