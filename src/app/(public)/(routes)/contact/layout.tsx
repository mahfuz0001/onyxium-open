import type { Metadata } from "next";

export const metadata: Metadata = {
  manifest: "/site.webmanifest",
  abstract: "A comprehensive platform for AI tools.",
  keywords:
    "ai, artificial intelligence, ai tool, tools, ai chatbot, midjourney, midjourney ai, openai, llm ai, dall e, chatgpt 4, ai chat, c ai, ai text generator, cognitive ai, poly ai, generative ai, free ai art generator, gpt 3, document ai, chatbot ai, ai assistant, vertex ai, openai api, best ai chatbot, ai learning, ai website, robot chat, vision ai, google cloud ai, ai in business, best ai websites, new ai",
  applicationName: "Onyxium",
  category: "AI",
  classification: "Software",
  creator: "@fuziouss",
  description: "Discover and use a variety of AI tools for everyday tasks.",
  generator: "AI Toolbox Generator",
  robots: "index, follow",
  title: "Contact Us - Onyxium",
};

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  return <div>{props.children}</div>;
}
