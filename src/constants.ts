import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 10;
export const MAX_BASIC_COUNTS = 10000;
export const MAX_ADVANCED_COUNTS = 100000;

export const MAX_LIFETIME_BASIC_COUNTS = 10000;
export const MAX_LIFETIME_ADVANCED_COUNTS = 100000;
export const MAX_LIFETIME_PROFESSIONAL_COUNTS = 1000000;

export const PRODUCT_ID_BASIC = "prod_QheFGbLuvsyHPC";
export const PRODUCT_ID_ADVANCED = "prod_QheGtUNjxcTZiA";
export const PRODUCT_ID_LIFETIME = "prod_Qr1JPH90D3bBua";

export const PRICEID_MONTHLY_BASIC = "price_1PqEx3JJJuDA2AMfBVHQ57SV";
export const PRICEID_YEARLY_BASIC = "price_1PqEx3JJJuDA2AMfVKY10STn";
export const PRICEID_MONTHLY_ADVANCED = "price_1PqExYJJJuDA2AMfgIUn1oYC";
export const PRICEID_YEARLY_ADVANCED = "price_1PqEy9JJJuDA2AMfZEnzmmIb";

export const PRICEID_LIFETIME_BASIC = "price_1PzJGXJJJuDA2AMf24JhaMxI"; // $197
export const PRICEID_LIFETIME_ADVANCED = "price_1PzJGXJJJuDA2AMftX7j9UCi"; // $394
export const PRICEID_LIFETIME_PROFESSIONAL = "price_1PzJGXJJJuDA2AMfwGqC4hoh"; // $591

// TEST PRICES

// export const PRODUCT_ID_BASIC = "prod_QomNVEaMgYz8pk";
// export const PRODUCT_ID_ADVANCED = "prod_R2uGNDmwBy8Lm0";
// export const PRODUCT_ID_LIFETIME = "prod_R2uLNU9UrxTyxR";

// export const PRICEID_MONTHLY_BASIC = "price_1Px8pCJJJuDA2AMfFRnGFXVO";
// export const PRICEID_YEARLY_BASIC = "price_1Px8phJJJuDA2AMfpFQuhaNv";
// export const PRICEID_MONTHLY_ADVANCED = "price_1QAoRiJJJuDA2AMfCr2ZI069";
// export const PRICEID_YEARLY_ADVANCED = "price_1QAoRiJJJuDA2AMfYDrafx0e";

// export const PRICEID_LIFETIME_BASIC = "price_1QAoWdJJJuDA2AMf9Ohh9war"; // $197
// export const PRICEID_LIFETIME_ADVANCED = "price_1QAoWdJJJuDA2AMfoXChwR9Q"; // $394
// export const PRICEID_LIFETIME_PROFESSIONAL = "price_1QAoWdJJJuDA2AMfXrN16PA1"; // $591

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
  {
    label: "Plus Everything Else",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
];

export const demoQuestions = [
  "Who is the founder of Microsoft?",
  "Tell me a joke.",
  "How can I improve my productivity?",
  "What is the best way to learn a new language?",
];
