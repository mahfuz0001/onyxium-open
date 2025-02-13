import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        This Page is Coming Soon!
      </h1>
      <p className="text-lg mb-8 text-gray-600">
        Stay tuned for something amazing! 🚀 This page is under development and
        will be available soon.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/"
          className="bg-[#5b42f3] text-white hover:bg-[#4c36e0] py-2 px-4 rounded-lg focus:outline-none transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="https://discord.gg/NMWYCpwUdp"
          className="text-sm font-semibold leading-6 py-2 px-4"
        >
          Learn more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
