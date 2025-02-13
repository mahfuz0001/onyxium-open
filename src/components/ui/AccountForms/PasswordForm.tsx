import { useState } from "react";

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle password update logic here
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label className="block text-lg font-medium mb-2">Current Password</label>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />
      <label className="block text-lg font-medium mt-4 mb-2">
        New Password
      </label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
      >
        Update Password
      </button>
    </form>
  );
}
