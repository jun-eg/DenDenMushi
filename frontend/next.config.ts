import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/item",
        destination: "http://host.docker.internal:5000/item",
      },
      {
        // クライアントからの /item/xxx → Next.js がこの先にプロキシ
        source: "/item/:path*",
        destination: "http://host.docker.internal:5000/item/:path*",
      },
      // 必要に応じて他の API もまとめてプロキシ
      // {
      //   source: '/api/:path*',
      //   destination: 'http://localhost:5000/api/:path*',
      // },
    ];
  },
};

export default nextConfig;
