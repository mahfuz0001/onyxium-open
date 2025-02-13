"use client";

import Link from "next/link";
import { signOut } from "@/utils/auth-helpers/server";
import Logo from "@/components/icons/Logo";
import { useRouter } from "next/navigation";
import s from "./Navbar.module.css";
import { useToast } from "../use-toast";

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { success, message } = await signOut();
    if (success) {
      toast({
        title: "Success",
        description: message,
        variant: "default",
      });
      // Redirect to home page or any desired location after sign-out
      router.push("/");
    } else {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" className={s.logo} aria-label="Logo">
          <Logo />
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          <Link href="/" className={s.link}>
            Pricing
          </Link>
          {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
          <button onClick={handleSignOut} className={s.link}>
            Sign out
          </button>
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
