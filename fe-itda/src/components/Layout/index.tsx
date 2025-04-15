import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthHandler from "@/features/auth/AuthHandler";
import { LayoutWrapper } from "./styled";
import clsx from "clsx";
import router from "next/router";

const Layout = ({ children }: { children: ReactNode }) => {
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
