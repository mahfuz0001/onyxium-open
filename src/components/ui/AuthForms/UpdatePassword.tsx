"use client";

import Button from "@/components/ui/Button/index";
import { updatePassword } from "@/utils/auth-helpers/server";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "../use-toast";

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod,
}: UpdatePasswordProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await updatePassword(formData);

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
      console.error("Error updating password:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while updating your password. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-sm">
      <form noValidate={true} className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="password"
            placeholder="New Password"
            type="password"
            name="password"
            autoComplete="new-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg mb-4 focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            required
          />
        </div>
        <div className="grid gap-1">
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            id="passwordConfirm"
            placeholder="Confirm New Password"
            type="password"
            name="passwordConfirm"
            autoComplete="new-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg mb-4 focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            required
          />
        </div>
        <Button
          variant="slim"
          type="submit"
          className="w-full mt-1"
          loading={isSubmitting}
        >
          Update Password
        </Button>
      </form>
    </div>
  );
}
