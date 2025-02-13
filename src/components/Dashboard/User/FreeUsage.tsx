import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/cardContent";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  PRODUCT_ID_ADVANCED,
  PRODUCT_ID_BASIC,
  PRODUCT_ID_LIFETIME,
} from "@/constants";
import { getMaxCountForPlan } from "@/libs/api-limit";
import { Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const FreeUsage = ({
  isPro = false,
  apiLimitCount,
  plan,
  isLifetime = false,
}: {
  isPro: boolean;
  apiLimitCount: number;
  plan: string;
  isLifetime: boolean;
}) => {
  const [maxCount, setMaxCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchMaxCount = async () => {
      const count = await getMaxCountForPlan(plan, isLifetime);
      console.log("Max count fetched:", count);
      setMaxCount(count);
    };

    fetchMaxCount();
  }, [plan, isLifetime]);

  // Ensure Pro logic is consistent with Navbar
  const userIsPro = isPro || isLifetime || plan === "pro";

  if (
    userIsPro ||
    plan === PRODUCT_ID_ADVANCED ||
    plan === PRODUCT_ID_BASIC ||
    plan === PRODUCT_ID_LIFETIME
  ) {
    return null;
  }

  console.log("maxCount:", maxCount);

  if (maxCount === null) {
    return <div>Loading...</div>;
  }

  const planName = plan === PRODUCT_ID_BASIC ? PRODUCT_ID_BASIC : "Free";

  return (
    <div className="">
      <Card className="bg-white">
        <CardContent className="pt-2">
          <div className="text-center text-sm mb-4 space-y-2">
            <p>
              {apiLimitCount} / {maxCount} {planName} Generations
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / maxCount) * 100}
            />
          </div>
          <Link href="/dashboard/profile">
            <Button variant="premium" className="w-full">
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </Link>
        </CardContent>
      </Card>
      <DropdownMenuSeparator />
    </div>
  );
};
