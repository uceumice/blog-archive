import { defineCollection, reference, z } from 'astro:content';
import { lang } from '@uceumice/constants';

/* -------------------------------------------------------------------------- */
/*                                 Content Types                              */
/* -------------------------------------------------------------------------- */
export const base = z.object({
  type: z.literal('base').optional().default('base'),
  // info
  title: z.string(),
  // meta
  date: z.object({
    written: z.date(),
    updated: z.date(),
  }),
});

export const legal = base.extend({
  type: z.literal('docs'),
});

export const posts = base.extend({
  type: z.literal('post'),
  authors: z.array(reference('authors')),
});

/* -------------------------------------------------------------------------- */
/*                                 Data Types                                 */
/* -------------------------------------------------------------------------- */
export const author = z.object({
  id: z.string(),
  date: z.object({
    joined: z.coerce.date(),
  }),
  languages: z
    .array(z.enum(lang))
    .nonempty()
    .refine((items) => new Set(items).size === items.length, {
      message: 'Language cannot be referenced more then once',
    }),
});

/* -------------------------------------------------------------------------- */
/*                            Collection Definition                           */
/* -------------------------------------------------------------------------- */
const authors = defineCollection({
  type: 'data',
  schema: author,
});

const content = defineCollection({
  type: 'content',
  schema: z.discriminatedUnion('type', [legal, posts]),
});

export const collections = { authors, content };
