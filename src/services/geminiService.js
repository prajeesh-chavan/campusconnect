// src/services/geminiService.js
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

export const geminiService = {
  async getCampusResponse(userMessage, userProfile) {
    try {
      const prompt = `You are AskCampusBot, a helpful assistant for college students. 
      
      User Profile: ${userProfile?.name || "Student"}, Year: ${
        userProfile?.year || "N/A"
      }, Department: ${userProfile?.department || "N/A"}
      
      Help with campus-related questions like:
      - Exam schedules and deadlines
      - Placement procedures and companies
      - Workshop and event information
      - Academic policies and procedures
      - Campus facilities and services
      
      User Question: ${userMessage}
      
      Provide helpful, accurate responses specific to campus life. Keep responses conversational and friendly.`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(
          `API request failed with status ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content
      ) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("No valid response from Gemini API");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error(`Failed to get response from AI: ${error.message}`);
    }
  },
};
