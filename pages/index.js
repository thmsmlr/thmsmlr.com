import Head from 'next/head';
import Link from 'next/link';

import Layout from '../layouts';
import SiteDescription from '../components/site-description';

const Posts = [
  require('./blog/leverage-the-selfish').default,
  require('./blog/distributed-tracing-zero-to-one').default
];

const Page = () => (
  <Layout>
    <Head>
      <title>thmsmlr – All posts</title>
    </Head>
    <div className="wrapper">
      <h1>thmsmlr</h1>
      <div className="site-description">
        <SiteDescription />
      </div>
      {Posts.map(post => (
        <div className="post" key={post.title}>
          <header>
            <h2>
              <Link href={post.link}>
                <a>{post.title}</a>
              </Link>
            </h2>
            <span>
              {new Date(post.date).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}{' '}
              • {'☕️'.repeat(Math.ceil(post.readTimeInMinutes / 10))} {post.readTimeInMinutes} min
              read
            </span>
          </header>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
    <style jsx global>
      {`
        .wrapper {
          margin: 0 auto;
          max-width: 750px;
          padding: 0 25px 200px;
        }

        .post {
          margin-bottom: 4em;
        }

        h1 {
          font-size: 2.5em;
        }

        .site-description {
          margin-bottom: 75px;
        }

        header {
          margin-bottom: 1em;
        }

        header > h2 {
          margin-bottom: 0;
          line-height: 1.1;
        }

        header > span {
          font-size: 0.8em;
        }

        h2 a {
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

export default Page;
