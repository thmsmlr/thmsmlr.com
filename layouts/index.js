import Head from 'next/head';

export default ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/icon.png" />
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
      {children}
    </>
  );
};
