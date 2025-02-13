"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const feedbackList = [
  {
    text: "“Congrats on the launch of Onyxium! This looks very handy for people who use AI tools a lot.”",
    imageSrc: "/assets/images/users/kehui-guo.png",
    name: "Kehui Guo",
    username: "Product Designer",
  },
  {
    text: "“Onyxium AI sounds like a game-changer! Having all the best AI tools in one place is exactly what I need to boost my productivity. Can't wait to see the future of innovation unfold here!”",
    imageSrc: "/assets/images/users/jayesh-gohel.jpeg",
    name: "Jayesh Gohel",
    username: "Founder & CEO",
  },
  {
    text: "“Really cool way to test and compare different models. Good to see such a high variety of models to choose from whether it is text/audio/images. There is a compatible model for each on of the use-cases.”",
    imageSrc: "/assets/images/users/sivay-lamba.jpeg",
    name: "Shivay Lamba",
    username: "Developer at Pieces",
  },
  {
    text: "“Onyxium sounds like a handy AI buddy! Just had a quick look and it seems pretty promising. Congrats on the launch!”",
    imageSrc: "/assets/images/users/ethen-gabriel.png",
    name: "Ethan Gabriel Fitzgerald",
    username: "Co-Founder of EchoStream",
  },
  {
    text: "“Pretty cool way to play around and leverage a list of different AI models so you don't need to set it up.”",
    imageSrc: "/assets/images/users/tony-han.jpeg",
    name: "Tony Han",
    username: "Product Manager",
  },
  {
    text: "“A platform we missed for a while! The market is so fragmented on model players we literally dunno where to shop. Good angle indeed.”",
    imageSrc: "/assets/images/users/yichen-jin.jpeg",
    name: "Yichen Jin",
    username: "Developer",
  },
  {
    text: "“Love the idea of having a trusty AI sidekick with Onyxium! The whole 'AI goodies' toolbox sounds super handy. The concept is really neat, like having a budget-friendly personal AI genie! Can't wait to try it out and see how it boosts creativity and productivity. Great job, Mahfuz!”",
    imageSrc: "/assets/images/users/jason-jackson.png",
    name: "Jason Jackson",
    username: "Co-Founder of DataStream",
  },
  {
    text: "“Amazing collection, really useful. Keep adding more Mahfuz.”",
    imageSrc: "/assets/images/users/ritwik-sachdeva.jpeg",
    name: "Ritwik Sachdeva",
    username: "Product, Engineering and Design.",
  },
  {
    text: "“Congratulations on the launch! 🚀Really cool to see Onyxium AI bringing all these AI models together in one spot! It sounds super handy.”",
    imageSrc: "/assets/images/users/naomi-garcia.jpeg",
    name: "Naomi Garcia",
    username: "Developer",
  },
  {
    text: "“Congrats on the launch! I’m so proud of what you’ve created. Can’t wait to dive into it. Well done! 👏💖”",
    imageSrc: "/assets/images/users/zulkar-naim.png",
    name: "Zulkar Naim",
    username: "Founder",
  },
  {
    text: "“The new AI tools sound really promising for everyday tasks. Excited to see how these enhancements improve user experience. The 25% OFF offer is a great incentive too! Looking forward to checking it out!”",
    imageSrc: "/assets/images/users/elke.png",
    name: "Elke",
    username: "Indie hacker",
  },
];

const firstColumn = feedbackList.slice(0, 4);
const secondColumn = feedbackList.slice(5, 7);
const thirdColumn = feedbackList.slice(8, 11);

const TestimonalsColumn = (props: {
  className?: string;
  testimonials: typeof feedbackList;
  duration?: number;
}) => (
  <div className={props.className} key={props.duration}>
    <motion.div
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[
        ...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, imageSrc, name, username }, i) => (
              <div
                key={`${name}-${i}`}
                className="p-10 border border-[#222222]/10 rounded-3xl shadow-[0_7px_14px_#EAEAEA] max-w-xs w-full"
              >
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <Image
                    src={imageSrc}
                    alt={name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                    priority
                  />
                  <div className="">
                    <div className="font-medium tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="leading-5 tracking-tight">{username}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        )),
      ]}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-white">
      <div className="px-4 md:px-8">
        <h2 className="mx-auto my-9 w-full max-w-3xl text-center text-3xl font-semibold md:mb-12 md:text-5xl">
          What
          <span className="bg-[url('/assets/app/bg-line.svg')] bg-contain bg-center bg-no-repeat px-4 text-white">
            Our Users
          </span>
          Are Saying
        </h2>
        <div className="flex flex-col items-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] mt-10 max-h-[738px] overflow-hidden md:flex-row md:justify-center">
          <TestimonalsColumn testimonials={firstColumn} duration={15} />
          <TestimonalsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonalsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
