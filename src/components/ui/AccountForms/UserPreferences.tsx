"use client";

import Button from "@/components/ui/Button/index";
import Card from "@/components/ui/Card";
import { updateUserPreferences } from "@/utils/auth-helpers/server";
import { useState } from "react";
import { useToast } from "../use-toast";

export default function UserPreferences({
  initialPreferences,
}: {
  initialPreferences: any;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await updateUserPreferences(formData);

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
      console.error("Error updating preferences:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while updating preferences. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card
      title="User Preferences"
      description="Customize your account settings and preferences."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">
            Your preferences affect how you experience our platform.
          </p>
          <Button
            variant="slim"
            type="submit"
            form="preferencesForm"
            loading={isSubmitting}
          >
            Save Preferences
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 space-y-4">
        <form id="preferencesForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="emailNotifications"
              name="emailNotifications"
              defaultChecked={initialPreferences?.emailNotifications}
              className="rounded"
            />
            <label htmlFor="emailNotifications">
              Receive email notifications
            </label>
          </div>
          <div className="space-y-2">
            <label htmlFor="language" className="block">
              Preferred Language
            </label>
            <select
              id="language"
              name="language"
              defaultValue={initialPreferences?.language}
              className="w-full p-2 border rounded-md"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </form>
      </div>
    </Card>
  );
}
