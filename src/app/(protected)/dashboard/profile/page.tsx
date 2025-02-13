import CustomerPortalForm from "@/components/ui/AccountForms/CustomerPortalForm";
import EmailForm from "@/components/ui/AccountForms/EmailForm";
import NameForm from "@/components/ui/AccountForms/NameForm";
import PasswordChangeForm from "@/components/ui/AccountForms/PasswordChangeForm";
import ProfilePictureUpload from "@/components/ui/AccountForms/ProfilePictureUpload";
import RedeemAppSumoCodeForm from "@/components/ui/AccountForms/RedeemAppSumoCodeForm";
import UserPreferences from "@/components/ui/AccountForms/UserPreferences";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function Account() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  const { data: userDetails } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .limit(1);

  if (error) {
    console.log("Error fetching subscription:", error);
  }

  const subscription = subscriptions?.[0] || null;

  return (
    <section className="mb-32">
      <div className="max-w-6xl py-8 mx-auto sm:px-6 sm:pt-12 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-700 sm:text-center sm:text-2xl">
            Edit or Manage Your Account Details Here.
          </p>
        </div>
      </div>
      <div className="p-4 space-y-6">
        <RedeemAppSumoCodeForm />
        <ProfilePictureUpload avatarUrl={userDetails?.avatar_url} />
        <NameForm userName={userDetails?.full_name ?? ""} />
        <EmailForm userEmail={user.email} />
        <PasswordChangeForm />
        <UserPreferences initialPreferences={userDetails?.preferences} />
        {/* <UserActivity activityData={userDetails?.activity} /> */}
        <CustomerPortalForm subscription={subscription} />
      </div>
      <Toaster />
    </section>
  );
}
