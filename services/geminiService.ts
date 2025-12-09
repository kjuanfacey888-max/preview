import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is missing in environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const streamObjectionResponse = async (
  query: string,
  onChunk: (text: string) => void
) => {
  try {
    const ai = getClient();
    const model = "gemini-2.5-flash";
    
    const systemInstruction = `
      You are an expert sales consultant for "Full Cycle Heating and Cooling" in New York City.
      Your goal is to help a salesperson overcome customer objections regarding switching from old steam/hot water boilers to modern Dual-Unit Window Heat Pumps.
      
      Key Selling Points:
      1. Energy Efficiency: Dual units are up to 300% efficient compared to 80% for old boilers.
      2. Cost Savings: Lower monthly bills, especially with rising gas prices.
      3. Comfort: Zone control (heat/cool specific rooms), no overheating, quiet operation.
      4. Installation: No ductwork needed, fits in window, quick install.
      5. NYC Specific: Complies with Local Law 97 (emissions), removes need for noisy radiators.
      6. Incentives: Mention the 20% discount if they book today.

      Keep answers concise, persuasive, and professional. Use bullet points for readability.
      Tone: Helpful, confident, expert.
    `;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessageStream({ message: query });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Error streaming from Gemini:", error);
    onChunk("I'm having trouble connecting to the sales database. Please try again.");
  }
};