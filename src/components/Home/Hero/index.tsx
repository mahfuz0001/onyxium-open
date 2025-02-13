"use client";

import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { sendGAEvent } from "@next/third-parties/google";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "./Header";

const Hero = () => {
  const [isVideoPoppedUp, setVideoPopUp] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <section className="overflow-hidden">
      <div className="relative isolate px-6 lg:px-8">
        <Header />

        <motion.div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 1.5 }}
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </motion.div>
        <motion.div
          className="mx-auto max-w-2xl py-32 sm:py-48"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="hidden sm:mb-8 sm:flex sm:justify-center"
            variants={fadeInUp}
          >
            <AnimatedGradientText className="px-5 py-[6px]">
              Onyxium is now available for everyone 🚀
              <a
                href="https://discord.gg/NMWYCpwUdp"
                className="font-semibold text-purple-600  pl-2"
              >
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </AnimatedGradientText>
          </motion.div>
          <motion.div className="text-center" variants={fadeInUp}>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Unlock All Types of AI Tools, At Your Fingertips!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              <span className="text-purple-800">Try Onyxium Now!</span> Here
              you'll find all the AI tools you need in one place. From
              generating text to creating images, we've got you covered.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signin"
                onClick={() =>
                  sendGAEvent("event", "buttonClicked", {
                    value: "Hero Signup Click",
                  })
                }
              >
                <button className="overflow-hidden px-3.5 py-2.5 bg-black text-white border-none rounded-md text-md font-semibold cursor-pointer relative z-10 group">
                  Get Started
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                  <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                    Lets Go!
                  </span>
                </button>
              </Link>

              <a
                href="https://discord.gg/NMWYCpwUdp"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
            <div
              className="mt-6 flex justify-center gap-2"
              onClick={() =>
                sendGAEvent("event", "buttonClicked", {
                  value: "Click PH embeds",
                })
              }
            >
              <a
                href="https://www.producthunt.com/posts/onyxium-ai-2?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-onyxium&#0045;ai&#0045;2"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=468987&theme=light&period=daily"
                  alt="Onyxium&#0032;AI - Find&#0032;all&#0032;the&#0032;best&#0032;AI&#0032;models&#0032;in&#0032;one&#0032;single&#0032;platform | Product Hunt"
                  style={{ width: 200, height: 54 }}
                />
              </a>
              <a
                href="https://www.producthunt.com/posts/onyxium-ai-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-onyxium&#0045;ai&#0045;2"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=468987&theme=light"
                  alt="Onyxium AI - Find all the best AI models in one single platform | Product Hunt"
                  style={{ width: 200, height: 54 }}
                />
              </a>
              {/* <a
                href="https://www.producthunt.com/posts/onyxium-ai-2?embed=true&utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-onyxium&#0045;ai&#0045;2"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=468987&theme=light&period=weekly&topic_id=237"
                  alt="Onyxium AI - Find all the best AI models in one single platform | Product Hunt"
                  style={{ width: 200, height: 54 }}
                />
              </a> */}
              <a
                href="https://www.producthunt.com/posts/onyxium-ai-2?embed=true&utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-onyxium&#0045;ai&#0045;2"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=468987&theme=light&period=weekly&topic_id=267"
                  alt="Onyxium AI - Find all the best AI models in one single platform | Product Hunt"
                  style={{ width: 200, height: 54 }}
                />
              </a>
            </div>
            <div className="mt-1 flex justify-center gap-2"></div>
          </motion.div>
          <motion.div
            className="flex-1 max-w-4xl mx-auto mt-8"
            variants={fadeInUp}
          >
            <div className="relative">
              <Image
                src="/assets/images/hero.png"
                className="w-full rounded-lg"
                width={800}
                height={450}
                alt="App Preview"
                loading="eager"
              />
              <button
                className="absolute w-16 h-16 rounded-full inset-0 m-auto duration-150 bg-purple-500 hover:bg-purple-600 ring-offset-2 focus:ring text-white"
                name="play-video"
                onClick={() => setVideoPopUp(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6 m-auto"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                <span className="sr-only">Play Video</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 1.5 }}
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </motion.div>
      </div>
      {isVideoPoppedUp && (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center">
          <div
            className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur"
            onClick={() => setVideoPopUp(false)}
          ></div>
          <div className="px-4 relative">
            <button
              className="w-12 h-12 mb-5 rounded-full duration-150 bg-gray-800 hover:bg-gray-700 text-white"
              onClick={() => setVideoPopUp(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 m-auto"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
            <video
              className="rounded-lg w-full max-w-2xl"
              controls
              autoPlay={true}
              preload="auto"
              width="320"
              height="240"
            >
              <source src="/video/promo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
