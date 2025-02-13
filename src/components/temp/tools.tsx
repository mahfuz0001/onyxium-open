"use client";
import {
  IconMailForward,
  IconSocial,
  IconTerminal,
  IconTool,
} from "@tabler/icons-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useRef, useState } from "react";
import { BlurImage } from "./blur-image";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { StickyScroll } from "./ui/sticky-scroll";

export const Tools = () => {
  const content = [
    {
      icon: <IconMailForward className="h-8 w-8 text-[#80ED99]" />,
      title: "Email Automation",
      description:
        "With our best in class email automation, you can automate your entire emailing process.",
      content: (
        <ImageContainer>
          <BlurImage
            src="/first.png"
            alt="dashboard"
            height="1000"
            width="1000"
            className="w-full rounded-lg shadow-xl shadow-brand/[0.2]"
          />
        </ImageContainer>
      ),
    },
    {
      icon: <IconSocial className="h-8 w-8 text-[#80ED99]" />,
      title: "Hands-On AI Testing",
      description:
        "We provide a hands-on experience to test your AI models in real-time.",
      content: (
        <ImageContainer>
          <BlurImage
            src="/second-backup.png"
            alt="dashboard"
            height="1000"
            width="1000"
            className="w-full rounded-lg shadow-xl shadow-brand/[0.2]"
          />
        </ImageContainer>
      ),
    },
    {
      icon: <IconTerminal className="h-8 w-8 text-[#80ED99]" />,
      title: "Multi-Tool Support",
      description: "We support multiple tools to help you with your AI models.",
      content: (
        <ImageContainer>
          <BlurImage
            src="/fourth-backup.png"
            alt="dashboard"
            height="1000"
            width="1000"
            className="w-full rounded-lg shadow-xl shadow-brand/[0.2]"
          />
        </ImageContainer>
      ),
    },
    {
      icon: <IconTerminal className="h-8 w-8 text-[#80ED99]" />,
      title: "Explore & Deploy AI Tools",
      description:
        "Explore and deploy AI tools with our best in class AI tools.",
      content: (
        <ImageContainer>
          <BlurImage
            src="/third.png"
            alt="dashboard"
            height="1000"
            width="1000"
            className="w-full rounded-lg shadow-xl shadow-brand/[0.2]"
          />
        </ImageContainer>
      ),
    },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const backgrounds = [
    "var(--charcoal)",
    "var(--neutral-900)",
    "var(--gray-900)",
  ];
  // const index = Math.round(scrollYProgress.get() * (backgrounds.length - 1));

  const [gradient, setGradient] = useState(backgrounds[0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / content.length);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (
          cardsBreakpoints[acc] !== undefined &&
          distance < Math.abs(latest - cardsBreakpoints[acc])
        ) {
          return index;
        }
        return acc;
      },
      0
    );
    setGradient(backgrounds[closestBreakpointIndex % backgrounds.length]);
  });
  return (
    <motion.div
      animate={{
        background: gradient,
      }}
      transition={{
        duration: 0.5,
      }}
      ref={ref}
      className="w-full relative h-full pt-20 md:pt-40"
    >
      <div className="px-6">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconTool className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading className="mt-4">The Best AI Tools</Heading>
        <Subheading>
          With our AI tools, you can automate your entire workflow and save
          time.
        </Subheading>
      </div>
      <StickyScroll content={content} />
    </motion.div>
  );
};

const ImageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg relative shadow-2xl">
      {children}
      <div className="absolute bottom-0 w-full h-px inset-x-0 bg-gradient-to-r from-transparent via-[#80ED99] to-transparent" />
      <div className="absolute bottom-0 w-40 mx-auto h-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </div>
  );
};
