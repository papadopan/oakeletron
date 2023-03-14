import { createClient } from 'contentful';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types';

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl mb-8">Ανακοινώσεις</h1>
      <div className="grid grid-cols-1 gap-16 xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4">
        {posts.map((post: any) => (
          <div key={post.sys.id}>
            <Link href={`blog/${post.fields.slug}`}>
              <Image
                src={`https:${post.fields.image.fields.file.url}`}
                width={post.fields.image.fields.file.details.image.width}
                height={post.fields.image.fields.file.details.image.height}
                alt={post.fields.image.fields.title}
                className="w-full h-48"
              />

              <h2>{post.fields.title}</h2>
              <p>{post.fields.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  });

  const res = await client.getEntries({ content_type: 'article' });

  return {
    props: {
      posts: res.items,
    },
  };
};

export default Blog;
