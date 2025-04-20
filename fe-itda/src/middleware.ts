import { NextRequest, NextResponse } from "next/server";

// 로그인 보호가 필요한 경로 리스트
const protectedRoutes = [
  "/mywrite",
  "/myfavorite",
  "/alert",
  "/cashhistory",
  "/mypage",
  "/mycomment",
  "/newwrite",
];

export const middleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken");

  // 보호된 페이지에 접근 중인데, 토큰이 없으면 로그인으로 리디렉트
  const needsAuth = protectedRoutes.some((path) => pathname.startsWith(path));
  if (needsAuth && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/mywrite",
    "/myfavorite",
    "/alert",
    "/cashhistory",
    "/mypage",
    "/mycomment",
    "/newwrite",
  ],
};
