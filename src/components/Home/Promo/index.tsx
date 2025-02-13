"use client";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/utils/cn";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import Image from "next/image";
import React, { forwardRef, useRef } from "react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

export function PromoDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-purple-600">Onyxium</h1>
        <p className="text-2xl text-gray-700 mt-4">Discover All Types of AI</p>
      </header>
      <div
        className="relative flex w-full max-w-[700px] items-center justify-center overflow-hidden rounded-lg border bg-background p-16 md:shadow-xl mb-36"
        ref={containerRef}
      >
        <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div1Ref}>
              <Icons.gemini className="h-6 w-6" />
            </Circle>
            <Circle ref={div5Ref}>
              <Icons.gemma className="h-6 w-6" />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div2Ref}>
              <Icons.microsoft className="h-6 w-6" />
            </Circle>
            <Circle ref={div4Ref} className="h-16 w-16">
              <Icons.onyxium className="h-6 w-6" />
            </Circle>
            <Circle ref={div6Ref}>
              <Icons.mistral className="h-6 w-6" />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div3Ref}>
              <Icons.huggingface className="h-6 w-6" />
            </Circle>
            <Circle ref={div7Ref}>
              <Icons.meta className="h-6 w-6" />
            </Circle>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div4Ref}
          curvature={-75}
          reverse
          endYOffset={-10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div4Ref}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={div4Ref}
          curvature={75}
          reverse
          endYOffset={10}
        />
      </div>
      <p className="text-lg text-center mb-8">
        Onyxium is built with the integration of various AI tools.
      </p>
    </div>
  );
}

const Icons = {
  onyxium: (_props: IconProps) => (
    <Image src="/Logo.png" alt="Onyxium" width={100} height={100} />
  ),
  gemini: (_props: IconProps) => (
    <Image
      src="/assets/modelData/google-gemini.webp"
      alt="Gemini"
      width={100}
      height={100}
    />
  ),
  gemma: (_props: IconProps) => (
    <Image
      src="/assets/modelData/gemma.webp"
      alt="Gemma"
      width={100}
      height={100}
    />
  ),
  microsoft: (_props: IconProps) => (
    <Image
      src="/assets/modelData/microsoft.png"
      alt="Microsoft"
      width={100}
      height={100}
    />
  ),
  huggingface: (_props: IconProps) => (
    <Image
      src="/assets/modelData/hf-logo.png"
      alt="Hugging Face"
      width={100}
      height={100}
    />
  ),
  mistral: (_props: IconProps) => (
    <Image
      src="/assets/modelData/mistral.png"
      alt="Mistral Ai"
      width={100}
      height={100}
    />
  ),
  meta: (_props: IconProps) => (
    <Image
      src="/assets/modelData/meta.png"
      alt="Meta"
      width={100}
      height={100}
    />
  ),
  midjourney: (_props: IconProps) => (
    <Image
      src="/assets/modelData/midjourney.png"
      alt="Midjourney"
      width={100}
      height={100}
    />
  ),
};
