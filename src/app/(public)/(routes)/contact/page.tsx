"use client";

import { Footer } from "@/components/Home";
import Header from "@/components/Home/Hero/Header";
import ShimmerButton from "@/components/ui/shimmer-button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/utils/cn";
import { Field, Switch } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [, setStatus] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus("Submitting...");

    let formErrors = { ...errors };
    let hasErrors = false;

    if (!formData.firstName) {
      formErrors.firstName = "First name is required";
      hasErrors = true;
      toast({
        title: "Error",
        description: "First name is required",
        variant: "destructive",
      });
    }
    if (!formData.lastName) {
      formErrors.lastName = "Last name is required";
      hasErrors = true;
      toast({
        title: "Error",
        description: "Last name is required",
        variant: "destructive",
      });
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
      hasErrors = true;
      toast({
        title: "Error",
        description: "Email is required",
        variant: "destructive",
      });
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
      hasErrors = true;
      toast({
        title: "Error",
        description: "Email is invalid",
        variant: "destructive",
      });
    }
    if (!formData.message) {
      formErrors.message = "Message is required";
      hasErrors = true;
      toast({
        title: "Error",
        description: "Message is required",
        variant: "destructive",
      });
    }
    if (!agreed) {
      hasErrors = true;
      toast({
        title: "Error",
        description: "You must agree to the privacy policy",
        variant: "destructive",
      });
    }

    setErrors(formErrors);

    if (hasErrors) {
      setStatus("Please fill out all fields correctly.");
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (response.ok) {
      setStatus("Thank you for contacting us! We will get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      setAgreed(false);
      toast({
        title: "Success",
        description: "Your message has been sent successfully.",
        variant: "default",
      });
    } else {
      const errorData = await response.json();
      setStatus("Failed to send message.");
      toast({
        title: "Error",
        description: errorData.error || "Failed to send message.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="relative">
      <Header />
      <div className="py-16 md:py-24 lg:pt-40 lg:pb-32">
        <div className="mx-auto w-full max-w-3xl px-5 md:px-10">
          <h2 className="text-3xl font-semibold md:text-5xl text-center items-center">
            <span className="bg-[url('/assets/app/bg-line.svg')] bg-contain bg-center bg-no-repeat px-4 text-white">
              Contact
            </span>{" "}
            Us
          </h2>
          <p className="mx-auto mb-8 mt-4 max-w-[528px] text-[#636262] md:mb-12 lg:mb-16">
            Fill out the form below and we will get back to you as soon as
            possible. We look forward to hearing from you!
          </p>
          <form
            onSubmit={handleSubmit}
            className="mb-4 rounded-3xl border border-solid border-black bg-white px-4 py-10 shadow-[rgb(0,_0,_0)_9px_9px] sm:px-8 sm:py-16 md:px-20"
          >
            <div className="mb-4 grid w-full grid-cols-2 gap-6">
              <div className="relative">
                <label className="mb-1 font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block h-9 w-full rounded-md border border-solid border-black bg-white p-2 text-sm text-[#333333] focus:border-[#3898ec] focus:outline-0"
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="relative">
                <label className="mb-1 font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block h-9 w-full rounded-md border border-solid border-black bg-white p-2 text-sm text-[#333333] focus:border-[#3898ec] focus:outline-0"
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block h-9 w-full rounded-md border border-solid border-black bg-white p-2 text-sm text-[#333333] focus:border-[#3898ec] focus:outline-0"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="relative mb-5 md:mb-6 lg:mb-8">
              <label htmlFor="message" className="mb-1 font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="min-h-[186px] w-full rounded-md border border-solid border-black bg-white p-2 text-sm text-[#333333] focus:border-[#3898ec] focus:outline-0"
              ></textarea>
              {errors.message && (
                <p className="mt-2 text-sm text-red-600">{errors.message}</p>
              )}
            </div>
            <Field as="div" className="flex gap-x-4 sm:col-span-2 pb-7">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className={cn(
                    agreed ? "bg-purple-600" : "bg-gray-200",
                    "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600",
                  )}
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      agreed ? "translate-x-3.5" : "translate-x-0",
                      "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out",
                    )}
                  />
                </Switch>
              </div>
              <label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{" "}
                <a
                  href="/privacy-policy"
                  className="font-semibold text-purple-600"
                >
                  privacy&nbsp;policy
                </a>
                .
              </label>
            </Field>
            <div className="z-10 flex items-center justify-center">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center px-12 text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  <input type="submit" value="Submit" disabled={!agreed} />
                </span>
              </ShimmerButton>
            </div>
            {/* {status && <p className="mt-4 text-lg text-[#1353fe]">{status}</p>} */}
          </form>
        </div>
      </div>
      <Image
        src="/assets/app/bg-frame.svg"
        alt="bg-frame"
        className="absolute bottom-auto left-0 right-0 top-0 -z-10 inline-block w-full"
        width={1920}
        height={1080}
      />
      <Image
        src="/assets/app/bg-frame.svg"
        alt="bg-frame"
        className="absolute bottom-0 left-0 right-0 top-auto -z-30 inline-block w-full"
        width={1920}
        height={1080}
      />
      <Footer />
    </section>
  );
}
