"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    new Error("Please provide both email and password.");
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    new Error(error.message);
    return;
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    new Error("Please provide both email and password.");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    new Error(error.message);
    return;
  }

  redirect("/dashboard");
}
