export interface AIModel {
  category: string;
  title: string;
  description: string;
  models: Model[];
}

export interface Model {
  title: string;
  info: string;
  icon: string;
  api?: string;
  description: string;
}

export const modelData: AIModel[] = [
  {
    category: "Chat",
    title: "Chat Models",
    description:
      "Explore cutting-edge chat models designed for dynamic conversations and advanced text generation.",
    models: [
      {
        title: "GPT-4o",
        info: "coming-soon",
        icon: "/assets/modelData/gpt.png",
        api: "/api/chat/openai/gpt-4o",
        description:
          "High-intelligence flagship model for complex, multi-step tasks.",
      },
      {
        title: "GPT-4",
        info: "coming-soon",
        icon: "/assets/modelData/gpt.png",
        api: "/api/chat/openai/gpt-4",
        description: "The latest version of OpenAI's GPT model.",
      },
      {
        title: "GPT-4 Turbo",
        info: "coming-soon",
        icon: "/assets/modelData/gpt.png",
        api: "/api/chat/openai/gpt-4-turbo",
        description: "Enhanced version of OpenAI's GPT-4 model.",
      },
      {
        title: "Google Gemini",
        info: "gemini",
        icon: "/assets/modelData/google-gemini.webp",
        api: "/api/chat/google/chat",
        description: "Generate and modify text based on prompts.",
      },
      {
        title: "Gemini 1.0 Pro",
        info: "gemini-1.0-pro",
        icon: "/assets/modelData/google-gemini.webp",
        api: "/api/chat/google/gemini/gemini-1.0-pro",
        description: "Advanced text generation with enhanced capabilities.",
      },
      {
        title: "Gemini 1.0 Pro Vision",
        info: "gemini-1.0-pro-vision",
        icon: "/assets/modelData/google-gemini.webp",
        api: "/api/chat/google/gemini/gemini-1.0-pro-vision",
        description: "Text generation with visual context integration.",
      },
      {
        title: "Gemini 1.5 Pro",
        info: "gemini-1.5-pro",
        icon: "/assets/modelData/google-gemini.webp",
        api: "/api/chat/google/gemini/gemini-1.5-pro-001",
        description: "Enhanced text generation and modification.",
      },
      {
        title: "Gemini 1.5 Flash",
        info: "gemini-1.5-flash-001",
        icon: "/assets/modelData/google-gemini.webp",
        api: "/api/chat/google/gemini/gemini-1.5-flash-001",
        description: "Fast text generation for quick outputs.",
      },
      {
        title: "Gemma 2B",
        info: "google/gemma-2b",
        icon: "/assets/modelData/gemma.webp",
        api: "/api/chat/google/gemma/gemma-2b",
        description: "Text generation with Google's Gemma model.",
      },
      {
        title: "Gemma 1.1 2B",
        info: "google-gemma-1.1-2b",
        icon: "/assets/modelData/gemma.webp",
        api: "/api/chat/google/gemma/gemma-1.1-2b",
        description: "Text generation with Google's Gemma model.",
      },
      {
        title: "Gemma 1.1 7B",
        info: "google-gemma-1.1-7b",
        icon: "/assets/modelData/gemma.webp",
        api: "/api/chat/google/gemma/gemma-1.1-7b",
        description: "Text generation with Google's Gemma model.",
      },
      {
        title: "Claude 3.5 Sonnet",
        info: "claude-3.5-sonnet",
        icon: "/assets/modelData/claude.webp",
        api: "/api/chat/anthropic/claude/claude-3.5-sonnet",
        description: "Most advanced text generation with Claude.",
      },
      {
        title: "Claude 3 Opus",
        info: "coming-soon",
        icon: "/assets/modelData/claude.webp",
        api: "/api/chat/anthropic/claude/claude-3-opus",
        description: "Text generation with Claude for long-form content.",
      },
      {
        title: "Claude 3.5 Haiku",
        info: "coming-soon",
        icon: "/assets/modelData/claude.webp",
        api: "/api/chat/anthropic/claude/claude-3.5-haiku",
        description: "Text generation with Claude for Haiku poems.",
      },
      {
        title: "Recurrent Gemma",
        info: "google-recurrent-gemma",
        icon: "/assets/modelData/gemma.webp",
        api: "/api/chat/google/gemma/recurrent-gemma",
        description: "Recurrent text generation with Google's Gemma model.",
      },
      {
        title: "Microsoft Phi 3",
        info: "microsoft-phi-3-mini-4k",
        icon: "/assets/modelData/microsoft.png",
        api: "/api/chat/microsoft/phi-3-mini-4k",
        description: "Text generation with Microsoft's Phi model.",
      },
      {
        title: "Fireworks AI",
        info: "fireworks",
        icon: "/assets/modelData/fireworks.png",
        api: "/api/chat/fireworks/chat",
        description: "Innovative text generation from Fireworks AI.",
      },
      {
        title: "Hugging Face",
        info: "hf",
        icon: "/assets/modelData/hf-logo.png",
        api: "/api/chat/hf/chat",
        description: "Versatile text generation from Hugging Face.",
      },
      {
        title: "Mistral-7B-Instruct-v0.1",
        info: "mistral-7b-instruct-v0.1",
        icon: "/assets/modelData/mistral.png",
        api: "/api/chat/hf/mistralai/mistral-7b-instruct-v0.1",
        description: "Instruction-tuned model for text generation.",
      },
      {
        title: "Mistral-7B-Instruct-v0.2",
        info: "mistral-7b-instruct-v0.2",
        icon: "/assets/modelData/mistral.png",
        api: "/api/chat/hf/mistralai/mistral-7b-instruct-v0.2",
        description: "Improved instruction-tuned text generation.",
      },
      {
        title: "Mistral-7B-Instruct-v0.3",
        info: "mistral-7b-instruct-v0.3",
        icon: "/assets/modelData/mistral.png",
        api: "/api/chat/hf/mistralai/mistral-7b-instruct-v0.3",
        description: "Latest version of instruction-tuned text generation.",
      },
      {
        title: "Mistral-7B-v0.1",
        info: "mistral-7b-v0.1",
        icon: "/assets/modelData/mistral.png",
        api: "/api/chat/hf/mistralai/mistral-7b-v0.1",
        description: "First version of Mistral's 7B model.",
      },
      {
        title: "Mistral-7B-v0.3",
        info: "mistral-7b-v0.3",
        icon: "/assets/modelData/mistral.png",
        api: "/api/chat/hf/mistralai/mistral-7b-v0.3",
        description: "Latest version of Mistral's 7B model.",
      },
      {
        title: "Bloom",
        info: "bigscience-bloom",
        icon: "/assets/modelData/big-science.webp",
        api: "/api/chat/hf/bigscience/bloom",
        description: "Text generation with Bloom from BigScience.",
      },
      {
        title: "Vicuna",
        info: "lmsys-vicuna",
        icon: "/assets/modelData/lmsys.webp",
        api: "/api/chat/hf/lmsys/vicuna",
        description: "Text generation with Vicuna from LMSys.",
      },
      {
        title: "Falcon",
        info: "tiiuae-falcon-7B",
        icon: "/assets/modelData/tiiuae.webp",
        api: "/api/chat/hf/tiiuae/falcon-7B",
        description: "Text generation with Falcon from TiiUAE.",
      },
      {
        title: "Zephyr",
        info: "zephyr",
        icon: "/assets/modelData/hf-logo.png",
        api: "/api/chat/hf/zephyr",
        description: "Text generation with Zephyr from Hugging Face.",
      },
    ],
  },
  {
    category: "Image",
    title: "Image Models",
    description:
      "Uncover a range of image models for generating, refining, and analyzing visual content with precision.",
    models: [
      {
        title: "Dall-E 3",
        info: "coming-soon",
        icon: "/assets/modelData/gpt.png",
        description: "Advanced image generation with DALL-E 3.",
      },
      {
        title: "Dall-E 2",
        info: "coming-soon",
        icon: "/assets/modelData/gpt.png",
        description: "Innovative image generation with DALL-E 2.",
      },
      {
        title: "Image Generation",
        info: "image-generation",
        icon: "/assets/modelData/midjourney.png",
        description: "Generate images based on text prompts.",
      },
      {
        title: "Refine Image",
        info: "image-refine",
        icon: "/assets/modelData/hf-logo.png",
        description: "Enhance and refine images.",
      },
      {
        title: "Image Detection",
        info: "image-detection",
        icon: "/assets/modelData/meta.png",
        description: "Detect objects within images.",
      },
      {
        title: "Visual Question Answering",
        info: "image-question",
        icon: "/assets/modelData/dandelin.png",
        description: "Answer questions about images.",
      },
      {
        title: "Image Classification",
        info: "image-classification",
        icon: "/assets/modelData/microsoft.png",
        description: "Classify images into categories.",
      },
      {
        title: "Image Segmentation",
        info: "image-segmentation",
        icon: "/assets/modelData/meta.png",
        description: "Segment images into parts.",
      },
      // {
      //   title: "Image to Text",
      //   info: "image-to-text",
      //   icon: "/assets/modelData/hf-logo.png",
      //   description: "Extract text from images.",
      // },
    ],
  },
  {
    category: "Audio",
    title: "Audio Models",
    description:
      "Dive into audio models for transcription, enhancement, and innovative audio processing techniques.",
    models: [
      {
        title: "OpenAI Wisper",
        info: "coming-soon",
        icon: "/assets/modelData/gpt.png",
        description: "Advanced audio processing with OpenAI Wisper.",
      },
      {
        title: "SDXL Turbo",
        info: "coming-soon",
        icon: "/assets/modelData/stability-ai.jpg",
        description: "Enhanced audio processing with SDXL Turbo.",
      },
      {
        title: "Stable Diffusion XL",
        info: "coming-soon",
        icon: "/assets/modelData/stability-ai.jpg",
        description: "Innovative audio processing with SDXL.",
      },
      {
        title: "Audio Transcription",
        info: "audio-transcribe",
        icon: "/assets/modelData/openai.png",
        description: "Transcribe audio files into text.",
      },
      {
        title: "Refine Audio",
        info: "audio-refine",
        icon: "/assets/modelData/speech.png",
        description: "Enhance and refine audio files.",
      },
      {
        title: "Speech Recognition",
        info: "coming-soon",
        icon: "/assets/modelData/speech-recognition.jpg",
        description: "Convert speech to text accurately.",
      },
      {
        title: "Audio to Audio",
        info: "coming-soon",
        icon: "/assets/modelData/demo/2.png",
        description: "Transform and enhance audio files.",
      },
      {
        title: "Text to Speech",
        info: "coming-soon",
        icon: "/assets/modelData/demo/3.png",
        description: "Convert text into natural-sounding speech.",
      },
      {
        title: "Audio Classification",
        info: "coming-soon",
        icon: "/assets/modelData/demo/4.png",
        description: "Categorize and analyze audio data.",
      },
    ],
  },
  {
    category: "Social-Media",
    title: "Social Media Automation",
    description:
      "Automate and optimize your social media presence with powerful tools for various platforms.",
    models: [
      {
        title: "YouTube Automation",
        info: "coming-soon",
        icon: "/assets/modelData/social-media/youtube.webp",
        description: "Manage YouTube content and interactions.",
      },
      {
        title: "Twitter Automation",
        info: "coming-soon",
        icon: "/assets/modelData/social-media/x.webp",
        description: "Automate tweets and engagement.",
      },
      {
        title: "Insta Automation",
        info: "coming-soon",
        icon: "/assets/modelData/social-media/insta.jpg",
        description: "Schedule posts and manage Instagram.",
      },
      {
        title: "Facebook Automation",
        info: "coming-soon",
        icon: "/assets/modelData/social-media/meta.webp",
        description: "Automate Facebook posts and interactions.",
      },
      {
        title: "LinkedIn Automation",
        info: "coming-soon",
        icon: "/assets/modelData/social-media/linkedin.png",
        description: "Optimize LinkedIn activity and connections.",
      },
      {
        title: "Whatsapp",
        info: "coming-soon",
        icon: "/assets/modelData/social-media/whatsapp.webp",
        description: "Automate WhatsApp messages and interactions.",
      },
      {
        title: "Pinterest Automation",
        info: "coming-soon",
        icon: "/assets/modelData/social-media/pinterest.jpg",
        description: "Automate Pinterest posts and engagement.",
      },
      // {
      //   title: "TikTok Automation",
      //   info: "coming-soon",
      //   icon: "/assets/modelData/social-media/tiktok.jpg",
      //   description: "Manage TikTok content and interactions.",
      // },
      {
        title: "Reddit Automation",
        info: "coming-soon",
        icon: "/assets/modelData/social-media/reddit.webp",
        description: "Automate Reddit posts and engagement.",
      },
    ],
  },
  {
    category: "Generators",
    title: "Generators",
    description:
      "Create impactful content with advanced generators for ads, logos, names, and more.",
    models: [
      {
        title: "Ad Generator",
        info: "coming-soon",
        icon: "/assets/modelData/demo/5.png",
        description: "Generate effective ad content.",
      },
      {
        title: "Logo Generator",
        info: "coming-soon",
        icon: "/assets/modelData/demo/1.png",
        description: "Design unique and professional logos.",
      },
      {
        title: "Name Generator",
        info: "coming-soon",
        icon: "/assets/modelData/demo/2.png",
        description: "Create memorable names for projects.",
      },
      {
        title: "Sub Generator",
        info: "coming-soon",
        icon: "/assets/modelData/demo/3.png",
        description: "Generate subtitles for video content.",
      },
    ],
  },
  {
    category: "Video",
    title: "Video Models",
    description:
      "Explore cutting-edge video models designed to transform and enhance video content.",
    models: [
      {
        title: "OpenAI Sora",
        info: "coming-soon",
        icon: "/assets/modelData/gpt.png",
        description: "Advanced video processing with OpenAI Sora.",
      },
      {
        title: "Google Veo",
        info: "coming-soon",
        icon: "/assets/modelData/google-veo.png",
        description: "Innovative video processing with Google Veo.",
      },
      {
        title: "Stable Video Diffusion",
        info: "coming-soon",
        icon: "/assets/modelData/stability-ai.jpg",
        description: "Innovative video processing with SDXL.",
      },
      {
        title: "Coming Soon",
        info: "coming-soon",
        icon: "/assets/modelData/demo/5.png",
        description: "More Innovative video models are on the way.",
      },
    ],
  },
  // {
  //   category: "Document",
  //   title: "Document Models",
  //   description:
  //     "Optimize document management with tools designed to handle and process various document types.",
  //   models: [
  //     {
  //       title: "Coming Soon",
  //       info: "coming-soon",
  //       icon: "/assets/modelData/demo/1.png",
  //       description: "Upcoming tools for document handling.",
  //     },
  //   ],
  // },
];
