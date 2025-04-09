import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";

import Layout from "@/components/Layout";
import { App as AntdApp, ConfigProvider } from "antd";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingPage from "@/components/LoadingPage";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    <Provider store={store}>
      <ConfigProvider>
        <AntdApp>
          {loading ? (
            <LoadingPage />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </AntdApp>
      </ConfigProvider>
    </Provider>
  );
}
