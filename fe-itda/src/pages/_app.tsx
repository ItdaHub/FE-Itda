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
  const mode = useAppSelector((state) => state.theme.mode);
  const theme = mode === "dark" ? darkTheme : lightTheme;

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
              <Component {...pageProps} />
              <MobileNav />
            </Layout>
          )}
        </AntdApp>
      </ConfigProvider>
    </ThemeProvider>
  );
}
