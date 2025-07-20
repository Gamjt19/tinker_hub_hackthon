# Svapna AI - The Dream Decoder

💻 TinkerSpace Badge
Built something awesome at TinkerSpace?
Don’t let it go unnoticed.
Use this badge to proudly showcase your work and show others you were there, building something real.

🌟 What Is This?
The TinkerSpace Badge is more than a sticker. It’s your proof that you didn’t just talk about building—you actually did it.
It tells the world you were part of something hands-on, something that matters.

Projects fade. But when you wear this badge, people know you were in the room where it happened.

✅ Who Can Use It?
This badge is for:

🛠 Makers who’ve built or contributed to projects at TinkerSpace
👩‍💻 Hackathon participants
📣 Supporters of hands-on learning and tech-for-good
💡 Anyone who doesn’t just scroll, but actually builds
📌 Why You Should Use This Badge
✔ Show you’re a real builder, not just a watcher
✔ Help others discover cool TinkerSpace projects
✔ Become part of the maker story—someone who inspires others
✔ It’s proof you took part in a growing community of doers

If your README doesn’t say “Built at TinkerSpace,” did you really build it at TinkerSpace?

🧩 How to Use
Copy the code below into your README, profile, or docs:

[![💻 Built at TinkerSpace](https://img.shields.io/badge/Built%20at-TinkerSpace-blueviolet?style=for-the-badge&label=%F0%9F%92%BBBuilt%20at&labelColor=turquoise&color=white)](https://tinkerhub.org/tinkerspace)


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

- Demo Video : https://drive.google.com/file/d/1MnrEBnsBUTzATq_ZChFLI4tNypQp-Sr8/view?usp=sharing


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

---

**Happy Dream Decoding! 🌙✨** 
