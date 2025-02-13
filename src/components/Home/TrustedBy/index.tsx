import Image from "next/image";

export default function TrustedBy() {
  return (
    <div className="bg-white pt-24 sm:pt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="/assets/partners/Google_for_Startups_logo.svg"
            alt="Google for Startups"
            width={158}
            height={48}
          />
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="/assets/partners/Product_Hunt_Logo.svg"
            alt="Product Hunt"
            width={158}
            height={48}
          />
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="/assets/partners/Appsumo.png"
            alt="AppSumo"
            width={158}
            height={48}
          />
          <Image
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            src="/assets/partners/Hf-logo-with-title.svg"
            alt="Hugging Face"
            width={158}
            height={52}
          />
          <Image
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            src="/assets/partners/Vercel_logo_black.svg"
            alt="Vercel"
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}
