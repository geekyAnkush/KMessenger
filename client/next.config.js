/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
//   env: {
//     GRAPHQL_API_URL: "http://localhost:4000/graphql",
//     GRAPHQL_SUBSCRIPTION_URL: "ws://localhost:4000/graphql/subscriptions",
//   },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
