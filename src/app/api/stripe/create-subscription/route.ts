import { PRICEID_LIFETIME_ADVANCED, PRICEID_LIFETIME_BASIC, PRICEID_LIFETIME_PROFESSIONAL } from "@/constants";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { email, password, code } = await req.json();

    // Get the current authenticated user
    const {
      data: { user: session },
      error: sessionError,
    } = await supabase.auth.getUser();

    let user;

    if (sessionError || !session) {
      // If there's no active session, sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError || !data?.user) {
        console.error("User authentication failed:", signUpError);
        return NextResponse.json({ error: "Sign up failed." }, { status: 400 });
      }

      user = data.user;
    } else {
      // If the user is already signed in, use the current session user
      user = session;
    }

    // Fetch the redemption code data
    const { data: codeData, error: codeError } = await supabase
      .from("redemption_codes")
      .select("id, redeemed")
      .eq("code", code)
      .single();

    if (codeError || !codeData || codeData.redeemed) {
      console.error("Code retrieval failed:", codeError);
      return NextResponse.json(
        { error: "Invalid or already redeemed code." },
        { status: 400 }
      );
    }

    // Check how many codes the user has redeemed
    const { data: redeemedCodes, error: redeemedCodesError } = await supabase
      .from("redemption_codes")
      .select("*")
      .eq("redeemed_by", user.id);

    if (redeemedCodesError) {
      console.error("Error retrieving redeemed codes:", redeemedCodesError);
    }

    const redeemedCount = (redeemedCodes ? redeemedCodes.length : 0) + 1;

    // Select appropriate pricing plan based on the number of redeemed codes
    let priceId = PRICEID_LIFETIME_BASIC;
    if (redeemedCount === 2) {
      priceId = PRICEID_LIFETIME_ADVANCED;
    } else if (redeemedCount >= 3) {
      priceId = PRICEID_LIFETIME_PROFESSIONAL;
    }

    // Insert a new subscription
    const subscriptionData = {
      id: `${user.id}-${priceId}-${Math.random().toString(10)}`,
      user_id: user.id,
      price_id: priceId,
      status: "active",
      created: new Date().toISOString(),
      current_period_start: new Date().toISOString(),
      current_period_end: null,
      cancel_at_period_end: false,
      metadata: { plan: "lifetime" },
    };

    const { error: supabaseError } = await supabase
      .from("subscriptions")
      .insert(subscriptionData);

    if (supabaseError) {
      console.error("Failed to add lifetime subscription:", supabaseError);
      return NextResponse.json(
        { error: "Failed to add lifetime subscription." },
        { status: 500 }
      );
    }

    // Mark the code as redeemed
    const { error: redemptionError } = await supabase
      .from("redemption_codes")
      .update({ redeemed: true, redeemed_by: user.id })
      .eq("id", codeData.id);

    if (redemptionError) {
      console.error("Failed to mark code as redeemed:", redemptionError);
      return NextResponse.json(
        { error: "Failed to redeem code." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Subscription updated successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
