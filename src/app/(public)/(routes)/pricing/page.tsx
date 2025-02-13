import { Footer, Pricing } from "@/components/Home";
import Header from "@/components/Home/Hero/Header";
import {
  getProducts,
  getSubscription,
  getUser,
} from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
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
  title: "Pricing - Onyxium AI",
};

export default async function Index() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  return (
    <main className="">
      <Header />
      <div className="mt-10">
        <Pricing
          user={user}
          products={products ?? []}
          subscription={subscription}
        />
      </div>
      <Footer />
    </main>
  );
}
