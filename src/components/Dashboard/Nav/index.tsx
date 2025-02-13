import { getApiLimitCount } from "@/libs/api-limit";
import { checkSubscription } from "@/libs/subscription";
import Navbar from "./Nav";

const Nav = async ({ isLifetime }: { isLifetime: boolean }) => {
  const apiLimitCount = await getApiLimitCount();
  const { isPro, credits } = await checkSubscription();
  const plan = isPro ? "Basic" : "Free";

  return (
    <Navbar
      apiLimitCount={apiLimitCount}
      isPro={isPro}
      credits={credits}
      plan={plan}
      isLifetime={isLifetime}
    />
  );
};

export default Nav;
