import Sidebar from "@/components/Chat/sidebar";
import Nav from "@/components/Dashboard/Nav";
import { ModalProvider } from "@/components/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { modelData } from "@/data/modelData";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
  title: "Tools - Onyxium",
};

export default async function AppLayout(
  props: { children: React.ReactNode },
  context: { isLifetime?: boolean } = {}
) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  const isLifetime = context.isLifetime ?? false;

  return (
    <div className="flex h-full antialiased">
      <div className="hidden md:block">
        <Sidebar data={modelData} />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="px-5 md:px-0 py-5">
          <Nav isLifetime={isLifetime} />
        </div>
        <Suspense>
          <Toaster />
        </Suspense>
        <ModalProvider />
        <div className="mt-4 flex-grow overflow-hidden">{props.children}</div>
      </div>
    </div>
  );
}
