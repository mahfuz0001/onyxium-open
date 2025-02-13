"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What is Onyxium?",
    answer:
      "Onyxium is a comprehensive platform for AI tools. It is a platform that allows you to discover and use a variety of AI tools for everyday tasks.",
  },
  {
    question: "How can I get started with Onyxium?",
    answer:
      "Getting started with Onyxium is easy. Simply sign up for an account and start exploring the various AI tools available on the platform.",
  },
  {
    question: "Is Onyxium free to use?",
    answer:
      "Onyxium offers a free trial that allows you to explore the platform and use some of the AI tools available. After the trial period, you can choose to subscribe to a plan that best suits your needs.",
  },
  {
    question: "What kind of AI tools are available on Onyxium?",
    answer:
      "Onyxium offers a wide range of AI tools for various tasks such as chatbots, text generators, image recognition, and more. You can explore the full range of tools available on the platform.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-28">
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <motion.h2
            className="text-3xl font-bold md:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-lg text-[#647084]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Have a question? Check out our frequently asked questions to find
            the answer.
          </motion.p>
        </div>
        <div className="mb-12 flex flex-col items-center">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-5 w-full max-w-4xl border-[#dfdfdf] p-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: openIndex === index ? "auto" : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                className="flex cursor-pointer justify-between"
                onClick={() => handleToggle(index)}
              >
                <motion.p
                  className="text-xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.question}
                </motion.p>
                <motion.div
                  className="relative ml-5 mt-1 flex h-5 w-5 items-center justify-center"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: openIndex === index ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="h-0.5 w-5 bg-purple-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: openIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
              <motion.div
                className="my-4 text-[#647084]"
                initial={{ opacity: 0 }}
                animate={{ opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Can’t find the answer you’re looking for? Reach out to our{" "}
          <a
            href="https://discord.gg/NMWYCpwUdp"
            className="text-purple-600 underline"
          >
            support team
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
