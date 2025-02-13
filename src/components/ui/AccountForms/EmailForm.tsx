"use client";

import { updateEmail } from "@/utils/auth-helpers/server";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../Button/index";
import Card from "../Card";
import { toast } from "../use-toast";

export default function EmailForm({
  userEmail,
}: {
  userEmail: string | undefined;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await updateEmail(formData);

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
        // Optionally, you can redirect the user after successful email update
        router.push("/dashboard/profile");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while updating email. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card
      title="Your Email"
      description="Please enter the email address you want to use to login."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">
            We will email you to verify the change.
          </p>
          <Button
            variant="slim"
            type="submit"
            form="emailForm"
            loading={isSubmitting}
          >
            Update Email
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        <form id="emailForm" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="newEmail"
            className="w-1/2 p-3 rounded-md"
            defaultValue={userEmail ?? ""}
            placeholder="Your email"
            maxLength={64}
            required
          />
        </form>
      </div>
    </Card>
  );
}
