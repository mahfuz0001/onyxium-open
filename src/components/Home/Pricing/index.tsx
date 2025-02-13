"use client";

import Button from "@/components/ui/Button/index";
import {
  PRICEID_MONTHLY_ADVANCED,
  PRICEID_MONTHLY_BASIC,
  PRICEID_YEARLY_ADVANCED,
  PRICEID_YEARLY_BASIC,
} from "@/constants";
import type { Tables } from "@/types/types_db";
import { getErrorRedirect } from "@/utils/Helpers";
import { getStripe } from "@/utils/stripe/client";
import { checkoutWithStripe } from "@/utils/stripe/server";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type BillingInterval = "year" | "month";

type Subscription = Tables<"subscriptions">;
type Product = Tables<"products">;
type Price = Tables<"prices">;

interface ProductWithPrices extends Product {
  prices: {
    [key in BillingInterval]: string;
  };
}

interface SubscriptionWithProduct extends Subscription {
  prices: Price | null;
}

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  buttonText: string;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

const pricingPlans: { plans: Plan[] } = {
  plans: [
    {
      name: "Free",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "10 Free Generations",
        "7 Days History",
        "Limited Access to Models",
        "24/7 Email Support",
        "No Credit Card Required",
      ],
      buttonText: "Sign Up",
    },
    {
      name: "Basic",
      monthlyPrice: 19,
      yearlyPrice: 199,
      features: [
        "10K Generations Monthly",
        "30 Days History",
        "Full Access to Models",
        "Priority customer support",
        "3 Days Money Back Guarantee",
        "Access To All Premium Models",
        "Special Role in Discord",
        "Early Access to New Features",
      ],
      buttonText: "Subscribe",
    },
    // {
    //   name: "Starter",
    //   monthlyPrice: 69,
    //   yearlyPrice: 799,
    //   features: [
    //     "1,000 Credits Monthly",
    //     "30 Days History",
    //     "Full Access to Models",
    //     "Priority Customer Support",
    //     "3 Days Money Back Guarantee",
    //     "Access To All Premium Models",
    //     "Special Role in Discord",
    //   ],
    //   buttonText: "Subscribe",
    // },
    {
      name: "Advanced",
      monthlyPrice: 99,
      yearlyPrice: 999,
      features: [
        "Everything in Basic Plan",
        "Unlimited Generations",
        "Priority customer support",
        "Early Access to New Features",
        "Request Custom Models",
      ],
      buttonText: "Subscribe",
    },
  ],
};

const priceIdMapping: { [key: string]: { [key in BillingInterval]: string } } =
  {
    Free: { month: "price_free_monthly_id", year: "price_free_yearly_id" },
    Basic: {
      month: PRICEID_MONTHLY_BASIC,
      year: PRICEID_YEARLY_BASIC,
    },
    Advanced: {
      month: PRICEID_MONTHLY_ADVANCED,
      year: PRICEID_YEARLY_ADVANCED,
    },
  };

const handleStripeCheckout = async (
  priceId: string,
  currentPath: string,
  user: User | null,
  router: ReturnType<typeof useRouter>,
  setPriceIdLoading: (id: string | undefined) => void
) => {
  setPriceIdLoading(priceId);

  if (!user) {
    setPriceIdLoading(undefined);
    return router.push("/signin/signup");
  }

  const { errorRedirect, sessionId } = await checkoutWithStripe(
    { id: priceId } as Price,
    currentPath
  );

  if (errorRedirect) {
    setPriceIdLoading(undefined);
    return router.push(errorRedirect);
  }

  if (!sessionId) {
    setPriceIdLoading(undefined);
    return router.push(
      getErrorRedirect(
        currentPath,
        "An unknown error occurred.",
        "Please try again later or contact a system administrator."
      )
    );
  }

  const stripe = await getStripe();
  stripe?.redirectToCheckout({ sessionId });

  setPriceIdLoading(undefined);
};

const handleButtonClick = (
  plan: Plan,
  priceId: string,
  user: User | null | undefined,
  currentPath: string,
  router: ReturnType<typeof useRouter>,
  setPriceIdLoading: (id: string | undefined) => void
) => {
  if (plan.name === "Free") {
    router.push("/signin/signup");
  } else {
    if (user !== undefined && user !== null) {
      handleStripeCheckout(
        priceId,
        currentPath,
        user,
        router,
        setPriceIdLoading
      );
    }
  }
};

const Pricing: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string | undefined>();
  const currentPath = usePathname();

  const handleButtonClickWrapper = (plan: Plan) => {
    const priceId = priceIdMapping[plan.name]?.[billingInterval];
    if (priceId) {
      handleButtonClick(
        plan,
        priceId,
        user,
        currentPath,
        router,
        setPriceIdLoading
      );
    }
  };

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-manrope text-5xl text-center font-bold text-gray-900 mb-4">
            Choose your plan
          </h2>
          <p className="text-gray-500 text-center leading-6 mb-9">
            10 Free Generations. No credit card required.
          </p>
          <div className="flex justify-center items-center">
            <label className="min-w-[3.5rem] text-xl relative text-gray-900 mr-4 font-medium">
              Bill Monthly
            </label>
            <input
              type="checkbox"
              id="basic-with-description"
              className="relative shrink-0 w-11 h-6 p-0.5 bg-purple-100 checked:bg-none checked:bg-purple-100 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:border-purple-600 appearance-none before:inline-block before:w-5 before:h-5 before:bg-purple-600 checked:before:bg-purple-600 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:transition before:ease-in-out before:duration-200"
              onChange={() =>
                setBillingInterval(
                  billingInterval === "month" ? "year" : "month"
                )
              }
              checked={billingInterval === "year"}
            />
            <label className="relative min-w-[3.5rem] font-medium text-xl text-gray-500 ml-4 ">
              Bill Yearly
            </label>
          </div>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0 lg:items-center">
          {pricingPlans.plans.map((plan) => (
            <div key={plan.name} className="relative">
              {plan.name === "Basic" && (
                <div className="absolute top-[-3rem] mt-4 left-0 right-0 mx-auto w-40 uppercase bg-gradient-to-r from-purple-600 to-violet-600 rounded-t-2xl p-3 text-center text-white">
                  MOST POPULAR
                </div>
              )}
              <div
                className={`flex flex-col mx-auto max-w-sm text-gray-900 rounded-2xl ${
                  plan.name === "Advanced" ? "bg-indigo-50" : "bg-gray-50"
                } p-6 xl:py-9 xl:px-12 transition-all duration-500 hover:${
                  plan.name === "Advanced" ? "bg-purple-100" : "bg-gray-100"
                }`}
              >
                <h3 className="font-manrope text-2xl font-bold mb-3">
                  {plan.name}
                </h3>
                <div className="flex items-center mb-6">
                  <span
                    className={`font-manrope mr-2 text-6xl font-semibold ${
                      plan.name === "Basic" || plan.name === "Advanced"
                        ? "text-purple-600"
                        : ""
                    }`}
                  >
                    $
                    {billingInterval === "month"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </span>
                  <span className="text-xl text-gray-500">
                    / {billingInterval === "month" ? "month" : "year"}
                  </span>
                </div>
                <ul className="mb-12 space-y-6 text-left text-lg text-gray-500">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-4">
                      <svg
                        className="h-6 w-6 flex-shrink-0 text-purple-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`text-lg font-medium transition-all duration-500 ${
                    plan.name === "Basic" || plan.name === "Advanced"
                      ? "text-purple-600 bg-white hover:bg-gray-200 hover:text-purple-600"
                      : "text-purple-600 bg-white hover:bg-gray-200 hover:text-purple-600"
                  }`}
                  onClick={() => handleButtonClickWrapper(plan)}
                  disabled={
                    priceIdLoading ===
                    priceIdMapping[plan.name]?.[billingInterval]
                  }
                >
                  {priceIdLoading ===
                  priceIdMapping[plan.name]?.[billingInterval]
                    ? "Loading..."
                    : plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
