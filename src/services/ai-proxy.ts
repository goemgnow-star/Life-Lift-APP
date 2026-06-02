import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { HOPE_SYSTEM_PROMPT } from '../constants/hope-prompt';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface AIProxyRequest {
  user_id: number;
  tier: number;
  faith_mode: boolean;
  prompt: string;
}

export const callHopeAI = async (req: AIProxyRequest): Promise<string> => {
  const systemContext = HOPE_SYSTEM_PROMPT(req.tier, req.faith_mode);

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemContext },
        { role: "user", content: req.prompt }
      ],
      temperature: 0.7,
    });
    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("Groq API failed, attempting Gemini Fallback:", error);
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(`${systemContext}\n\nUser: ${req.prompt}`);
      return result.response.text();
    } catch (fallbackError) {
      console.error("Gemini Fallback failed:", fallbackError);
      throw new Error("AI service unavailable.");
    }
  }
};
