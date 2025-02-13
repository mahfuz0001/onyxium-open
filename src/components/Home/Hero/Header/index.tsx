"use client";

import { createClient } from "@/utils/supabase/client";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { sendGAEvent } from "@next/third-parties/google";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Contact", href: "/contact" },
];

type User = /*unresolved*/ any;

const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<null | User>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user && !error) {
        setUser(data.user);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-50 lg:mx-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={fadeInDown}
      transition={{ duration: 0.5 }}
    >
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Onyxium</span>
            <Image
              className=""
              src="/Logo.png"
              height="60"
              width="60"
              alt="Logo"
              loading="eager"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div
          className="hidden lg:flex lg:flex-1 lg:justify-end"
          onClick={() =>
            sendGAEvent("event", "buttonClicked", { value: "Nav Login Click" })
          }
        >
          {user ? (
            <Link
              href="/dashboard"
              className="text-sm font-semibold leading-6 text-white p-3 bg-black rounded-lg"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/signin"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Onyxium</span>
              <Image
                className="h-8 w-auto"
                height={32}
                width={32}
                src="/Logo.png"
                alt="Logo"
                loading="eager"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white p-3 bg-black hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/signin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </motion.header>
  );
};

export default Header;
