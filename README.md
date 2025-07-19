# Svapna AI - The Dream Decoder

A modern web application that uses AI to analyze and interpret dreams, providing psychological insights, spiritual interpretations, and visual dreamscapes.

## 🌟 Features

- **AI-Powered Dream Analysis**: Uses Google Gemini for deep psychological and spiritual interpretation
- **Dream Visualization**: Generates stunning visual representations using DALL-E
- **Voice Input**: Record your dreams using speech-to-text
- **Mood Tracking**: Visualize your emotional journey through interactive charts
- **Dream History**: Browse and revisit your past dreams
- **Personalized Recommendations**: Get song, movie, and journaling suggestions
- **Modern UI**: Beautiful dark theme with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **AI Services**: Google Gemini (text analysis) + DALL-E (image generation)
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Heroicons

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Supabase account
- Google Gemini API key
- OpenAI API key (for DALL-E)

### 1. Clone and Install

```bash
git clone <repository-url>
cd svapna-ai-dream-decoder
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project
2. Run the SQL schema in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of database-schema.sql
```

3. Get your Supabase URL and anon key from Settings > API

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# AI APIs
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
DALLE_API_KEY=YOUR_OPENAI_API_KEY

# Supabase Service Role Key (for Edge Functions)
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

### 4. Deploy Edge Function

1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link your project: `supabase link --project-ref YOUR_PROJECT_REF`
4. Deploy the function: `supabase functions deploy decode-dream`

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` to see your app!

## 📁 Project Structure

```
svapna-ai-dream-decoder/
├── src/
│   ├── components/          # React components
│   │   ├── DreamInput.jsx   # Dream input with voice recording
│   │   ├── DreamResult.jsx  # AI analysis results display
│   │   ├── EmotionGraph.jsx # Mood tracking chart
│   │   └── Navbar.jsx       # Navigation bar
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Landing page
│   │   ├── AuthPage.jsx     # Authentication
│   │   └── DashboardPage.jsx # Main dashboard
│   ├── lib/
│   │   └── supabase.js      # Supabase client
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── supabase/
│   └── functions/
│       └── decode-dream/    # Edge function for AI processing
├── database-schema.sql      # Database schema
└── package.json
```

## 🔧 Configuration

### Supabase Setup

1. **Authentication**: Enable Email and Social providers in Authentication > Settings
2. **Database**: Run the schema SQL to create tables and policies
3. **Edge Functions**: Deploy the `decode-dream` function with environment variables

### API Keys

- **Google Gemini**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **OpenAI**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)

## 🎨 Customization

### Styling

The app uses Tailwind CSS with a custom dark theme. Main colors:
- Primary: Purple (`#a855f7`)
- Gold: Accent (`#f59e0b`)
- Dark: Background (`#0f172a`)

### AI Prompts

Modify the prompts in `supabase/functions/decode-dream/index.ts` to customize:
- Dream interpretation style
- Image generation prompts
- Analysis depth

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy!

### Netlify

1. Build: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Google Gemini for AI analysis
- OpenAI DALL-E for image generation
- Supabase for backend services
- Chart.js for data visualization

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure Supabase Edge Function is deployed
4. Check API key permissions

---

**Happy Dream Decoding! 🌙✨** 