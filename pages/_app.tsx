import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { pageview } from "../utilities/google-analytics";
export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return <Component {...pageProps} />;
}
