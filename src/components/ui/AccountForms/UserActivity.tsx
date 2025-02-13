"use client";

import Card from "@/components/ui/Card";

interface ActivityData {
  loginCount: number;
  lastLogin: string; // ISO date string
  averageSessionTime: string; // e.g., "10 minutes"
}

export default function UserActivity({
  activityData,
}: {
  activityData: ActivityData;
}) {
  return (
    <Card
      title="User Activity"
      description="View your account activity and statistics."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">Activity data is updated daily.</p>
        </div>
      }
    >
      <div className="mt-8 mb-4 space-y-4">
        <div className="flex justify-between">
          <span>Total Logins:</span>
          <span className="font-semibold">{activityData?.loginCount || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>Last Login:</span>
          <span className="font-semibold">
            {activityData?.lastLogin
              ? new Date(activityData.lastLogin).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Average Session Time:</span>
          <span className="font-semibold">
            {activityData?.averageSessionTime || "N/A"}
          </span>
        </div>
      </div>
    </Card>
  );
}
