"use client";

import {
  PRICEID_LIFETIME_ADVANCED,
  PRICEID_LIFETIME_BASIC,
  PRICEID_LIFETIME_PROFESSIONAL,
} from "@/constants";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../Button/index";
import Card from "../Card";

export default function RedeemAppSumoCodeForm() {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          priceIdBasic: PRICEID_LIFETIME_BASIC,
          priceIdAdvanced: PRICEID_LIFETIME_ADVANCED,
          priceIdProfessional: PRICEID_LIFETIME_PROFESSIONAL,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm text-gray-900">Success</span>
            <p className="text-sm text-gray-600">
              Code redeemed successfully! Please refresh the page...
            </p>
          </div>,
          {
            duration: 5000,
            style: {
              borderRadius: "8px",
              background: "#f3f4f6",
              border: "1px solid #e5e7eb",
              padding: "10px 15px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
            },
            icon: (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500">
                <span className="text-white text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              </div>
            ),
            position: "bottom-right",
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          }
        );
      } else {
        toast.error(
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm text-gray-900">Error</span>
            <p className="text-sm text-gray-600">
              {result.error ||
                "An error occurred during code redemption. Please try again."}
            </p>
          </div>,
          {
            duration: 5000,
            style: {
              borderRadius: "8px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              padding: "10px 15px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
            },
            icon: (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500">
                <span className="text-white text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            ),
            position: "bottom-right",
            ariaProps: {
              role: "alert",
              "aria-live": "assertive",
            },
          }
        );
      }
    } catch (error) {
      toast.error(
        <div className="flex flex-col items-start">
          <span className="font-semibold text-sm text-gray-900">Error</span>
          <p className="text-sm text-gray-600">
            An error occurred during code redemption. Please try again.
          </p>
        </div>,
        {
          duration: 5000,
          style: {
            borderRadius: "8px",
            background: "#fef2f2",
            border: "1px solid #fecaca",
            padding: "10px 15px",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
          },
          icon: (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500">
              <span className="text-white text-lg">⚠️</span>
            </div>
          ),
          position: "bottom-right",
          ariaProps: {
            role: "alert",
            "aria-live": "assertive",
          },
        }
      );
      console.error("Error during code redemption:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      title="Redeem Code"
      description="Please enter your redemption code to unlock your plan."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <Button
            variant="slim"
            type="submit"
            form="redeemCodeForm"
            loading={isSubmitting}
          >
            {isSubmitting ? "Redeeming" : "Redeem Code"}
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        <form id="redeemCodeForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="redeemCode"
            className="w-full p-3 rounded-md border"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Code"
            maxLength={64}
            required
          />
        </form>
      </div>
    </Card>
  );
}
