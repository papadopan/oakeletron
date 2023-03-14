import { createClient } from 'contentful';
import type { Post } from '@/types';
import { NextPage } from 'next';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Head from 'next/head';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});
export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: 'article' });
  const paths = res.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const { slug } = context.params;
  const res = await client.getEntries({
    content_type: 'article',
    'fields.slug': slug,
  });
  return {
    props: {
      blog: res.items[0],
    },
  };
};

const BlogItem: NextPage<{ blog: Post }> = ({ blog }) => {
  return (
    <>
      <Head>
        <title>{blog.fields.title}</title>
        <meta name="description" content={blog.fields.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl">{blog.fields.title}</h1>
        <Image
          src={`https:${blog.fields.image.fields.file.url}`}
          width={blog.fields.image.fields.file.details.image.width}
          height={blog.fields.image.fields.file.details.image.height}
          alt={blog.fields.image.fields.title}
          className="w-full h-70 my-8"
        />
        <p className="my-4">
          {new Date(blog.fields.date).toLocaleString('el-El', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="my-6">
          <Image
            src={`https:${blog.fields.author.fields.image.fields.file.url}`}
            width={200}
            height={200}
            alt={"Author's picture"}
            className="w-16 h-16 rounded-full"
          />
          <p>{blog.fields.author.fields.name}</p>
        </div>
        <article className="antialiased tracking-wide leading-loose decoration-3">
          {documentToReactComponents(blog.fields.body)}
        </article>
      </div>
    </>
  );
};

export default BlogItem;
