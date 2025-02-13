"use server";

import { createClient } from "@/utils/supabase/server";

export async function redeemAppSumoCode(
  code: string,
  priceIdBasic: string,
  priceIdAdvanced: string,
  priceIdProfessional: string
) {
  const supabase = createClient();

  // Get the user from Supabase auth
  const {
    error: userError,
    data: { user },
  } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Error fetching user session:", userError);
    throw new Error("User not authenticated.");
  }

  if (!user.email) {
    throw new Error("User email is missing.");
  }

  // Check if the code is valid and not redeemed
  const { data: codeData, error: codeError } = await supabase
    .from("redemption_codes")
    .select("id, redeemed")
    .eq("code", code)
    .single();

  if (codeError) {
    console.error("Error fetching redemption code:", codeError);
    throw new Error("Failed to fetch redemption code.");
  }

  if (!codeData || codeData.redeemed) {
    console.error("Invalid or already redeemed code:", code);
    throw new Error("Invalid or already redeemed code.");
  }

  // Check how many codes the user has redeemed
  const { data: redeemedCodes, error: redeemedError } = await supabase
    .from("redemption_codes")
    .select("*")
    .eq("redeemed_by", user.id);

  if (redeemedError) {
    console.error("Error fetching redeemed codes:", redeemedError);
    throw new Error("Failed to check redeemed codes.");
  }

  // Determine the plan based on the number of codes redeemed
  let plan = "Basic Lifetime";
  let priceId = priceIdBasic;

  const redeemedCount = redeemedCodes.length + 1;

  if (redeemedCount === 2) {
    plan = "Advanced Lifetime";
    priceId = priceIdAdvanced;
  } else if (redeemedCount >= 3) {
    plan = "Professional Lifetime";
    priceId = priceIdProfessional;
  }

  try {
    // Mark the code as redeemed
    await supabase
      .from("redemption_codes")
      .update({ redeemed: true, redeemed_by: user.id })
      .eq("id", codeData.id);
  } catch (updateError) {
    console.error("Error updating redemption code:", updateError);
    throw new Error("Failed to mark code as redeemed.");
  }

  try {
    // Update the user's plan directly in Supabase
    await supabase.from("subscriptions").upsert({
      id: user.id,
      user_id: user.id,
      status: "active",
      price_id: priceId,
      cancel_at_preriod_end: false,
      created: new Date().toISOString(),
    });
  } catch (subscriptionError) {
    console.error("Error updating subscription:", subscriptionError);
    throw new Error("Failed to update user subscription.");
  }

  return { plan };
}
