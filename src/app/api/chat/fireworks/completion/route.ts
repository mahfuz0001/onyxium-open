import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

import { checkApiLimit, increaseApiLimit } from "@/libs/api-limit";

// Create an OpenAI API client (that's edge friendly!)
// but configure it to point to fireworks.ai
const fireworks = new OpenAI({
  apiKey: process.env.FIREWORKS_API_KEY || "",
  baseURL: "https://api.fireworks.ai/inference/v1",
});

export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  const freeTrial = await checkApiLimit();

  if (!freeTrial) {
    return new Response("API Limit Exceeded", { status: 429 });
  }

  // Ask Fireworks for a streaming chat completion using Llama 2 70b model
  // @see https://app.fireworks.ai/models/fireworks/llama-v2-70b-chat
  const response = await fireworks.completions.create({
    model: "accounts/fireworks/models/llama-v2-70b-chat",
    stream: true,
    max_tokens: 1000,
    prompt,
  });
  // Convert the response into a friendly text-stream.
  const stream = OpenAIStream(response);

  await increaseApiLimit();

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
