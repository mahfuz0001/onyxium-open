"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentScrollPos = window.scrollY;
        setVisible(currentScrollPos < prevScrollPos || currentScrollPos < 100);
        setPrevScrollPos(currentScrollPos);
      }, 100); // Debounce the scroll event by 100ms
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`navbar-component fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        visible ? "" : "-translate-y-full"
      }`}
    >
      <header className="fixed inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-center lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Onyxium</span>
              <Image
                className="h-10 w-auto"
                src="/Logo.png"
                width="100"
                height="100"
                alt="Logo"
                loading="eager"
              />
            </a>
          </div>
          <div className="flex items-center justify-center lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden justify-center lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-500"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden items-center justify-center pl-8 lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/signin"
              className="flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 font-bold text-white transition duration-200 hover:bg-gray-900"
              rel="preload"
            >
              Get Started
            </Link>
          </div>
        </nav>
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Onyxium</span>
                <Image
                  className="h-8 w-auto"
                  src="/Logo.png"
                  width="100"
                  height="100"
                  alt="Logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-300/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/signin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-500 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
