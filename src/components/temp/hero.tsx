"use client";
import { AnimatedShinyText } from "@/components/temp/ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { HiArrowRight } from "react-icons/hi2";
import Beam from "./beam";
import { Button } from "./button";
import { Container } from "./container";
import { FeaturedImages } from "./featured-images";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { VideoModal } from "./video-modal";

export const Hero = () => {
  const router = useRouter();

  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1.2];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <div
      ref={containerRef}
      className="flex flex-col min-h-[70rem] md:min-h-[100rem] pt-20 md:pt-40 relative overflow-hidden"
    >
      <Container className="flex  flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Introducing Alvo ✨</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
        <Heading
          as="h1"
          className="text-4xl md:text-4xl lg:text-8xl font-semibold max-w-6xl mx-auto text-center mt-6 relative z-10  py-6"
        >
          Master AI Tools with Alvo
        </Heading>
        <Subheading className="text-center mt-2 md:mt-6 text-base md:text-xl text-neutral-200 dark:text-neutral-200-dark max-w-3xl mx-auto relative z-10">
          Discover AI, Automate Tasks, and Save Time. Alvo is the ultimate tool
          for mastering AI.
        </Subheading>
        <FeaturedImages
          textClassName="lg:text-left text-center"
          className="lg:justify-start justify-center items-center"
          showStars
        />
        <div className="flex items-center gap-4 justify-center my-10 relative z-10">
          <Button className="flex space-x-2 items-center group !text-lg">
            <span>Try Alvo</span>{" "}
            <HiArrowRight className="text-black group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
          </Button>
        </div>
      </Container>
      <div className="flex  items-center justify-center relative p-2 md:p-20 cursor-pointer md:-mt-20">
        <div
          className="w-full relative"
          style={{
            perspective: "1000px",
          }}
        >
          <Card rotate={rotate} translate={translate} scale={scale}>
            <Image
              src={`/dashboard.png`}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-md grayscale group-hover:grayscale-0 transition duration-200 object-cover object-left-top h-full  md:object-left-top"
              draggable={false}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        translateY: translate,
        // scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-6xl z-40 group -mt-12 mx-auto isolate group h-[20rem] md:h-[50rem] w-full border-4 border-neutral-900 p-2 md:p-2 bg-[#08090A] rounded-[30px] shadow-2xl relative"
    >
      <Beam showBeam className="-top-1 block" />
      <div className="absolute h-40 w-full bottom-0 md:-bottom-10 inset-x-0 scale-[1.2] z-20 pointer-events-none bg-[#08090A] [mask-image:linear-gradient(to_top,white_30%,transparent)]" />
      <div className="absolute inset-0 z-20  bg-transparent group-hover:bg-black/0 transition-all duration-200 flex items-center justify-center">
        <VideoModal />
      </div>
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-transparent md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
};
