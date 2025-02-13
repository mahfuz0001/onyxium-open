import {
  Bookmark,
  Cloud,
  CreditCard,
  LifeBuoy,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDiscord } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import { signOut } from "@/utils/auth-helpers/server";
import { createStripePortal } from "@/utils/stripe/server";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FreeUsage } from "./FreeUsage";

interface NavProfileProps {
  apiLimitCount: number;
  isPro: boolean;
  plan: string;
  isLifetime: boolean; // Add this to the NavProfileProps
}

export async function getProfilePictureUrl(): Promise<string | null> {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const { data } = await supabase
    .from("users")
    .select("avatar_url")
    .eq("id", user.user.id)
    .single();

  return data?.avatar_url || null;
}

const NavProfile = ({
  apiLimitCount,
  isPro = false,
  plan,
  isLifetime, // Accept isLifetime prop
}: NavProfileProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const currentPath = usePathname();
  const [, setIsSubmitting] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const url = await getProfilePictureUrl();
      setProfilePictureUrl(url || "/default-pfp.jpg");
    };
    fetchProfilePicture();
  }, []);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  const handleSignOut = async () => {
    const { success, message } = await signOut();
    if (success) {
      toast({
        title: "Success",
        description: message,
        variant: "default",
      });
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {profilePictureUrl ? (
          <Image
            src={profilePictureUrl}
            alt="Profile"
            width={34}
            height={34}
            className="h-10 w-10 rounded-full object-cover cursor-pointer"
          />
        ) : (
          <User className="h-6 w-6" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 right-0">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/profile" passHref>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings/billing" passHref>
            <DropdownMenuItem onClick={handleStripePortalRequest}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings" passHref>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/saved" passHref>
            <DropdownMenuItem>
              <Bookmark className="mr-2 h-4 w-4" />
              <span>Show Saved</span>
              <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="https://discord.gg/NMWYCpwUdp" passHref>
          <DropdownMenuItem>
            <IconDiscord className="mr-2 h-4 w-4" />
            <span>Discord</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/contact" passHref>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* Pass isLifetime prop here */}
        <FreeUsage
          apiLimitCount={apiLimitCount}
          isPro={isPro}
          plan={plan}
          isLifetime={isLifetime} // Ensure this is passed correctly
        />

        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavProfile;
