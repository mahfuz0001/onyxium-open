"use client";

import Button from "@/components/ui/Button/index";
import { signInWithPassword } from "@/utils/auth-helpers/server";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "../use-toast";

interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod,
}: PasswordSignInProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await signInWithPassword(formData);

      if (response.error) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: response.message,
          variant: "default",
        });

        if (redirectMethod === "client") {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast({
        title: "Error",
        description: "An error occurred while signing in. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-sm">
      <form noValidate={true} className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="relative">
          <Image
            alt=""
            src="/assets/app/envlope.svg"
            width={100}
            height={100}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          <input
            type="email"
            name="email"
            id="email"
            className="w-full h-12 rounded-md border border-gray-300 pl-12 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500"
            placeholder="Email Address"
            required
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <Image
            alt=""
            src="/assets/app/lock.svg"
            width={100}
            height={100}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          <input
            id="password"
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            className="w-full h-12 rounded-md border border-gray-300 pl-12 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500"
            required
          />
        </div>

        <Button
          variant="slim"
          type="submit"
          className="w-full mt-1"
          loading={isSubmitting}
        >
          Sign in
        </Button>
      </form>

      {/* Additional links */}
      <div className="mt-4 text-sm text-center text-gray-600">
        <Link href="/signin/forgot_password" className="hover:underline">
          Forgot your password?
        </Link>
      </div>

      {allowEmail && (
        <div className="mt-2 text-sm text-center text-gray-600">
          <Link href="/signin/email_signin" className="hover:underline">
            Sign in via magic link
          </Link>
        </div>
      )}

      <div className="mt-2 text-sm text-center text-gray-600">
        <Link href="/signin/signup" className="hover:underline">
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
}
