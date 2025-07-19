import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import { MoonIcon } from '@heroicons/react/24/outline'

function AuthPage() {
  useEffect(() => {
    // Set dark theme for auth UI
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-gold-500 rounded-xl flex items-center justify-center shadow-lg">
              <MoonIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Svapna AI
          </h1>
          <p className="text-dark-400">
            Sign in to start decoding your dreams
          </p>
        </div>

        {/* Auth Form */}
        <div className="card">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#a855f7',
                    brandAccent: '#9333ea',
                    brandButtonText: '#ffffff',
                    defaultButtonBackground: '#374151',
                    defaultButtonBackgroundHover: '#4b5563',
                    defaultButtonBorder: '#4b5563',
                    defaultButtonText: '#ffffff',
                    dividerBackground: '#374151',
                    inputBackground: '#374151',
                    inputBorder: '#4b5563',
                    inputBorderHover: '#6b7280',
                    inputBorderFocus: '#a855f7',
                    inputText: '#ffffff',
                    inputLabelText: '#d1d5db',
                    inputPlaceholder: '#9ca3af',
                    messageText: '#d1d5db',
                    messageTextDanger: '#f87171',
                    anchorTextColor: '#a855f7',
                    anchorTextHoverColor: '#c084fc',
                  },
                  space: {
                    inputPadding: '12px',
                    buttonPadding: '12px',
                  },
                  fontSizes: {
                    baseBodySize: '14px',
                    baseInputSize: '14px',
                    baseLabelSize: '14px',
                    baseButtonSize: '14px',
                  },
                  fonts: {
                    bodyFontFamily: 'Inter, system-ui, sans-serif',
                    buttonFontFamily: 'Inter, system-ui, sans-serif',
                    inputFontFamily: 'Inter, system-ui, sans-serif',
                    labelFontFamily: 'Inter, system-ui, sans-serif',
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px',
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={window.location.origin + '/dashboard'}
          />
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-dark-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthPage 