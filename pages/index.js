import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '../layouts';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';

const INSPIRING_PEOPLE = [
  { name: 'Chamath Palihapitiya', link: 'https://twitter.com/chamath', met: false },
  { name: 'George Hotz', link: 'https://www.instagram.com/georgehotz', met: false },
  { name: 'Ville Tuulos', link: 'https://twitter.com/vtuulos', met: false },
  { name: 'Marty Bell', link: 'https://twitter.com/marty', met: false },
  { name: 'Rafael Conde', link: 'https://twitter.com/rafahari', met: false },
  { name: 'Pieter Levels', link: 'https://twitter.com/levelsio', met: false },
  { name: 'Guillermo Rauch', link: 'https://twitter.com/rauchg', met: false },
  { name: 'Scott Adams', link: 'https://twitter.com/ScottAdamsSays', met: false },
  { name: 'Nick Huber', link: 'https://twitter.com/sweatystartup', met: false },
  { name: 'Adam Wathan', link: 'https://twitter.com/adamwathan', met: false },
  { name: 'Alec Strong', link: 'https://twitter.com/Strongolopolis', met: true },
];

export default function Page({ posts }) {
  return (
    <Layout>
      <Head>
        <title>thmsmlr – Thoughts n' stuff</title>
      </Head>
      <Navigation masthead={false} />
      <div className="max-w-screen-sm mx-auto px-6 md:px-2">
        <section className="relative">
          <div
            className="absolute pointer-events-none select-none left-0 top-0 -ml-48 -mt-24 transform opacity-25"
            style={{ transform: 'rotate(-18deg)', userDrag: 'none' }}>
            <Image
              priority={true}
              layout="fixed"
              width={488}
              height={211}
              src="/images/jazz-cup.png"
              alt=""
            />
          </div>

          <div className="relative z-30">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              <HidingName />
            </h1>
            <p className="mt-4 text-gray-700">
              This is where I explore ideas, and report my findings. You'll find stuff about code,
              cooking, and whatever else i'm into these days.
            </p>
          </div>
        </section>
      </div>
      <div className="mt-10 max-w-screen-sm mx-auto px-6 md:px-2">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-800">Featured</h2>
        <div className="mt-4 space-y-8">
          {posts
            .filter((p) => p.isFeatured)
            .map((post) => (
              <Link href={`/blog/${post.Slug}`} key={post.Name}>
                <a className="block group">
                  <h3 className="text-lg md:text-xl font-medium ">{post.Name}</h3>
                  <p className="mt-1 text-gray-700">{post.Description}</p>
                  <p className="mt-1 font-light text-gray-500 group-hover:underline">
                    Read this Article &rarr;
                  </p>
                </a>
              </Link>
            ))}
        </div>
      </div>
      <div className="mt-12 max-w-screen-sm mx-auto px-6 md:px-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
          Who inspires me
        </h2>
        <p className="mt-2 text-gray-700">
          These people inspire me. I'd love to meet them one day.
        </p>
        <ul className="mt-6" style={{ columnCount: '5', columnWidth: '160px' }}>
          {INSPIRING_PEOPLE.map((x, idx) => (
            <li className="p-1 flex items-center space-x-2 text-gray-800" key={idx}>
              <span
                className={`inline-block w-5 h-5 rounded border-2 cursor-pointer ${
                  x.met ? 'border-green-500 bg-green-100' : 'border-gray-600'
                } text-green-500`}>
                {x.met && (
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              <a
                className={`border-b-2 border-transparent leading-tight ${
                  x.met ? 'text-green-500 hover:border-green-500' : 'hover:border-gray-600'
                }`}
                target="_blank"
                href={x.link}>
                {x.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12 max-w-screen-sm mx-auto px-6 md:px-2">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-800">
          Things I’m building
        </h2>
        <ul className="mt-4 space-y-2 text-gray-800" style={{ listStyleType: '\u2190' }}>
          <li className="flex items-center space-x-4">
            <div className="ml-2 w-2 h-2 bg-gray-600 transform rotate-45"></div>
            <a className="hover:underline" href="https://billclintonswag.com" target="_blank">
              https://billclintonswag.com
            </a>
          </li>
        </ul>
      </div>

      <Footer />
    </Layout>
  );
}

const HidingName = ({ showOnMount = false }) => {
  const c = 'disappear';
  return (
    <>
      <span className="root">
        I’m th
        <span className={c}>o</span>m<span className={c}>a</span>s<span className={c}>&nbsp;</span>m
        <span className={c}>il</span>l<span className={c}>a</span>r
      </span>
      <style jsx>{`
        .root {
          text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;
        }

        .disappear {
          display: inline-block;
          overflow: hidden;
          max-width: 0rem;
          opacity: 0;
          transition: max-width 1s, opacity 1s;
          animation: 4s linear 1s peek;
        }

        .root:hover .disappear {
          max-width: 2rem;
          opacity: 1;
        }

        @keyframes peek {
          0% {
            max-width: 0rem;
            opacity: 0;
          }
          25% {
            max-width: 2rem;
            opacity: 1;
          }
          75% {
            max-width: 2rem;
            opacity: 1;
          }
          100% {
            max-width: 0rem;
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export async function getStaticProps(ctx) {
  let resp;
  resp = await fetch(
    'https://notion-api.splitbee.io/v1/table/4eb4df60-9e1c-4e8d-a3ef-29f24e7f555f'
  );

  let posts = await resp.json();
  posts = posts.filter((x) => x.isPublished);

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}
