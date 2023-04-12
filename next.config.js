/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "user-post.s3.ap-south-1.amazonaws.com",
      "communityuserprofile.s3.ap-south-1.amazonaws.com",
      "communityuserprofile.s3.amazonaws.com",
      "user-post.s3.amazonaws.com",
    ],
  },
  // distDir: "build",
};

module.exports = nextConfig;
