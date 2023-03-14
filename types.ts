import type { Document } from '@contentful/rich-text-types';
export type Post = {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    slug: string;
    date: string;
    body: Document;
    author: {
      fields: {
        name: string;
        image: {
          fields: {
            file: {
              url: string;
            };
          };
        };
      };
    };
    description: string;
    image: {
      fields: {
        file: {
          url: string;
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
        title: string;
      };
    };
  };
};
