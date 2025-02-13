import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

import { checkApiLimit, increaseApiLimit } from "@/libs/api-limit";

const fireworks = new OpenAI({
  apiKey: process.env.FIREWORKS_API_KEY || "",
  baseURL: "https://api.fireworks.ai/inference/v1",
});

export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Check if the user is within the limit
  const withinLimit = await checkApiLimit();

  if (!withinLimit) {
    return new Response("API Limit Exceeded", { status: 429 });
  }

  // Ask Fireworks for a streaming chat completion using Llama 2 70b model
  const response = await fireworks.chat.completions.create({
    model: "accounts/fireworks/models/llama-v2-70b-chat",
    stream: true,
    max_tokens: 1000,
    messages,
  });

  // Convert the response into a friendly text-stream.
  const stream = OpenAIStream(response);

  // Increase the API limit after the response has been generated
  const updateLimitSuccess = await increaseApiLimit()
    .then(() => true)
    .catch(() => false);

  if (!updateLimitSuccess) {
    console.error("Failed to update API limit.");
  }

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
