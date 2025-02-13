import * as Sentry from "@sentry/nextjs";

export async function register() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Enable Spotlight in development
    spotlight: process.env.NODE_ENV === "development",

    ignoreErrors: [
      // Workaround for React RSC and Suspense boundaries: https://github.com/amannn/next-intl/issues/614#issuecomment-1862508393
      // Can be removed once the change is integrated into Sentry SDK.
      "This is not a real error! It's an implementation detail of `use`",
    ],

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
