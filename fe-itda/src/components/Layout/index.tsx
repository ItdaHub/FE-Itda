import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthHandler from "@/features/auth/AuthHandler";
import { LayoutWrapper } from "./styled";
import clsx from "clsx";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

interface childrenProps {
  children: ReactNode;
}

const Layout = ({ children }: childrenProps) => {
  const router = useRouter();

  // 나머지 레이아웃 렌더
  const isMypage = router.pathname.startsWith("/mypage");
  const isChapterPage = router.pathname.startsWith("/chapter");

  return (
    <LayoutWrapper className={clsx("layout-wrap")}>
      <div className={isChapterPage ? "no-padding-top" : ""}>
        {/* 로그인 확인 */}
        <AuthHandler />
        <div className="layout">
          {/* 헤더 */}
          <Header />
          <main className="content">{children}</main>
          {!isMypage && <Footer />}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Layout;
