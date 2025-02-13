"use client";

import Button from "@/components/ui/Button/index";
import { signInWithEmail } from "@/utils/auth-helpers/server";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../use-toast";

// Define prop type with allowPassword boolean
interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod,
  disableButton,
}: EmailSignInProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await signInWithEmail(formData);

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
        <Button
          variant="slim"
          type="submit"
          className="w-full mt-1"
          loading={isSubmitting}
          disabled={disableButton}
        >
          Send Link
        </Button>
      </form>
      {allowPassword && (
        <>
          <div className="mt-4 text-sm text-center text-gray-600">
            <Link href="/signin/password_signin" className="hover:underline">
              Sign in with email and password
            </Link>
          </div>
          <div className="mt-2 text-sm text-center text-gray-600">
            <Link href="/signin/signup" className="hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
