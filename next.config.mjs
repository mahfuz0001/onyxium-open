import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import "./src/libs/Env.mjs";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
export default withSentryConfig(
  bundleAnalyzer({
    poweredByHeader: false,
    reactStrictMode: true,
    // serverComponentsExternalPackages: ["pino"],
    // instrumentationHook: true,
    experimental: {
      taint: true,
      serverActions: {
        allowedOrigins: [
          "fantastic-fortnight-pjj45g4rgq762gwv-3000.app.github.dev",
          "localhost:3000",
          "onyxium.org"
        ],
      },
    },
    logging: {
      fetches: { fullUrl: false },
    },
    webpack: (config) => {
      // config.externals is needed to resolve the following errors:
      // Module not found: Can't resolve 'bufferutil'
      // Module not found: Can't resolve 'utf-8-validate'
      config.externals.push({
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
        "node:crypto": "commonjs2 node:crypto",
        "node:fs": "commonjs2 node:fs",
        "node:https": "commonjs2 node:https",
        "node:http": "commonjs2 node:http",
        "node:net": "commonjs2 node:net",
        "node:path": "commonjs2 node:path",
        "node:url": "commonjs2 node:url",
        "node:process": "commonjs2 node:process",
        "node:stream": "commonjs2 node:stream",
        "node:tls": "commonjs2 node:tls",
        "node:dns": "commonjs2 node:dns",
        "node:zlib": "commonjs2 node:zlib",
        "node:events": "commonjs2 node:events",
        "node:querystring": "commonjs2 node:querystring",
        "node:stream/web": "commonjs2 node:stream/web",
      });

      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**.githubusercontent.com",
        },
        {
          protocol: "https",
          hostname: "**.staticflickr.com",
        },
        {
          protocol: "https",
          hostname: "**.cloudimg.io",
        },
        {
          protocol: "https",
          hostname: "**.tailwindui.com",
        },
        {
          protocol: "https",
          hostname: "**.website-files.com",
        },
        {
          protocol: "https",
          hostname: "**.flaticon.com",
        },
        {
          protocol: "https",
          hostname: "**.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "**.cloudinary.com",
        },
        {
          protocol: "https",
          hostname: "**.uxwing.com",
        },
        {
          protocol: "https",
          hostname: "**.supabase.co",
        },
        {
          protocol: "https",
          hostname: "ui-avatars.com",
        },
        {
          protocol: "https",
          hostname: "**.wikimedia.org",
        },
        {
          protocol: "https",
          hostname: "**.gstatic.com",
        },
      ],
    },
  }),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "onyxium",
    project: "onyxium",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
