/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRAPHQL_API_URL: "https://kmessenger-backend.onrender.com/graphql",
    GRAPHQL_SUBSCRIPTION_URL: "wss://kmessenger-backend.onrender.com/graphql/subscriptions",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
