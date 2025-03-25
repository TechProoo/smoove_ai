import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEN_AI_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function generateResponse(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    console.log(result);
    if (!result || !result.response) {
      throw new Error("Invalid response from API");
    }

    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I couldn't process your request.";
  }
}
