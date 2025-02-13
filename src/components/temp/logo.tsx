import { Link } from "next-view-transitions";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-black px-2 py-1  relative z-20"
    >
      <Image src="/Logo.png" width={30} height={30} alt="Alvo" quality={100} />

      <span className="text-white font-bold">Alvo</span>
    </Link>
  );
};
