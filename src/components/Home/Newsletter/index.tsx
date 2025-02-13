"use client";

import { Confetti } from "@/components/ui/confetti";
import { useInView } from "@/libs/hooks/useInView";
import { motion } from "framer-motion";
import { FormEvent, useState, type Ref } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [ref, isIntersecting] = useInView({ threshold: 0.2 }) as [
    Ref<HTMLElement> | undefined,
    boolean,
  ];

  const handleSubmit = async (e: FormEvent) => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    e.preventDefault();

    console.log("Email:", email);
    setMessage("Subscribing...");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    console.log(data);

    if (res.status === 200) {
      setMessage("Congratulations! Welcome to our family. 🎉");
      setEmail("");

      const frame = () => {
        if (Date.now() > end) return;

        Confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        Confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <section ref={ref}>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="bg-gray-100 p-10 rounded-xl text-center sm:p-10 md:p-16">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Subscribe to our newsletter.
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-gray-500 sm:text-base md:mb-10 lg:mb-12">
            Stay updated with the latest developments in AI and get exclusive
            insights and resources delivered to your inbox.
          </p>
          <div className="mx-auto mb-4 flex max-w-lg justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                className="h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-gray-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="submit"
                value="Subscribe"
                className="cursor-pointer rounded-md bg-purple-700 px-6 py-2 font-semibold text-white hover:bg-purple-600 transition-all duration-100 ease-in-out"
              />
            </form>
          </div>
          {message && (
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={
                isIntersecting ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }
              }
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-4 text-sm text-gray-500"
            >
              {message}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
