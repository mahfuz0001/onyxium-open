"use client";

import Button from "@/components/ui/Button/index";
import Card from "@/components/ui/Card";
import {
  PRICEID_LIFETIME_ADVANCED,
  PRICEID_LIFETIME_BASIC,
  PRICEID_LIFETIME_PROFESSIONAL,
} from "@/constants";
import { Tables } from "@/types/types_db";
import { createStripePortal } from "@/utils/stripe/server";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type Subscription = Tables<"subscriptions">;
type Price = Tables<"prices">;
type Product = Tables<"products">;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
  | (Price & {
    products: Product | null;
  })
  | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Directly access currency assuming it's always present
  const subscriptionPrice = subscription?.prices?.currency

  // Function to determine if the user has a lifetime plan
  const getLifetimePlan = () => {
    const priceId = subscription?.prices?.id;

    if (priceId === PRICEID_LIFETIME_BASIC) {
      return "Lifetime Basic Plan";
    } else if (priceId === PRICEID_LIFETIME_ADVANCED) {
      return "Lifetime Advanced Plan";
    } else if (priceId === PRICEID_LIFETIME_PROFESSIONAL) {
      return "Lifetime Professional Plan";
    }
    return "Lifetime Plan";
  };

  const lifetimePlan = getLifetimePlan();

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <Card
      title="Your Plan"
      description={
        subscription
          ? lifetimePlan
            ? `You are currently on the ${lifetimePlan}.`
            : `You are currently on the ${subscription?.prices?.products?.name} plan.`
          : "You are not currently subscribed to any plan."
      }
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">Manage your subscription on Stripe.</p>
          <Button
            variant="slim"
            onClick={handleStripePortalRequest}
            loading={isSubmitting}
          >
            Open customer portal
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        {subscription ? (
          lifetimePlan ? (
            lifetimePlan
          ) : (
            `${subscriptionPrice}/${subscription?.prices?.interval}`
          )
        ) : (
          <Link href="/pricing">Choose your plan</Link>
        )}
      </div>
    </Card>
  );
}
