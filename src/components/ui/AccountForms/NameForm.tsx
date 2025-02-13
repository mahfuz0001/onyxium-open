"use client";

import Button from "@/components/ui/Button/index";
import Card from "@/components/ui/Card";
import { updateName } from "@/utils/auth-helpers/server";
import { useState } from "react";
import { useToast } from "../use-toast";

export default function NameForm({ userName }: { userName: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await updateName(formData);

      if (response.error) {
        // Display error toast
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      } else {
        // Display success toast
        toast({
          title: "Success",
          description: response.message,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error updating name:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating name. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card
      title="Your Name"
      description="Please enter your full name, or a display name you are comfortable with."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">64 characters maximum</p>
          <Button
            variant="slim"
            type="submit"
            form="nameForm"
            loading={isSubmitting}
          >
            Update Name
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        <form id="nameForm" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="fullName"
            className="w-1/2 p-3 rounded-md"
            defaultValue={userName}
            placeholder="Your name"
            maxLength={64}
          />
        </form>
      </div>
    </Card>
  );
}
