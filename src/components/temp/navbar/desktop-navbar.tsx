"use client";
import { Logo } from "@/components/temp/logo";
import { cn } from "@/utils/cn";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { Button } from "../button";
import { NavBarItem } from "./navbar-item";

type Props = {
  navItems: {
    link: string;
    title: string;
    target?: "_blank";
  }[];
};

export const DesktopNavbar = ({ navItems }: Props) => {
  const { scrollY } = useScroll();

  const [showBackground, setShowBackground] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });
  return (
    <motion.div
      className={cn(
        "w-full flex relative justify-between px-4 py-3 rounded-md  transition duration-200 bg-transparent mx-auto"
      )}
      animate={{
        width: showBackground ? "80%" : "100%",
        background: showBackground ? "var(--neutral-900)" : "transparent",
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <AnimatePresence>
        {showBackground && (
          <motion.div
            key={String(showBackground)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
            }}
            className="absolute inset-0 h-full w-full bg-neutral-900 pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent,white)] rounded-full"
          />
        )}
      </AnimatePresence>
      <div className="flex flex-row gap-2 items-center">
        <Logo />
        <div className="flex items-center gap-1.5">
          {navItems.map((item) => (
            <NavBarItem href={item.link} key={item.title} target={item.target}>
              {item.title}
            </NavBarItem>
          ))}
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <Button variant="simple" as={Link} href="/register">
          Register
        </Button>
        <Button>Book a demo</Button>
      </div>
    </motion.div>
  );
};
