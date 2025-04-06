import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { useAppSelector } from "@/store/hooks";
import { lightTheme, darkTheme } from "@/styles/theme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthHandler from "@/features/auth/AuthHandler";
import { LayoutWrapper } from "./styled";
import clsx from "clsx";

const Layout = ({ children }: { children: ReactNode }) => {
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <LayoutWrapper className={clsx("layout-wrap")}>
        <AuthHandler />
        <Header />
        {children}
        <Footer />
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
