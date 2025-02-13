"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function CTA() {
  return (
    <div>
      <div className="mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <motion.div
            className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              variants={fadeInUp}
            >
              Empower your AI journey.
            </motion.h2>
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-300"
              variants={fadeInUp}
            >
              Unlock the potential of artificial intelligence with our powerful
              tools and resources. Elevate your projects and workflows to the
              next level.
            </motion.p>
            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"
              variants={fadeInUp}
            >
              <a
                href="/signin"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() =>
                  sendGAEvent("event", "buttonClicked", { value: "CTA Login" })
                }
              >
                Get started
              </a>
              <a
                href="/docs/getting-started"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative mt-16 h-80 lg:mt-8"
            initial="hidden"
            animate="visible"
            variants={imageVariant}
            transition={{ duration: 0.5 }}
          >
            <Image
              className="absolute left-0 top-0 max-w-xl rounded-md bg-white/5 ring-1 ring-white/10"
              src="/assets/images/generated.jpg"
              alt="App screenshot"
              width={848}
              height={640}
              loading="lazy"
              quality={100}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
