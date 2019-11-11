import Head from 'next/head';

export default ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
      <style jsx global>
        {`
          * {
            box-sizing: border-box;
          }

          html,
          body {
            font: 100%/1.75 'Merriweather', 'Georgia', serif;
            font-weight: 400;
            word-wrap: break-word;
            font-kerning: normal;
            font-feature-settings: 'kern', 'liga', 'clig', 'calt';
            color: hsla(0, 0%, 0%, 0.9);
          }

          p {
            margin: 1.5rem 0 0 0;
          }

          img {
            max-width: 100%;
            max-height: 100%;
          }
        `}
      </style>
    </>
  );
};
