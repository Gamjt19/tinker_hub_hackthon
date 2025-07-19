import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { supabase } from '../lib/supabase'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function EmotionGraph({ session }) {
  const [dreams, setDreams] = useState([])
  const [loading, setLoading] = useState(true)

  // Mood mapping to numerical values
  const moodValues = {
    'Anxious': -2,
    'Worried': -1.5,
    'Confused': -1,
    'Neutral': 0,
    'Calm': 1,
    'Peaceful': 1.5,
    'Happy': 2,
    'Excited': 2.5,
    'Joyful': 3
  }

  useEffect(() => {
    fetchDreams()
  }, [session])

  const fetchDreams = async () => {
    try {
      const { data, error } = await supabase
        .from('dreams')
        .select('*')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: true })

      if (error) throw error
      setDreams(data || [])
    } catch (error) {
      console.error('Error fetching dreams:', error)
    } finally {
      setLoading(false)
    }
  }

  const prepareChartData = () => {
    if (dreams.length === 0) return null

    const labels = dreams.map(dream => 
      new Date(dream.created_at).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    )

    const data = dreams.map(dream => {
      const mood = dream.mood || dream.interpretation_json?.mood
      return moodValues[mood] || 0
    })

    return {
      labels,
      datasets: [
        {
          label: 'Mood Over Time',
          data: data,
          borderColor: '#a855f7',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#a855f7',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        }
      ]
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#ffffff',
        bodyColor: '#d1d5db',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y
            const mood = Object.keys(moodValues).find(key => moodValues[key] === value)
            return `Mood: ${mood || 'Unknown'}`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#374151',
          drawBorder: false
        },
        ticks: {
          color: '#9ca3af',
          maxRotation: 45
        }
      },
      y: {
        grid: {
          color: '#374151',
          drawBorder: false
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value) {
            const mood = Object.keys(moodValues).find(key => moodValues[key] === value)
            return mood || ''
          }
        },
        min: -3,
        max: 3
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    )
  }

  if (dreams.length === 0) {
    return (
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Mood History</h3>
        <div className="flex items-center justify-center h-64 text-dark-400">
          <p>No dreams recorded yet. Start by sharing your first dream!</p>
        </div>
      </div>
    )
  }

  const chartData = prepareChartData()

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Mood History</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
      
      {/* Mood Legend */}
      <div className="mt-4 pt-4 border-t border-dark-700">
        <h4 className="text-sm font-medium text-dark-300 mb-3">Mood Scale:</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(moodValues).map(([mood, value]) => (
            <div key={mood} className="flex items-center space-x-1 text-xs">
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: value < 0 ? '#ef4444' : value === 0 ? '#6b7280' : '#10b981'
                }}
              ></div>
              <span className="text-dark-400">{mood}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmotionGraph 