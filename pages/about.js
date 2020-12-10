import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Layout from 'layouts';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

export default function Page({ posts }) {
  return (
    <Layout>
      <Head>
        <title>thmsmlr – About Me</title>
      </Head>
      <Navigation />

      <div className="max-w-screen-sm mx-auto px-6 md:px-2 prose text-gray-700">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-800">About Me</h1>
        <p>I'm a guy who misses the old internet. I believe that adwords killed the web.</p>
        <p>
          During my days I do technical strategy stuff at{' '}
          <a href="https://multithreaded.stitchfix.com/algorithms/" target="_blank">
            Stitch Fix
          </a>
          . During my nights, I build{' '}
          <a href="https://billclintonswag.com" target="_blank">
            stupid things on the internet
          </a>
          .
        </p>
        <p>
          If you want to know more about me, reach out on{' '}
          <a href="https://twitter.com/thmsmlr">Twitter</a>.
        </p>
      </div>

      <Footer />
    </Layout>
  );
}
