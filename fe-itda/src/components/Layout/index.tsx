import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthHandler from "@/features/auth/AuthHandler";
import { LayoutWrapper } from "./styled";
import clsx from "clsx";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutWrapper className={clsx("layout-wrap")}>
      <AuthHandler />
      <Header />
      {children}
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
