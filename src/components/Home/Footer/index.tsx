"use client";

import { useInView } from "@/libs/hooks/useInView";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Ref } from "react";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

export default function Footer() {
  const [ref, isIntersecting] = useInView({ threshold: 0.2 }) as [
    Ref<HTMLElement> | undefined,
    boolean,
  ];

  const footerNavs = [
    {
      label: "Resources",
      items: [
        {
          href: "/contact",
          name: "Contact",
        },
        {
          href: "https://discord.gg/NMWYCpwUdp",
          name: "Support",
        },
        {
          href: "/pricing",
          name: "Pricing",
        },
      ],
    },
    {
      label: "Legal",
      items: [
        {
          href: "/terms-and-conditions",
          name: "Terms & Conditions",
        },
        {
          href: "/privacy-policy",
          name: "Privacy Policy",
        },
        {
          href: "/refund-policy",
          name: "Refund Policy",
        },
      ],
    },
    {
      label: "Explore",
      items: [
        {
          href: "/blogs",
          name: "Blogs",
        },
        {
          href: "/docs/features",
          name: "Features",
        },
        {
          href: "/docs/tutorials",
          name: "Tutorials",
        },
      ],
    },
    {
      label: "Company",
      items: [
        {
          href: "/partners",
          name: "Partners",
        },
        {
          href: "/careers",
          name: "Careers",
        },
        {
          href: "/affiliate",
          name: "Affiliate",
        },
      ],
    },
  ];

  const date = new Date();
  const year = date.getFullYear();

  return (
    <motion.footer
      className="pt-10 bg-gray-100"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 space-y-0 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mt-16 sm:space-y-0 justify-between">
          {footerNavs.map((item, idx) => (
            <motion.ul
              key={idx}
              className="space-y-4 text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isIntersecting ? 1 : 0,
                y: isIntersecting ? 0 : 20,
              }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <h4 className="text-gray-800 font-semibold sm:pb-2">
                {item.label}
              </h4>
              {item.items.map((el, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={el.href}
                    className="hover:text-gray-800 duration-150"
                  >
                    {el.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          ))}
        </div>
        <div className="mt-10 py-10 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isIntersecting ? 1 : 0,
              y: isIntersecting ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="text-gray-700"
          >
            © {year} Nexon Labs Ltd. All rights reserved.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isIntersecting ? 1 : 0,
              y: isIntersecting ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="mt-6 sm:mt-0 text-gray-500"
          >
            <ul className="flex items-center space-x-4">
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 border rounded-full flex items-center justify-center"
              >
                <Link href="https://github.com/OnyxiumAI">
                  <div className="flex flex-col items-center justify-center">
                    <AiFillGithub className="w-6 h-6" />
                    <span className="sr-only" aria-label="GitHub">
                      GitHub
                    </span>
                  </div>
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 border rounded-full flex items-center justify-center"
              >
                <Link href="https://x.com/OnyxiumOfficial">
                  <div className="flex flex-col items-center justify-center">
                    <AiFillTwitterCircle className="w-6 h-6" />
                    <span className="sr-only" aria-label="Twitter">
                      Twitter
                    </span>
                  </div>
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 border rounded-full flex items-center justify-center"
              >
                <Link href="https://www.linkedin.com/company/onyxiumai">
                  <div className="flex flex-col items-center justify-center">
                    <AiFillLinkedin className="w-6 h-6" />
                    <span className="sr-only" aria-label="LinkedIn">
                      LinkedIn
                    </span>
                  </div>
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 border rounded-full flex items-center justify-center"
              >
                <Link href="https://www.instagram.com/OnyxiumAi">
                  <div className="flex flex-col items-center justify-center">
                    <AiFillInstagram className="w-6 h-6" />
                    <span className="sr-only" aria-label="Instagram">
                      Instagram
                    </span>
                  </div>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
