import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* META TAGS */}
        <meta
          name="description"
          content="My Non-Fungible Garment - An app to visualize your NFTs as garments."
        />

        {/* FONTS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bad+Script&display=swap"
          rel="stylesheet"
        />

        {/* FAVICON */}
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
