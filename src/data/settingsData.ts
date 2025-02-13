export interface Setting {
  id: string;
  label: string;
  type: "toggle" | "input" | "select" | "color" | "range";
  value: string | boolean | number;
  options?: string[];
  min?: number;
  max?: number;
}

export interface SettingsCategory {
  id: string;
  label: string;
  icon: string;
  settings: Setting[];
}

export const settingsData: SettingsCategory[] = [
  {
    id: "general",
    label: "General",
    icon: "Settings",
    settings: [
      {
        id: "siteName",
        label: "Site Name",
        type: "input",
        value: "My Awesome Website",
      },
      {
        id: "language",
        label: "Language",
        type: "select",
        value: "en",
        options: ["en", "es", "fr", "de"],
      },
      { id: "darkMode", label: "Dark Mode", type: "toggle", value: false },
    ],
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: "Palette",
    settings: [
      {
        id: "primaryColor",
        label: "Primary Color",
        type: "color",
        value: "#3b82f6",
      },
      {
        id: "fontSize",
        label: "Font Size",
        type: "range",
        value: 16,
        min: 12,
        max: 24,
      },
      {
        id: "fontFamily",
        label: "Font Family",
        type: "select",
        value: "sans-serif",
        options: ["sans-serif", "serif", "monospace"],
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    icon: "Shield",
    settings: [
      {
        id: "twoFactor",
        label: "Two-Factor Authentication",
        type: "toggle",
        value: false,
      },
      {
        id: "dataCollection",
        label: "Allow Data Collection",
        type: "toggle",
        value: true,
      },
      {
        id: "cookieConsent",
        label: "Cookie Consent",
        type: "toggle",
        value: true,
      },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "Bell",
    settings: [
      {
        id: "emailNotifications",
        label: "Email Notifications",
        type: "toggle",
        value: true,
      },
      {
        id: "pushNotifications",
        label: "Push Notifications",
        type: "toggle",
        value: false,
      },
      {
        id: "notificationFrequency",
        label: "Notification Frequency",
        type: "select",
        value: "daily",
        options: ["realtime", "hourly", "daily", "weekly"],
      },
    ],
  },
  {
    id: "accessibility",
    label: "Accessibility",
    icon: "Accessibility",
    settings: [
      {
        id: "highContrast",
        label: "High Contrast Mode",
        type: "toggle",
        value: false,
      },
      {
        id: "reduceMotion",
        label: "Reduce Motion",
        type: "toggle",
        value: false,
      },
      {
        id: "screenReader",
        label: "Screen Reader Optimized",
        type: "toggle",
        value: false,
      },
    ],
  },
];
