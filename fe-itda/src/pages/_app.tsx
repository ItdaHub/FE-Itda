import Header from "@/components/Header";
import "@/styles/globals.css";
// import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import Footer from "@/components/Footer";
import AuthHandler from "@/features/auth/AuthHandler";

// 대표색
// const theme = {
//   colors: {
//     primary: "#c47ad7",
//     secondary: "black",
//   },
// };

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
      {/* 로그인 유지 체크 */}
      <AuthHandler />
      <Header />
      <Component {...pageProps} />
      <Footer />
      {/* </ThemeProvider> */}
    </Provider>
  );
}
