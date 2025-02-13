import DashboardBox from "@/components/DashboardBox";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Dashboard() {
  return (
    <div className="">
      <TooltipProvider>
        <DashboardBox />
      </TooltipProvider>
    </div>
  );
}
