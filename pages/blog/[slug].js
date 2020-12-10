import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NotionRenderer } from 'react-notion';
import 'prismjs/components/prism-bash';

import Layout from 'layouts';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import slugify from 'lib/slugify';

export default function Page({ post, metadata }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <link rel="stylesheet" href="/css/notion.css" />
        <title>thmsmlr – {metadata.Name}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@thmsmlr" />
        <meta property="og:title" content={metadata.Name} />
        <meta property="og:description" content={metadata.Description} />
        <meta property="og:image" content={metadata?.PreviewImage?.[0]?.url} />
      </Head>
      <Navigation />
      <div className="max-w-screen-sm mx-auto px-2 md:px-4">
        {post ? (
          <>
            <header>
              <h2 className="mt-6 text-3xl md:text-4xl font-semibold leading-snug">
                {metadata.Name}
              </h2>
              <div className="mt-3 flex justify-between text-sm">
                <p className="flex items-center space-x-2">
                  <div className="inline-block w-6 h-6 rounded-full overflow-hidden">
                    <Image src="/images/profile-pic.jpg" width="50" height="50" />
                  </div>
                  <span>
                    Thomas Millar /{' '}
                    {new Date(metadata.PublishedOn).toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </p>
                <p className="text-gray-500">
                  <span>{metadata.ReadTimeInMinutes} min read</span>
                </p>
              </div>
            </header>
            <main className="mt-8">
              <NotionRenderer blockMap={post} />
            </main>
            <footer className="mt-8 text-center">
              <div className="mb-4 ml-2 w-2 h-2 bg-gray-600 transform rotate-45 inline-block"></div>
              <br />
              <a
                className="text-sm text-gray-600 border-b border-transparent cursor-pointer hover:border-gray-600"
                target="_blank"
                href={`https://mobile.twitter.com/search?q=https://thmsmlr.com/blog/${metadata.Slug}`}>
                Discuss on Twitter
              </a>
            </footer>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
    </Layout>
  );
}

export async function getStaticPaths() {
  let resp;
  resp = await fetch(
    'https://notion-api.splitbee.io/v1/table/4eb4df60-9e1c-4e8d-a3ef-29f24e7f555f'
  );
  const posts = await resp.json();

  return {
    paths: posts
      .filter((x) => x.isPublished)
      .map((x) => ({
        params: { slug: x.Slug || slugify(x.Name) },
      })),
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  let resp;
  resp = await fetch(
    'https://notion-api.splitbee.io/v1/table/4eb4df60-9e1c-4e8d-a3ef-29f24e7f555f'
  );
  const posts = await resp.json();
  const post = posts.find((x) => x.Slug === ctx.params.slug);
  const pageId = post.id;

  resp = await fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`);

  return {
    props: {
      post: await resp.json(),
      metadata: post,
    },
    revalidate: 1,
  };
}
