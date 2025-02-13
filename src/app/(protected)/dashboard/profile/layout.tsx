import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

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
  title: "Profile - Onyxium",
};

export default async function DashboardLayout(props: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  return (
    <>
      <div className="flex w-full flex-col px-14 py-5 antialiased bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        {props.children}
      </div>
      {/* <Toaster /> */}
    </>
  );
}
