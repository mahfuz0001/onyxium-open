import { useState } from "react";

export default function NotificationForm() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle notification preferences update logic here
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label className="block text-lg font-medium mb-2">Notifications</label>
      <div className="mb-4">
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={(e) => setEmailNotifications(e.target.checked)}
        />
        <label className="ml-2">Email Notifications</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={smsNotifications}
          onChange={(e) => setSmsNotifications(e.target.checked)}
        />
        <label className="ml-2">SMS Notifications</label>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
      >
        Update Notifications
      </button>
    </form>
  );
}
