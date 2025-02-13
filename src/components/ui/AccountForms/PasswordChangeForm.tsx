"use client";

import Button from "@/components/ui/Button/index";
import Card from "@/components/ui/Card";
import { updatePassword } from "@/utils/auth-helpers/server";
import { useState } from "react";
import { useToast } from "../use-toast";

export default function PasswordChangeForm() {
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
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while updating password. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card
      title="Change Password"
      description="Update your password to keep your account secure."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">
            Ensure your new password is strong and unique.
          </p>
          <Button
            variant="slim"
            type="submit"
            form="passwordForm"
            loading={isSubmitting}
          >
            Update Password
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 space-y-4">
        <form id="passwordForm" onSubmit={handleSubmit}>
          <input
            type="password"
            name="currentPassword"
            className="w-full p-3 mb-4 rounded-md"
            placeholder="Current Password"
            required
          />
          <input
            type="password"
            name="newPassword"
            className="w-full p-3 mb-4 rounded-md"
            placeholder="New Password"
            required
            minLength={6}
          />
          <input
            type="password"
            name="confirmPassword"
            className="w-full p-3 rounded-md"
            placeholder="Confirm New Password"
            required
            minLength={6}
          />
        </form>
      </div>
    </Card>
  );
}
