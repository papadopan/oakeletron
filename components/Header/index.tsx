import Link from 'next/link';

export function Header() {
  return (
    <>
      <header>
        <nav className="bg-white h-10 p-8 flex flex-row-reverse items-center">
          <Link href="/blog" className="text-gray-700">
            Blog
          </Link>
        </nav>
      </header>
    </>
  );
}
