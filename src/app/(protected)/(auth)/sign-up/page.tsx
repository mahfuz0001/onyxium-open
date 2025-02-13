"use client";

import { useToast } from "@/components/ui/use-toast";
import { signup } from "@/libs/actions";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error] = useState(null);
  const { toast } = useToast();

  const handleSignup = (e: any) => {
    e.preventDefault();
    toast({
      title: "Signing up...",
      description: "Please wait while we create your account.",
    });

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
      });
      return;
    }

    try {
      signup(new FormData(e.target));
    } catch (error) {
      toast({
        title: "Error",
        description: "Error signing up. Please try again.",
      });
    }
  };

  const supabase = createClient();

  const fetchData = async () => {
    const { data } = await supabase.auth.getUser();

    if (data?.user) {
      redirect("/dashboard");
    }
  };

  fetchData();

  return (
    <section className="dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center py-12 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-8 text-3xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            className="w-10 h-10 mr-2"
            width={40}
            height={40}
            src="/Logo.png"
            alt="logo"
            loading="eager"
          />
          Onyxium
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-8 space-y-6 md:space-y-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
              Create your account
            </h1>
            <form className="space-y-6" onSubmit={handleSignup}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="confirm password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-500 dark:text-gray-300"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="text-primary-600 hover:underline dark:text-primary-500"
                  >
                    terms and conditions
                  </Link>
                </label>
              </div>
              {error && (
                <p className="text-sm text-red-500 dark:text-red-400">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
