// import {
//   CTA,
//   FAQ,
//   Features,
//   Feedback,
//   Footer,
//   Hero,
//   HowItWorks,
//   Integration,
//   Newsletter,
//   Pricing,
//   TrustedBy,
// } from "@/components/Home";
// import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
// import {
//   getProducts,
//   getSubscription,
//   getUser,
// } from "../../utils/supabase/queries";
import { AmbientColor } from "@/components/temp/ambient-color";
// import { AnimatedSvg } from "@/components/temp/animated-svg";
// import { Container } from "@/components/temp/container";
import { CTA } from "@/components/temp/cta";
import { FAQs } from "@/components/temp/faqs";
import { Features } from "@/components/temp/features";
import { FeatureIconContainer } from "@/components/temp/features/feature-icon-container";
import { Heading } from "@/components/temp/heading";
import { Hero } from "@/components/temp/hero";
import { PricingGrid } from "@/components/temp/pricing-grid";
import { Subheading } from "@/components/temp/subheading";
import { Testimonials } from "@/components/temp/testimonials";
// import { TestimonialsSlider } from "@/components/temp/testimonials/slider";
import { Footer } from "@/components/temp/footer";
import { NavBar } from "@/components/temp/navbar";
import { Tools } from "@/components/temp/tools";
import { IconReceiptFilled } from "@tabler/icons-react";

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
  title: "Onyxium - Find all the best AI models in one single platform",
};

export default async function Index() {
  // const supabase = createClient();
  // const [user, products, subscription] = await Promise.all([
  //   getUser(supabase),
  //   getProducts(supabase),
  //   getSubscription(supabase),
  // ]);

  return (
    // <main>
    //   <Hero />
    //   <Features />
    //   <TrustedBy />
    //   <HowItWorks />
    //   <Pricing
    //     user={user}
    //     products={products ?? []}
    //     subscription={subscription}
    //   />
    //   <Feedback />
    //   <Integration />
    //   <CTA />
    //   <Newsletter />
    //   <FAQ />
    //   <Footer />
    // </main>
    <>
      <NavBar />
      <div className="relative overflow-hidden text-white bg-[#08090A] ">
        <AmbientColor />
        <Hero />
        <Features />
        <Tools />
        <Testimonials />
        <div className="py-20 sm:py-40">
          <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
            <IconReceiptFilled className="h-6 w-6 text-cyan-500" />
          </FeatureIconContainer>
          <Heading className="pt-4">Simple Pricing for All Users</Heading>
          <Subheading>
            Choose the plan that fits your needs. No hidden fees. Cancel
            anytime.
          </Subheading>
          <PricingGrid />
          <FAQs />
        </div>
        <CTA />
      </div>
      <Footer />
    </>
  );
}
