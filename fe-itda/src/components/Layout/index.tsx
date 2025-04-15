import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthHandler from "@/features/auth/AuthHandler";
import { LayoutWrapper } from "./styled";
import clsx from "clsx";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const protectedRoutes = [
    "/mywrite",
    "/myfavorite",
    "/alert",
    "/cashhistory",
    "/mypage",
    "/mycomment",
    "/newwrite",
  ];

  const isProtected = protectedRoutes.some((path) =>
    router.pathname.startsWith(path)
  );

  // 로그인 안 했고 보호된 페이지일 때는 아무것도 렌더하지 않음 (middleware가 redirect 처리함)
  if (!user && isProtected) return null;

  // 나머지 레이아웃 렌더
  const isMypage = router.pathname.startsWith("/mypage");

  return (
    <LayoutWrapper className={clsx("layout-wrap")}>
      <AuthHandler />
      <div className="layout">
        <Header />
        <main className="content">{children}</main>
        {/* <Footer /> */}
        {!isMypage && <Footer />}
      </div>
    </LayoutWrapper>
  );
};

export default Layout;
