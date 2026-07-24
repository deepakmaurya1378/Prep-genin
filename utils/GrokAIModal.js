// 📁 /utils/GeminiAIModal.js
// Using Groq (llama-3.3-70b) — FREE tier: 500 req/day, 14,400 tokens/min
// Sign up for free API key at: https://console.groq.com

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // required for client-side Next.js
});

export async function generateInterviewContent(prompt) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert technical interview coach. Always respond with valid JSON only. No explanations, no markdown, no extra text — only the raw JSON requested.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 4096,
    });

    const text = completion.choices[0]?.message?.content || "";
    // Clean up any accidental markdown wrapping (safety net)
    return text.replace(/```json/g, "").replace(/```/g, "").trim();
  } catch (error) {
    console.error("Groq API error:", error);

    // Provide a helpful error message
    if (error?.status === 401) {
      throw new Error("Invalid Groq API key. Please check NEXT_PUBLIC_GROQ_API_KEY in .env.local");
    } else if (error?.status === 429) {
      throw new Error("Groq rate limit hit. Please wait a moment and try again.");
    } else {
      throw new Error("Failed to generate content. Please check your API key and try again.");
    }
  }
}
