"use client";

import Image from "next/image";
import Link from "next/link";

const Navurl = () => {
  return (
    <>
      <div>
        <Link href="/dashboard" passHref rel="preload">
          <Image
            src="/favicon.ico"
            alt="Logo"
            height={50}
            width={40}
            className="rounded-md"
          />
        </Link>
      </div>

      <ul className="flex gap-4">
        <li>
          <Link
            href="/dashboard/"
            className="px-4 py-2 text-lg font-medium text-gray-500 bg-gray-100 rounded-md hover:bg-gray-300 transition duration-300"
            passHref
            rel="preload"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/profile/"
            className="px-4 py-2 text-lg font-medium text-gray-500 bg-gray-100 rounded-md hover:bg-gray-300 transition duration-300"
            passHref
            rel="preload"
          >
            Profile
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navurl;
