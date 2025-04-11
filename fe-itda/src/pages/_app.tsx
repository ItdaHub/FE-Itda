// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";

import { App as AntdApp, ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAppSelector } from "@/store/hooks";
import { lightTheme, darkTheme } from "@/styles/theme";
import LoadingPage from "@/components/LoadingPage";
import Layout from "@/components/Layout";
import MobileNav from "@/components/MoblieNavi";

import { setTheme } from "@/features/theme/themeSlice";
import { useDispatch } from "react-redux";
import BackButton from "@/components/BackButton";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppWithProviders Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

function AppWithProviders({ Component, pageProps }: Omit<AppProps, "router">) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = mode === "dark" ? darkTheme : lightTheme;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 새로고침 시 로컬스토리지 값으로 테마 설정
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
    setIsMounted(true);
  }, [dispatch]);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  // 클라이언트가 렌더링될때까지 기다림(SSR에서 렌더하지 않도록)
  if (!isMounted) return null;

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={{
          token: {
            colorText: theme.colors.text,
            colorPrimary: theme.colors.primary,
            colorBgBase: theme.colors.background,
          },
        }}
      >
        <AntdApp>
          {loading ? (
            <LoadingPage />
          ) : (
            <Layout>
              {router.pathname === "/main" ? <></> : <BackButton />}

              <Component {...pageProps} />
              <MobileNav />
            </Layout>
          )}
        </AntdApp>
      </ConfigProvider>
    </ThemeProvider>
  );
}
