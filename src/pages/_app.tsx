import { useState, useEffect } from "react";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { CssBaseline, GeistProvider } from "@geist-ui/react";

import { store } from "@/store";
import Layout from "@/hoc/Layout";
import { themes, ThemeType } from "@/lib/use-prefers";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [themeType, setThemeType] = useState<ThemeType>("dark");

  useEffect(() => {
    document.documentElement.removeAttribute("style");
    document.body.removeAttribute("style");

    const theme = window.localStorage.getItem("theme") as ThemeType;
    if (themes.includes(theme)) setThemeType(theme);
  }, []);

  const router = useRouter();
  console.log(router.pathname);
  if (router.pathname.includes("dashboard")) {
    return (
      <Provider store={store}>
        <GeistProvider themeType={themeType}>
          <CssBaseline />
          <Layout
            pathname={router.pathname}
            showSideBar={router.pathname === "/auth/login" ? false : true}
          >
            <Component {...pageProps} />
          </Layout>
        </GeistProvider>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <GeistProvider themeType={themeType}>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </Provider>
  );
}
