/// <reference types="https://deno.land/x/deno@v1.40.0/lib.deno.d.ts" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// CORS headers for frontend requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Replace with your frontend URL for production
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-user-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle preflight CORS request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { dream_text } = await req.json()
    const userId = req.headers.get('x-user-id')

    if (!dream_text || !userId) {
      throw new Error('Missing required parameters: dream_text and user_id')
    }

    // 1. --- Real AI Dream Analysis with Google Gemini ---
    // @ts-ignore
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY")
    console.log('Gemini API Key length:', geminiApiKey ? geminiApiKey.length : 'NOT FOUND')
    console.log('Gemini API Key starts with:', geminiApiKey ? geminiApiKey.substring(0, 7) : 'NOT FOUND')
    
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;

    const masterPrompt = `You are Svapna, an expert AI dream interpreter. Analyze this dream and respond with ONLY a valid JSON object in this exact format, no additional text:

{
  "keySymbols": ["symbol1", "symbol2", "symbol3"],
  "psychologicalMeaning": "A detailed psychological analysis of the dream's meaning...",
  "spiritualMeaning": "A spiritual interpretation of the dream's deeper meaning...",
  "mood": "A single mood word (Anxious, Happy, Sad, Peaceful, Confused, Neutral, Excited, Melancholic, etc.)",
  "dreamCompletion": "A creative, one-paragraph completion of the dream that provides closure...",
  "recommendations": {
    "songs": ["Song Title by Artist", "Song Title by Artist"],
    "movies": ["Movie Title (Year)", "Movie Title (Year)"],
    "journalPrompt": "A thoughtful journal prompt for the user to reflect on this dream..."
  }
}

Dream to analyze: ${dream_text}`

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        contents: [
          {
            parts: [
              {
                text: `You are Svapna, an expert dream interpreter. Always respond with valid JSON only, no additional text. ${masterPrompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      }),
    })

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text()
      console.error('Gemini API error response:', errorData)
      throw new Error(`Gemini API error: ${geminiResponse.status} - ${errorData}`)
    }

    const geminiData = await geminiResponse.json()
    
    if (!geminiData.candidates || !geminiData.candidates[0] || !geminiData.candidates[0].content) {
      console.error('Unexpected Gemini response:', JSON.stringify(geminiData))
      throw new Error('Invalid response from Gemini API')
    }
    
    const interpretationText = geminiData.candidates[0].content.parts[0].text
    console.log('Gemini raw response:', interpretationText)
    
    // Clean the response and parse JSON
    let cleanedText = interpretationText.replace(/```json\n?|\n?```/g, '').trim()
    
    // Try to extract JSON if it's wrapped in other text
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanedText = jsonMatch[0]
    }
    
    let interpretationJson
    try {
      interpretationJson = JSON.parse(cleanedText)
      console.log('Parsed interpretation:', interpretationJson)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Cleaned text:', cleanedText)
      
      // Fallback: create a basic interpretation
      interpretationJson = {
        keySymbols: ["dream", "mystery", "subconscious"],
        psychologicalMeaning: "This dream reflects your subconscious thoughts and emotions. The symbols present suggest you're processing experiences and emotions in your waking life.",
        spiritualMeaning: "From a spiritual perspective, this dream may be a message from your higher self, guiding you toward deeper understanding and growth.",
        mood: "Neutral",
        dreamCompletion: "As you continue on your journey, the dream's meaning becomes clearer, offering you insights and guidance for your path forward.",
        recommendations: {
          songs: ["Dreams by Fleetwood Mac", "Bridge Over Troubled Water by Simon & Garfunkel"],
          movies: ["Inception (2010)", "The Secret Life of Walter Mitty (2013)"],
          journalPrompt: "What emotions did this dream evoke in you? How might it relate to your current life circumstances?"
        }
      }
      console.log('Using fallback interpretation')
    }

    // 2. --- Dream Image Generation (Fallback) ---
    // Since Gemini doesn't generate images directly, we'll use dream-themed images
    // based on the mood and content analysis
    
    const mood = interpretationJson.mood || 'Neutral'
    const keySymbols = interpretationJson.keySymbols || ['dream', 'mystery']
    
    // Generate appropriate dream-themed images based on mood and symbols
    const dreamImages = {
      'Anxious': [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&sat=-50&brightness=30',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&contrast=50&brightness=40'
      ],
      'Happy': [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&sat=50&brightness=20',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&hue=60&brightness=15'
      ],
      'Sad': [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&sat=-30&brightness=40',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&blur=1&brightness=35'
      ],
      'Peaceful': [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&sat=20&brightness=10',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&hue=240&brightness=5'
      ],
      'Confused': [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&sat=-20&brightness=50',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&blur=2&brightness=45'
      ],
      'Neutral': [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&sat=10&brightness=5'
      ]
    }
    
    const moodImages = dreamImages[mood] || dreamImages['Neutral']
    const randomIndex = Math.floor(Math.random() * moodImages.length)
    const imageUrl = moodImages[randomIndex]
    
    console.log(`Generated dream image for mood: ${mood}`)
    console.log('Image URL:', imageUrl)

    // 3. --- Save everything to Supabase ---
    // @ts-ignore
    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    // @ts-ignore
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing')
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

    const { data, error } = await supabaseClient
      .from("dreams")
      .insert({
        user_id: userId,
        dream_text: dream_text,
        interpretation_json: interpretationJson,
        image_url: imageUrl,
        mood: interpretationJson.mood
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    )
  }
}) 