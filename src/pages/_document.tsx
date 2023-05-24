import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-GFRH9CRBPG`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GFRH9CRBPG', {
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
