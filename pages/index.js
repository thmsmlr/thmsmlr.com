import Head from 'next/head';
import Link from 'next/link';

import Layout from '../layouts';
import SiteDescription from '../components/site-description';
import { getPage, getTable } from 'lib/notion';

const Posts = [];

export default function Page({ posts }) {
  return (
    <Layout>
      <Head>
        <title>thmsmlr – All posts</title>
        <link rel="stylesheet" href="/css/notion.css" />
      </Head>
      <div className="max-w-screen-md mx-auto px-2 md:px-4">
        <h1 className="mt-8 text-4xl font-semibold leading-none">thmsmlr</h1>
        <div className="my-8">
          <SiteDescription />
        </div>
        {posts.map((post) => (
          <div className="mt-12" key={post.Name}>
            <header>
              <h2>
                <Link href="/blog/[slug]" as={`/blog/${post.Slug}`}>
                  <a className="text-2xl leading-snug font-medium text-blue-600 cursor-pointer">
                    {post.Name}
                  </a>
                </Link>
              </h2>
              <p className="space-x-1 text-sm">
                <span>
                  {new Date(post.PublishedOn).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span>
                  <span className="mr-2">
                    {'☕️'.repeat(Math.ceil(post.ReadTimeInMinutes / 10))}
                  </span>
                  {post.ReadTimeInMinutes} min read
                </span>
              </p>
            </header>
            <p className="mt-4">{post.Description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  let posts = await getTable('4eb4df60-9e1c-4e8d-a3ef-29f24e7f555f');
  posts = posts.filter((x) => x.isPublished);

  return {
    props: {
      posts,
    },
  };
}
