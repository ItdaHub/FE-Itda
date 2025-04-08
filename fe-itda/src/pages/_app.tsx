import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";

import Layout from "@/components/Layout";
import { App as AntdApp, ConfigProvider } from "antd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigProvider>
        <AntdApp>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AntdApp>
      </ConfigProvider>
    </Provider>
  );
}
