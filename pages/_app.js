import Head from 'next/head';
import 'styles/tailwind.css';

export default ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/icon.png" />
        <link rel="alternate" type="application/rss+xml" href="/api/rss" title="RSS feed" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-30455574-1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-30455574-1');
          `
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};
