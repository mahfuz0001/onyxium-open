"use server";

import {
  MAX_ADVANCED_COUNTS,
  MAX_BASIC_COUNTS,
  MAX_FREE_COUNTS,
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

export const getMaxCountForPlan = async (
  plan: string,
  isLifetime: boolean
): Promise<number> => {
  if (isLifetime) {
    if (plan === "Basic") return MAX_LIFETIME_BASIC_COUNTS;
    if (plan === "Advanced") return MAX_LIFETIME_ADVANCED_COUNTS;
    if (plan === "Professional") return MAX_LIFETIME_PROFESSIONAL_COUNTS;
    return MAX_FREE_COUNTS;
  } else {
    if (plan === "Basic") return MAX_BASIC_COUNTS;
    if (plan === "Advanced") return MAX_ADVANCED_COUNTS;
    return MAX_FREE_COUNTS;
  }
};

export const getUserPlan = async (
  userId: string
): Promise<{ plan: string; isLifetime: boolean }> => {
  const supabase = createClient();

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("price_id")
    .eq("user_id", userId);

  if (error || !subscriptions || subscriptions.length === 0) {
    console.error(`Error fetching subscription for user ${userId}:`, error);
    console.log(`User ${userId} has no subscription, defaulting to Free plan.`);
    return { plan: "Free", isLifetime: false };
  }

  console.log(`User ${userId} subscriptions:`, subscriptions);

  let plan = "Free";
  let isLifetime = false;

  subscriptions.forEach((subscription) => {
    const { price_id } = subscription;

    // Upgrade the plan based on the highest available subscription
    if (
      price_id === PRICEID_LIFETIME_PROFESSIONAL ||
      price_id === PRICEID_LIFETIME_ADVANCED ||
      price_id === PRICEID_LIFETIME_BASIC
    ) {
      isLifetime = true;
    }

    if (price_id === PRICEID_LIFETIME_PROFESSIONAL) {
      plan = "Professional";
    } else if (price_id === PRICEID_LIFETIME_ADVANCED) {
      plan = "Advanced";
    } else if (price_id === PRICEID_LIFETIME_BASIC) {
      plan = "Basic";
    } else if (
      price_id === PRICEID_MONTHLY_ADVANCED ||
      price_id === PRICEID_YEARLY_ADVANCED
    ) {
      plan = "Advanced";
    } else if (
      price_id === PRICEID_MONTHLY_BASIC ||
      price_id === PRICEID_YEARLY_BASIC
    ) {
      plan = "Basic";
    }
  });

  console.log(`User ${userId} has plan: ${plan}, isLifetime: ${isLifetime}`);

  return { plan, isLifetime };
};


export const increaseApiLimit = async () => {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user?.user?.id) {
    console.error(
      "User not authenticated or error fetching user data:",
      userError
    );
    return;
  }

  const userId = user.user.id;

  try {
    const { data: userApiLimit, error: apiLimitError } = await supabase
      .from("users")
      .select("count")
      .eq("id", userId)
      .single();

    if (apiLimitError || !userApiLimit) {
      console.error("Error fetching user API limit:", apiLimitError);
      return;
    }

    const { count } = userApiLimit;

    await supabase
      .from("users")
      .update({ count: count + 1 })
      .eq("id", userId);
  } catch (error) {
    console.error("Error increasing user API limit:", error);
  }
};

export const checkApiLimit = async (): Promise<boolean> => {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user?.user?.id) {
    console.error(
      "User not authenticated or error fetching user data:",
      userError
    );
    return false;
  }

  const userId = user.user.id;

  try {
    const { data: userApiLimit, error: apiLimitError } = await supabase
      .from("users")
      .select("count")
      .eq("id", userId)
      .single();

    if (apiLimitError || !userApiLimit) {
      console.error("Error fetching user API limit:", apiLimitError);
      return false;
    }

    const { count } = userApiLimit;

    const { plan, isLifetime } = await getUserPlan(userId);
    const maxCount = await getMaxCountForPlan(plan, isLifetime);

    // console.log(`User ID: ${userId}`);
    // console.log(`Current API Count: ${count}`);
    // console.log(`User Plan: ${plan}, Is Lifetime: ${isLifetime}`);
    // console.log(`Max API Count Allowed: ${maxCount}`);

    const withinLimit = count < maxCount;
    console.log(`API Limit Check Passed: ${withinLimit}`);
    return withinLimit;
  } catch (error) {
    console.error("Error checking user API limit:", error);
    return false;
  }
};

export const getApiLimitCount = async (): Promise<number> => {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user?.user?.id) {
    return 0;
  }

  const userId = user.user.id;

  try {
    const { data: userApiLimit, error: apiLimitError } = await supabase
      .from("users")
      .select("count")
      .eq("id", userId)
      .single();

    if (apiLimitError || !userApiLimit) {
      console.error("Error fetching user API limit count:", apiLimitError);
      return 0;
    }

    const { count } = userApiLimit;
    return count;
  } catch (error) {
    console.error("Error fetching user API limit count:", error);
    return 0;
  }
};
