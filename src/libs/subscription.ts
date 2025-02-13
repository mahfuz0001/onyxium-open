import {
  MAX_BASIC_COUNTS,
  MAX_LIFETIME_ADVANCED_COUNTS,
  MAX_LIFETIME_BASIC_COUNTS,
  MAX_LIFETIME_PROFESSIONAL_COUNTS,
  PRICEID_LIFETIME_ADVANCED,
  PRICEID_LIFETIME_BASIC,
  PRICEID_LIFETIME_PROFESSIONAL,
  PRICEID_MONTHLY_ADVANCED,
  PRICEID_MONTHLY_BASIC,
  PRICEID_YEARLY_ADVANCED,
  PRICEID_YEARLY_BASIC,
} from "@/constants";
import { createClient } from "@/utils/supabase/server";

export const checkSubscription = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  // If user is not authenticated, return default values
  if (!user.data?.user) {
    return { error: "User not authenticated", isPro: false, credits: 10 };
  }

  const userId = user.data.user.id;

  // Fetch redemption codes
  const { data: redeemedCodes, error: redemptionError } = await supabase
    .from("redemption_codes")
    .select("*")
    .eq("redeemed_by", userId);

  if (redemptionError) {
    return {
      error: redemptionError.message || "Failed to fetch redemption codes",
      isPro: false,
      credits: 10,
    };
  }

  let credits = 10; // Default credits
  let isPro = false;

  // Set credits based on the number of redeemed codes
  if (redeemedCodes && redeemedCodes.length > 0) {
    switch (redeemedCodes.length) {
      case 1:
        credits = MAX_LIFETIME_BASIC_COUNTS;
        break;
      case 2:
        credits = MAX_LIFETIME_ADVANCED_COUNTS;
        break;
      case 3:
        credits = MAX_LIFETIME_PROFESSIONAL_COUNTS;
        isPro = true; // Set isPro for professional users
        break;
    }
    return { isPro, credits }; // Return if redemption codes exist
  }

  // Check for active subscription if no redemption codes
  const { data: subscription, error: subscriptionError } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .eq("user_id", userId)
    .in("status", ["trialing", "active", "incomplete"])
    .maybeSingle();

  if (subscriptionError || !subscription) {
    return {
      error: subscriptionError?.message || "No active subscription",
      isPro: false,
      credits: 10,
    };
  }

  const isProductActive = subscription.prices?.products?.active;
  if (!isProductActive) {
    return {
      error: "Subscription product is inactive",
      isPro: false,
      credits: 10,
    };
  }

  // Check if the subscription has expired
  const currentPeriodEnd = new Date(subscription.current_period_end).getTime();
  if (currentPeriodEnd < Date.now()) {
    return { error: "Subscription expired", isPro: false, credits: 10 };
  }

  // Set credits based on the subscription priceId
  const priceId = subscription.prices.id;
  if (priceId === PRICEID_MONTHLY_BASIC || priceId === PRICEID_YEARLY_BASIC) {
    credits = MAX_BASIC_COUNTS;
  } else if (
    priceId === PRICEID_MONTHLY_ADVANCED ||
    priceId === PRICEID_YEARLY_ADVANCED
  ) {
    credits = Infinity; // Unlimited credits for advanced subscriptions
    isPro = true;
  } else if (priceId === PRICEID_LIFETIME_BASIC) {
    credits = MAX_LIFETIME_BASIC_COUNTS;
  } else if (priceId === PRICEID_LIFETIME_ADVANCED) {
    credits = MAX_LIFETIME_ADVANCED_COUNTS;
    isPro = true; // Set isPro for advanced users
  } else if (priceId === PRICEID_LIFETIME_PROFESSIONAL) {
    credits = MAX_LIFETIME_PROFESSIONAL_COUNTS;
    isPro = true; // Set isPro for professional users
  }

  return { isPro, credits }; // Final return with calculated values
};
