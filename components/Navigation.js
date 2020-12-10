import Link from 'next/link';

export default function Navigation({ children, masthead = true }) {
  return (
    <div className="my-4 md:my-10 py-2">
      <div className="max-w-screen-md mx-auto px-6 md:px-2 flex items-center justify-between text-gray-800">
        <div>
          {masthead && (
            <Link href="/">
              <a className="text-xl font-bold tracking-tight">thmsmlr</a>
            </Link>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <Link href="/blog">
            <a className="px-4 py-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-50">Blog</a>
          </Link>
          <Link href="/about">
            <a className="px-4 py-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-50">About</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
