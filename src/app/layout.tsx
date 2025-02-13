import "@/styles/global.css";

import { TailwindIndicator } from "@/components/Chat/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Suspense } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Onyxium - Find all the best AI models in one single platform",
  description: "Discover and use a variety of AI tools for everyday tasks.",
  manifest: "/site.webmanifest",
  abstract: "A comprehensive platform for AI tools.",
  keywords:
    "ai, artificial intelligence, ai tool, tools, ai chatbot, midjourney, midjourney ai, openai, llm ai, dall e, chatgpt 4, ai chat, c ai, ai text generator, cognitive ai, poly ai, generative ai, free ai art generator, gpt 3, document ai, chatbot ai, ai assistant, vertex ai, openai api, best ai chatbot, ai learning, ai website, robot chat, vision ai, google cloud ai, ai in business, best ai websites, new ai",
  applicationName: "Onyxium",
  category: "AI",
  classification: "Software",
  creator: "@fuziouss",
  generator: "AI tools",
  robots: "index, follow",
  openGraph: {
    title: "Onyxium - Find all the best AI models in one single platform",
    description:
      "Unlock the potential of artificial intelligence with our powerful tools and resources. Elevate your projects and workflows to the next level.",
    url: "https://onyxium.org/",
    images: [
      {
        url: "https://onyxium.org/github-public-image.png",
        width: 1200,
        height: 630,
        alt: "Onyxium",
      },
    ],
    type: "website",
    countryName: "United States",
    determiner: "the",
    emails: ["admin@onyxium.org"],
    siteName: "Onyxium",
    videos: [
      {
        url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
        width: 1920,
        height: 1080,
      },
    ],
    ttl: 60,
  },
  twitter: {
    title: "Onyxium - Find all the best AI models in one single platform",
    description:
      "Unlock the potential of artificial intelligence with our powerful tools and resources. Elevate your projects and workflows to the next level.",
    card: "summary_large_image",
    site: "@fuziouss",
    creator: "@fuziouss",
    images: {
      url: "https://onyxium.org/github-public-image.png",
      width: 1200,
      height: 630,
      alt: "Onyxium",
    },
    creatorId: "@fuziouss",
    siteId: "@fuziouss",
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
    me: process.env.ME_VERIFICATION,
  },
  referrer: "origin",
  other: {
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "/mstile-144x144.png",
    "msapplication-config": "/browserconfig.xml",
    "application-name": "Onyxium",
    "apple-mobile-web-app-title": "Onyxium",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black",
    "mobile-web-app-capable": "yes",
    "apple-touch-startup-image": "/apple-touch-startup-image.png",
    "apple-mobile-web-app-image": "/apple-touch-icon.png",
    "format-detection": "telephone=no",
    referrer: "origin",
    robots: "index, follow",
    googlebot: "index, follow",
    bingbot: "index, follow",
    yandex: "index, follow",
    "yandex-verification": "yandex-verification",
    "yahoo-verification": "yahoo-verification",
    "google-site-verification": "google-site-verification",
    "google-adsense-account": "ca-pub-7861511190611402",
  },
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

const CrispWithNoSSR = dynamic(() => import("@/components/Support/crisp"), {
  // ssr: false,
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className="">
      <Script
        async
        src="https://cdn.promotekit.com/promotekit.js"
        data-promotekit="6d3dc606-cf46-4292-9031-58218c9df73c"
      />
      <script
        defer
        async
        data-domain="onyxium.org"
        src="https://plausible.io/js/script.js"
      ></script>
      <body>
        <CrispWithNoSSR />
        <Analytics debug={false} />
        <SpeedInsights debug={false} />
        {children}
        <GoogleAnalytics gaId="G-BVY2LJPTQ5" />
        <GoogleAnalytics gaId="G-K4MS2H5K0Z" />
        <GoogleAnalytics gaId="G-NG183M6KDS" />
        <GoogleTagManager gtmId="GTM-KRJX2SC2" />
        <Suspense>
          <Toaster />
        </Suspense>
        <TailwindIndicator />
      </body>
    </html>
  );
}

export const runtime = "edge";
