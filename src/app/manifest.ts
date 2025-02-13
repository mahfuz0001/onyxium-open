import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Onyxium - Find all the best AI models in one single platform",
    short_name: "Onyxium",
    description: "Discover and use a variety of AI tools for everyday tasks.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    lang: "en",
    categories: ["productivity", "tools"],
    dir: "ltr",
    orientation: "any",
    protocol_handlers: [
      {
        protocol: "web+app",
        url: "/",
      },
    ],
    display_override: ["standalone"],
    id: "1",
    shortcuts: [
      {
        name: "Onyxium",
        short_name: "AI Tools",
        description:
          "Discover and use a variety of AI tools for everyday tasks.",
        url: "/",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "any",
            type: "image/x-icon",
          },
        ],
      },
    ],
  };
}
