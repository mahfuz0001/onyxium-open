"use client";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { AmbientColor } from "./ambient-color";
import { Button } from "./button";
import { Container } from "./container";
import { FeaturedImages } from "./featured-images";
import { MacbookScroll } from "./macbook";

export const CTA = () => {
  return (
    <div className="relative">
      <AmbientColor />
      <Container className="flex flex-col md:flex-row justify-between items-center w-full px-8">
        <div className="flex flex-col">
          <motion.h2 className="text-white text-xl text-center md:text-left md:text-3xl font-bold mx-auto md:mx-0 max-w-xl ">
            Get started today with Alvo to kickstart your marketing efforts
          </motion.h2>
          <p className="max-w-md mt-8 text-center md:text-left text-sm md:text-base mx-auto md:mx-0 text-neutral-400">
            Alvo integrates AI tools from different providers to help you
            streamline your day to day tasks.
          </p>
          <FeaturedImages
            textClassName="lg:text-left text-center"
            className="lg:justify-start justify-start items-center"
            containerClassName="md:items-start"
            showStars
          />
        </div>
        <Button className="flex space-x-2 items-center group !text-lg">
          <span>Try Alvo</span>
          <HiArrowRight className="text-black group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
        </Button>
      </Container>
      <MacbookScroll src={`/dashboard.png`} showGradient={true} />
    </div>
  );
};
