/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  // 모듈 없는 에러
  transpilePackages: ["rc-util", "rc-picker"],
  // 클래스명이 안 맞는 오류
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
