import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

import { checkApiLimit, increaseApiLimit } from "@/libs/api-limit";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  const freeTrial = await checkApiLimit();

  if (!freeTrial) {
    return new Response("API Limit Exceeded", { status: 429 });
  }

  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response);

  await increaseApiLimit();

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
