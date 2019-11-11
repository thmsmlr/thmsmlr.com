import Head from 'next/head';
import Link from 'next/link';
import Layout from './';

import SiteDescription from '../components/site-description';

export default ({ post, children }) => (
  <Layout>
    <Head>
      <title>thmsmlr – {post.title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@thmsmlr" />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.description} />
      <meta property="og:image" content={`https://thmsmlr.com${post.imageUrl}`} />
    </Head>
    <div className="wrapper">
      <h3>
        <Link href="/">
          <a>thmsmlr</a>
        </Link>
      </h3>
      <header>
        <h1>{post.title}</h1>
        <span>
          {new Date(post.date).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}{' '}
          • {'☕️'.repeat(Math.ceil(post.readTimeInMinutes / 10))} {post.readTimeInMinutes} min read
        </span>
      </header>
      {children}
      <p>
        <a
          target="_blank"
          href={`https://mobile.twitter.com/search?q=${encodeURI(
            `https://thmsmlr.com${post.link}`
          )}`}>
          Discuss on Twitter
        </a>
        {' • '}
        <a
          target="_blank"
          href={`https://github.com/thmsmlr/thmsmlr.com/edit/master/pages${post.link}.js`}>
          Edit on GitHub
        </a>
      </p>
      <hr />
      <SiteDescription />
    </div>
    <style jsx global>
      {`
        .wrapper {
          margin: 0 auto;
          max-width: 750px;
          padding: 0 25px 200px;
        }

        hr {
          margin: calc(1.75rem - 1px) 0;
          background: hsla(0, 0%, 0%, 0.2);
          border: none;
          height: 1px;
        }

        header {
          margin-bottom: 2em;
        }

        header > h1 {
          margin-bottom: 0;
          line-height: 1.1;
        }

        header > span {
          font-size: 0.8em;
        }

        h3 a {
          color: inherit;
          text-decoration: none;
          box-shadow: none;
        }

        a {
          color: #007acc;
          text-decoration: none;
          box-shadow: 0 1px 0 0 currentColor;
        }

        a:hover,
        a:active {
          box-shadow: none;
        }
      `}
    </style>
  </Layout>
);
