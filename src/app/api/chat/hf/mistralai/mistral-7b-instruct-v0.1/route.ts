import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";
import { experimental_buildOpenAssistantPrompt } from "ai/prompts";

import { checkApiLimit, increaseApiLimit } from "@/libs/api-limit";

// Create a new HuggingFace Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  const freeTrial = await checkApiLimit();

  if (!freeTrial) {
    return new Response("API Limit Exceeded", { status: 429 });
  }

  const response = Hf.textGenerationStream({
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    inputs: experimental_buildOpenAssistantPrompt(messages),
    parameters: {
      max_new_tokens: 200,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false,
    },
  });

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response);

  await increaseApiLimit();

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
