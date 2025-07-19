import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import DreamInput from '../components/DreamInput'
import DreamResult from '../components/DreamResult'
import EmotionGraph from '../components/EmotionGraph'
import { EyeIcon, CalendarIcon } from '@heroicons/react/24/outline'

function DashboardPage({ session }) {
  const [currentDream, setCurrentDream] = useState(null)
  const [dreamHistory, setDreamHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('input')

  useEffect(() => {
    fetchDreamHistory()
  }, [session])

  const fetchDreamHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('dreams')
        .select('*')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDreamHistory(data || [])
    } catch (error) {
      console.error('Error fetching dream history:', error)
    }
  }

  const handleDreamSubmit = async (dreamText) => {
    setLoading(true)
    try {
      const response = await fetch('/api/decode-dream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': session?.user?.id
        },
        body: JSON.stringify({ dream_text: dreamText })
      })

      if (!response.ok) {
        throw new Error('Failed to decode dream')
      }

      const dream = await response.json()
      setCurrentDream(dream)
      setActiveTab('result')
      
      // Refresh dream history
      await fetchDreamHistory()
    } catch (error) {
      console.error('Error submitting dream:', error)
      alert('Failed to decode dream. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome back, {session?.user?.email?.split('@')[0]}!
          </h1>
          <p className="text-dark-400">
            Ready to explore the depths of your subconscious mind?
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-dark-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('input')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-colors ${
              activeTab === 'input'
                ? 'bg-primary-600 text-white'
                : 'text-dark-300 hover:text-white hover:bg-dark-700'
            }`}
          >
            <EyeIcon className="w-5 h-5" />
            <span>New Dream</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-colors ${
              activeTab === 'history'
                ? 'bg-primary-600 text-white'
                : 'text-dark-300 hover:text-white hover:bg-dark-700'
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Dream History</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Dream Input/Result */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'input' && (
              <DreamInput onSubmit={handleDreamSubmit} loading={loading} />
            )}

            {activeTab === 'result' && currentDream && (
              <DreamResult dream={currentDream} />
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Your Dream History</h2>
                
                {dreamHistory.length === 0 ? (
                  <div className="card text-center py-12">
                    <p className="text-dark-400 mb-4">No dreams recorded yet.</p>
                    <button
                      onClick={() => setActiveTab('input')}
                      className="btn-primary"
                    >
                      Share Your First Dream
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dreamHistory.map((dream) => (
                      <div key={dream.id} className="card cursor-pointer hover:bg-dark-700/50 transition-colors" onClick={() => {
                        setCurrentDream(dream)
                        setActiveTab('result')
                      }}>
                        <div className="flex items-start space-x-4">
                          {dream.image_url && (
                            <img
                              src={dream.image_url}
                              alt="Dream visualization"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-dark-200 mb-2 line-clamp-2">
                              {dream.dream_text.substring(0, 100)}...
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-dark-400">
                              <span>{formatDate(dream.created_at)}</span>
                              {dream.mood && (
                                <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded-full">
                                  {dream.mood}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Emotion Graph */}
          <div className="space-y-8">
            <EmotionGraph session={session} />
            
            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-dark-400">Total Dreams:</span>
                  <span className="text-white font-semibold">{dreamHistory.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-dark-400">This Month:</span>
                  <span className="text-white font-semibold">
                    {dreamHistory.filter(dream => {
                      const dreamDate = new Date(dream.created_at)
                      const now = new Date()
                      return dreamDate.getMonth() === now.getMonth() && 
                             dreamDate.getFullYear() === now.getFullYear()
                    }).length}
                  </span>
                </div>
                {dreamHistory.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-dark-400">Most Common Mood:</span>
                    <span className="text-white font-semibold">
                      {(() => {
                        const moodCounts = {}
                        dreamHistory.forEach(dream => {
                          const mood = dream.mood || dream.interpretation_json?.mood
                          if (mood) {
                            moodCounts[mood] = (moodCounts[mood] || 0) + 1
                          }
                        })
                        const mostCommon = Object.entries(moodCounts)
                          .sort(([,a], [,b]) => b - a)[0]
                        return mostCommon ? mostCommon[0] : 'N/A'
                      })()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage 