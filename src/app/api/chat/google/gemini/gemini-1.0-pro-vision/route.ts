import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

import { checkApiLimit, increaseApiLimit } from "@/libs/api-limit";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const runtime = "edge";

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant",
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const freeTrial = await checkApiLimit();

  if (!freeTrial) {
    return new Response("API Limit Exceeded", { status: 429 });
  }

  const geminiStream = await genAI
    .getGenerativeModel({ model: "gemini-1.0-pro-vision" })
    .generateContentStream(buildGoogleGenAIPrompt(messages));

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(geminiStream);

  await increaseApiLimit();

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
