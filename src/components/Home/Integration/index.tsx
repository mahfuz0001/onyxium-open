"use client";
import SectionHeader from "@/Common/SectionHeader";
import { motion } from "framer-motion";
import Image from "next/image";

const brandData = [
  { src: "/assets/images/brand/brand-07.svg", alt: "Brand", type: "image" },
  { src: "", alt: "", type: "empty" },
  { src: "/assets/images/brand/brand-08.svg", alt: "Brand", type: "image" },
  { bg: "#FFDB26", type: "circle", size: "11px" },
  { src: "/assets/images/brand/brand-09.svg", alt: "Brand", type: "image" },
  { src: "", alt: "", type: "empty" },
  { bg: "#62E888", type: "circle", size: "15px" },
  { src: "/assets/images/brand/brand-10.svg", alt: "Brand", type: "image" },
  { bg: "#EF5C00", type: "circle", size: "23px" },
  { src: "/assets/images/brand/brand-11.svg", alt: "Brand", type: "image" },
  { bg: "#016BFF", type: "circle", size: "15px" },
  { src: "/assets/images/brand/brand-12.svg", alt: "Brand", type: "image" },
];

const Integration = () => {
  return (
    <section className="my-16">
      <div className="max-w-[86rem] mx-auto px-4 md:px-8 2xl:px-0">
        <SectionHeader
          headerInfo={{
            title: `AUTOMATIONS`,
            subtitle: `Automate Your Social Medias, From Anywhere, Anytime.`,
            description: `Our AI Tools Will Help You Automate All Your Social Media With Ease. Setup The Integration And We Will Handle It From There.`,
          }}
        />
      </div>

      <div className="max-w-[72rem] mt-15 pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-10 relative z-50 mx-auto px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="-z-1 absolute -top-3/4 h-full w-full">
          <Image
            width={1200}
            height={400}
            sizes="(max-width: 768px) 100vw"
            src="/assets/images/shape/shape-dotted-light.svg"
            alt="Dotted"
            className="dark:hidden"
            style={{ position: "static" }}
          />
          <Image
            fill
            src="/assets/images/shape/shape-dotted-dark.svg"
            alt="Dotted"
            className="hidden dark:block"
          />
        </div>
        <div className="flex flex-wrap justify-around gap-y-10 md:mt-5">
          {brandData.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-1/6"
            >
              {item.type === "image" && item.src ? (
                <div className="shadow-solid-7 dark:bg-btndark p-4.5 inline-block rounded-[10px] bg-white">
                  <Image width={50} height={50} src={item.src} alt={item.alt} />
                </div>
              ) : item.type === "circle" ? (
                <div
                  className="inline-block rounded-full"
                  style={{
                    backgroundColor: item.bg,
                    width: item.size,
                    height: item.size,
                  }}
                ></div>
              ) : (
                <div className="h-full"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integration;
