import { createClient } from 'contentful';
import { NextPage } from 'next';
import Image from 'next/image';

const Blog: NextPage<{ posts: [] }> = ({ posts }) => {
  console.log('----', posts);
  return (
    <>
      <h1>Blog</h1>
      {posts.map((post: any) => (
        <div key={post.sys.id}>
          <Image
            src={`https:${post.fields.image.fields.file.url}`}
            width={200}
            height={200}
            alt={post.fields.image.fields.title}
          />

          <h2>{post.fields.title}</h2>
          <p>{post.fields.description}</p>
        </div>
      ))}
    </>
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
