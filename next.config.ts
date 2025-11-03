import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://s4.anilist.co/**'),new URL('https://cdn.myanimelist.net/**'), new URL("https://i.ytimg.com/**")],
  },
};

export default nextConfig;
