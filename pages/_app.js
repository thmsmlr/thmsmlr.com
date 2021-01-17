import Head from 'next/head';
import 'styles/tailwind.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/icon.png" />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/api/rss"
          title="Thomas Millar's blog"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E43Z5HGBP6"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-E43Z5HGBP6');
          `,
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
