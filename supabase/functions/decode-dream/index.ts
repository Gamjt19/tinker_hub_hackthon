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

    // 1. --- Call Gemini API for Dream Analysis ---
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY")
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`

    const masterPrompt = `You are Svapna, an AI dream interpreter with expertise in psychology and spirituality. Analyze the user's dream and respond with ONLY a valid JSON object. Do not include any text before or after the JSON. The JSON object must have the following structure:
    {
      "keySymbols": ["symbol1", "symbol2"],
      "psychologicalMeaning": "A deep psychological analysis...",
      "spiritualMeaning": "A spiritual interpretation...",
      "mood": "A single dominant mood word (e.g., Anxious, Peaceful, Confused)",
      "dreamCompletion": "A creative, one-paragraph completion of the dream...",
      "recommendations": {
        "songs": ["Song 1 by Artist", "Song 2 by Artist"],
        "movies": ["Movie 1 (Year)", "Movie 2 (Year)"],
        "journalPrompt": "A journal prompt for the user..."
      }
    }
    User's Dream: "${dream_text}"`

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ 
          parts: [{ text: masterPrompt }] 
        }] 
      }),
    })

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`)
    }

    const geminiData = await geminiResponse.json()
    const interpretationText = geminiData.candidates[0].content.parts[0].text
    
    // Clean the response and parse JSON
    const cleanedText = interpretationText.replace(/```json\n?|\n?```/g, '').trim()
    const interpretationJson = JSON.parse(cleanedText)

    // 2. --- Call DALL-E API for Image Generation ---
    const dallEApiKey = Deno.env.get("DALLE_API_KEY")
    if (!dallEApiKey) {
      throw new Error('DALLE_API_KEY not configured')
    }

    const imagePrompt = `Surreal dreamscape, abstract painting of: "${dream_text}". Use an ethereal and mystical art style, digital art, 8k, dreamy atmosphere, soft lighting, mystical elements.`
    
    const dallEResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dallEApiKey}`,
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
        style: 'vivid'
      })
    })

    if (!dallEResponse.ok) {
      throw new Error(`DALL-E API error: ${dallEResponse.status}`)
    }

    const dallEData = await dallEResponse.json()
    const imageUrl = dallEData.data[0].url

    // 3. --- Save everything to Supabase ---
    const supabaseUrl = Deno.env.get("SUPABASE_URL")
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