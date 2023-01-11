import { Html, Head, Main, NextScript } from "next/document";
import { GA_MEASUREMENT_ID } from "../utilities/google-analytics";
import Script from "next/script";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */} 
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            });
        `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
