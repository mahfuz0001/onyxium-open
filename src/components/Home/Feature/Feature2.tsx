"use client";

import {
  ChatBubbleOvalLeftIcon as ChatIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  VideoCameraIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    id: 1,
    icon: DocumentTextIcon,
    text: "Organize and streamline your workflow efficiently.",
    title: "Document Automation",
  },
  {
    id: 2,
    icon: GlobeAltIcon,
    text: "Expand your reach with multi-language support.",
    title: "Global Accessibility",
  },
  {
    id: 3,
    icon: VideoCameraIcon,
    text: "Enhance your presentations with video integration.",
    title: "Video Integration",
  },
  {
    id: 4,
    icon: ChatIcon,
    text: "Communicate seamlessly with integrated chat features.",
    title: "Integrated Chat",
  },
];

export default function Feature2() {
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:py-20">
        <p className="font-inter mb-2 text-center text-base font-medium text-purple-600 mt-6">
          Features
        </p>
        <h1 className="text-center text-4xl font-bold lg:text-4xl">
          A feature for every need and every user.
        </h1>
        <p className="font-inter mx-auto mb-12 mt-4 max-w-lg px-5 text-center text-lg font-light text-gray-500">
          Our platform is designed to help you succeed. With a wide range of
          tools, Whether you're a individual or a team, we've got you covered.
        </p>

        <div className="grid gap-16 md:grid-cols-2 md:gap-4 lg:grid-cols-[1fr_340px_1fr]">
          <div className="flex flex-col justify-center items-start gap-16 md:gap-24">
            {features.slice(0, 2).map((feature, index) => (
              <motion.div
                key={feature.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                variants={fadeInUp}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-4 md:flex-row-reverse">
                  <div className="rounded-full bg-gray-100 p-2.5">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="max-w-xs text-2xl font-bold md:max-w-[256px] md:text-right">
                    {feature.title}
                  </p>
                </div>
                <h3 className="text-right text-gray-500 text-xl">
                  {feature.text}
                </h3>
              </motion.div>
            ))}
          </div>

          <div
            className="w-86 mt-4 h-88 bg-contain bg-[50%_100%] bg-no-repeat sm:mt-12 sm:h-[560px] sm:w-full md:mt-0"
            style={{
              backgroundImage:
                'url("https://assets.website-files.com/6458c625291a94a195e6cf3a/647b2f0c0e6afb25726156ec_Column.svg")',
            }}
          ></div>

          <div className="flex flex-col justify-center items-start gap-16 md:gap-24">
            {features.slice(2, 4).map((feature, index) => (
              <motion.div
                key={feature.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                variants={fadeInUp}
                className="flex flex-col gap-4 md:items-end"
              >
                <div className="flex items-center gap-4 md:flex-row-reverse">
                  <div className="rounded-full bg-gray-100 p-2.5">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="max-w-xs text-2xl font-bold md:max-w-[256px] md:text-right">
                    {feature.title}
                  </p>
                </div>
                <h3 className="text-right text-gray-500 text-xl">
                  {feature.text}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
