import EmailSignIn from "@/components/ui/AuthForms/EmailSignIn";
import ForgotPassword from "@/components/ui/AuthForms/ForgotPassword";
import OauthSignIn from "@/components/ui/AuthForms/OauthSignIn";
import PasswordSignIn from "@/components/ui/AuthForms/PasswordSignIn";
import Separator from "@/components/ui/AuthForms/Separator";
import SignUp from "@/components/ui/AuthForms/Signup";
import UpdatePassword from "@/components/ui/AuthForms/UpdatePassword";
import {
  getAuthTypes,
  getDefaultSignInView,
  getRedirectMethod,
  getViewTypes,
} from "@/utils/auth-helpers/settings";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignIn({ params, searchParams }: any) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  let viewProp;

  if (typeof params.id === "string" && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const preferredSignInView =
      cookies().get("preferredSignInView")?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && viewProp !== "update_password") {
    return redirect("/dashboard");
  } else if (!user && viewProp === "update_password") {
    return redirect("/signin");
  }

  return (
    <section>
      <div className="grid gap-0 md:h-screen md:grid-cols-2">
        <div className="flex items-center justify-center px-5 py-16 md:px-10 md:pt-20 md:pb-4">
          <div className="max-w-md text-center">
            <h2 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">
              {viewProp === "signup"
                ? "Start Your Free Trial"
                : "Sign In to Your Account"}
            </h2>
            <div className="mx-auto max-w-sm mb-4 pb-4">
              {viewProp === "password_signin" && (
                <PasswordSignIn
                  allowEmail={allowEmail}
                  redirectMethod={redirectMethod}
                />
              )}
              {viewProp === "email_signin" && (
                <EmailSignIn
                  allowPassword={allowPassword}
                  redirectMethod={redirectMethod}
                  disableButton={searchParams.disable_button}
                />
              )}
              {viewProp === "forgot_password" && (
                <ForgotPassword
                  allowEmail={allowEmail}
                  redirectMethod={redirectMethod}
                  disableButton={searchParams.disable_button}
                />
              )}
              {viewProp === "update_password" && (
                <UpdatePassword redirectMethod={redirectMethod} />
              )}
              {viewProp === "signup" && (
                <SignUp
                  allowEmail={allowEmail}
                  redirectMethod={redirectMethod}
                />
              )}
              {viewProp !== "update_password" &&
                viewProp !== "signup" &&
                allowOauth && (
                  <>
                    <Separator text="Third-party sign-in" />
                    <OauthSignIn />
                  </>
                )}
            </div>
            {/* <p className="text-sm text-gray-500 sm:text-sm">
              {viewProp === "signup" ? (
                <>
                  Already have an account?{" "}
                  <a href="/signin" className="font-bold text-black">
                    Login now
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <a href="/signup" className="font-bold text-black">
                    Sign up now
                  </a>
                </>
              )}
            </p> */}
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-100">
          <div className="mx-auto max-w-md px-5 py-16 md:px-10 md:py-24 lg:py-32">
            <div className="mb-5 flex h-14 w-14 flex-col items-center justify-center bg-white md:mb-6 lg:mb-8">
              <img
                src="/assets/app/quote.svg"
                alt=""
                width={100}
                height={100}
                className="inline-block"
              />
            </div>
            <p className="mb-8 text-sm sm:text-base md:mb-12 lg:mb-16">
              Onyxium AI sounds like a game-changer! Having all the best AI
              tools in one place is exactly what I need to boost my
              productivity. Can't wait to see the future of innovation unfold
              here!
            </p>
            <p className="text-sm font-bold sm:text-base">Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
