"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const featuresData = [
  {
    title: "Image Recognition",
    image: "/assets/icons/img-recog.png",
    alt: "Image Recognition",
    description:
      "Easily identify objects, people, text, and more within images using advanced image recognition technology.",
  },
  {
    title: "Text Analysis",
    image: "/assets/icons/data-analysis.png",
    alt: "Text Analysis",
    description:
      "Analyze text for sentiment, keywords, entities, language, and other valuable insights using natural language processing (NLP) algorithms.",
  },
  {
    title: "Speech Recognition",
    image: "/assets/icons/voice.png",
    alt: "Speech Recognition",
    description:
      "Convert spoken language into text, enabling voice commands, transcriptions, and voice-controlled applications.",
  },
  {
    title: "More Features",
    image: "/assets/icons/verified.png",
    alt: "More Features",
    description:
      "Personalize user experiences and provide tailored recommendations based on user behavior and preferences.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Feature1 = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 bg-transparent">
      <div id="features">
        <div className="md:w-2/3 lg:w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-purple-600"
          >
            <path
              fillRule="evenodd"
              d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
              clipRule="evenodd"
            />
          </svg>

          <motion.h2
            className="my-8 text-2xl font-bold text-gray-700 md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            A technology-first approach to AI tools
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            Our AI tools are designed to help you get access to all the latest
            AI technologies in one place. From image recognition to text
            analysis, we've got you covered. Our tools are easy to use and can
            be used for a very low cost. Try them out today! Trust us, you won't
            be disappointed.
          </motion.p>
        </div>
        <motion.div
          className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10"
              variants={fadeInUp}
            >
              <div className="relative space-y-8 py-12 p-8">
                <Image
                  src={feature.image}
                  className="w-12"
                  width={512}
                  height={512}
                  loading="lazy"
                  alt={feature.alt}
                />

                <div className="space-y-2">
                  <h1 className="text-xl font-semibold text-gray-600 transition group-hover:text-black">
                    {feature.title}
                  </h1>
                  <p className="text-gray-600 line-clamp-4">
                    {feature.description}
                  </p>
                </div>
                <Link
                  href="/docs/features"
                  className="flex items-center justify-between group-hover:text-purple-600"
                >
                  <span className="text-sm">Read more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Feature1;
