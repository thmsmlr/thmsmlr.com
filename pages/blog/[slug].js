import Head from 'next/head';
import Link from 'next/link';
import { NotionRenderer } from 'react-notion';
import 'prismjs/components/prism-bash';

import Layout from 'layouts';
import SiteDescription from 'components/site-description';
import { getPage, getTable } from 'lib/notion';
import slugify from 'lib/slugify';

export default function Page({ post, metadata }) {
  return (
    <Layout>
      <Head>
        <link rel="stylesheet" href="/css/notion.css" />
        <title>thmsmlr – {metadata.Name}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@thmsmlr" />
        <meta property="og:title" content={metadata.Name} />
        <meta property="og:description" content={metadata.Description} />
        <meta
          property="og:image"
          content={`https://www.notion.so/image/${encodeURIComponent(metadata.PreviewImage)}`}
        />
      </Head>
      <div className="max-w-screen-sm mx-auto px-2 md:px-4">
        <h1 className="mt-4 text-xl font-semibold leading-none">
          <Link href="/">
            <a>thmsmlr</a>
          </Link>
        </h1>

        {post ? (
          <>
            <header>
              <h2 className="mt-6 text-3xl md:text-4xl font-semibold leading-snug">
                {metadata.Name}
              </h2>
              <p className="space-x-1 text-sm">
                <span>
                  {new Date(metadata.PublishedOn).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>•</span>
                <span>
                  <span className="mr-2">
                    {'☕️'.repeat(Math.ceil(metadata.ReadTimeInMinutes / 10))}
                  </span>
                  {metadata.ReadTimeInMinutes} min read
                </span>
              </p>
            </header>
            <main className="mt-8">
              <NotionRenderer blockMap={post.recordMap.block} />
            </main>
            <footer className="mt-8 space-y-6 mb-16">
              <div className="space-x-1">
                <a
                  className="text-blue-600 border-b border-blue-600 cursor-pointer hover:border-transparent"
                  href={`https://mobile.twitter.com/search?q=https://thmsmlr.com/blog/${metadata.Slug}`}>
                  Discuss on Twitter
                </a>
              </div>
              <hr />
              <SiteDescription />
            </footer>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getTable('4eb4df60-9e1c-4e8d-a3ef-29f24e7f555f');
  return {
    paths: posts.map((x) => ({
      params: { slug: x.Slug || slugify(x.Name) },
    })),
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  const posts = await getTable('4eb4df60-9e1c-4e8d-a3ef-29f24e7f555f');
  const post = posts.find((x) => x.Slug === ctx.params.slug);
  const pageId = post.id;
  return {
    props: {
      post: await getPage(pageId),
      metadata: post,
    },
  };
}
