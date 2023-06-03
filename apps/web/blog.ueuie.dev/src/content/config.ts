import { defineCollection, reference, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    authors: z.array(reference('authors')),
    updated: z.date(),
    title: z.string(),
  }),
});

const legal = defineCollection({
  type: 'content',
  schema: z.object({
    updated: z.date(),
    title: z.string(),
    slugs: z.array(z.string()).optional(),
  }),
});

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
  }),
});

export const collections = { authors: authors, legals: legal, posts: posts };
