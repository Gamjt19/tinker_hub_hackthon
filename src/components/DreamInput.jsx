import { useState, useRef } from 'react'
import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

function DreamInput({ onSubmit, loading }) {
  const [dreamText, setDreamText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const textareaRef = useRef(null)

  // Initialize speech recognition
  useState(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setDreamText(prev => prev + finalTranscript)
        }
      }

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      setRecognition(recognition)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (dreamText.trim() && !loading) {
      onSubmit(dreamText.trim())
      setDreamText('')
    }
  }

  const startRecording = () => {
    if (recognition) {
      recognition.start()
      setIsRecording(true)
    } else {
      alert('Speech recognition is not supported in your browser')
    }
  }

  const stopRecording = () => {
    if (recognition) {
      recognition.stop()
      setIsRecording(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e)
    }
  }

  return (
    <div className="card">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Share Your Dream</h2>
        <p className="text-dark-400">
          Describe your dream in detail. The more you share, the deeper our analysis will be.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="I was walking through a mysterious forest when suddenly..."
            className="input-field w-full h-32 resize-none"
            disabled={loading}
          />
          
          {/* Voice recording button */}
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={loading}
            className={`absolute bottom-3 right-3 p-2 rounded-lg transition-colors ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-dark-600 hover:bg-dark-500 text-dark-300'
            }`}
          >
            <MicrophoneIcon className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-dark-400">
            Press Ctrl+Enter to submit
          </p>
          
          <button
            type="submit"
            disabled={!dreamText.trim() || loading}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Decoding Dream...</span>
              </>
            ) : (
              <>
                <PaperAirplaneIcon className="w-5 h-5" />
                <span>Submit Dream</span>
              </>
            )}
          </button>
        </div>
      </form>

      {isRecording && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-2"></div>
            Recording... Click the microphone again to stop
          </p>
        </div>
      )}
    </div>
  )
}

export default DreamInput 