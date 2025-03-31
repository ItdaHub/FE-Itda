import Header from "@/components/Header";
import "@/styles/globals.css";
import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

// 대표색
const theme = {
  colors: {
    primary: "#c47ad7",
    secondary: "black",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <SessionProvider session={pageProps.session}>
    <ThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
    // </SessionProvider>
  );
}
