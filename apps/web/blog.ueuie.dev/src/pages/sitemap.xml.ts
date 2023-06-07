/* ----------------------------------- SSR ---------------------------------- */
export const prerender = true;
import {} from "astro:content"
/* ----------------------------------- SSR ---------------------------------- */
import { EnumChangefreq, SitemapStream, streamToPromise, type SitemapItem } from 'sitemap';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { Readable } from 'node:stream';

export const get: APIRoute = async () => {
  try {
    const sitemap = new SitemapStream({
      hostname: 'https://blog.ueuie.dev',
    });

    /* -------------------------------- Overview -------------------------------- */
    sitemap.write({
      url: '/en/news',
      changefreq: EnumChangefreq.DAILY,
      priority: 1.0,
      img: [],
      links: [],
      video: [],
    } satisfies SitemapItem);

    sitemap.write({
      url: '/ua/news',
      changefreq: EnumChangefreq.DAILY,
      priority: 1.0,
      img: [],
      links: [],
      video: [],
    } satisfies SitemapItem);

    /* -------------------------------- RSS Feed -------------------------------- */
    // sitemap.write({
    //   url: '/blog/rss.xml',
    //   changefreq: EnumChangefreq.DAILY,
    //   priority: 0.8,
    //   img: [],
    //   links: [],
    //   video: [],
    // } satisfies SitemapItem);

    /* ---------------------------------- Posts --------------------------------- */
    await getCollection('posts').then((entries) =>
      entries.forEach((entry) => {
        const lang = entry.slug.split('/')[0];
        const slug = entry.slug.split('/')[1];
        sitemap.write({
          url: `/${lang}/posts/${slug}`,
          changefreq: EnumChangefreq.WEEKLY,
          priority: 0.6,
          lastmod: entry.data.updated.toISOString(),
          img: [],
          links: [],
          video: [],
        } satisfies SitemapItem);
      })
    );

    /* --------------------------------- Legals --------------------------------- */
    await getCollection('legals').then((entries) =>
      entries.forEach((entry) => {
        const lang = entry.slug.split('/')[0];
        const slug = entry.slug.split('/')[1];
        sitemap.write({
          url: `/${lang}/legal/${slug}`,
          changefreq: 'monthly',
          priority: 0.4,
          lastmodISO: entry.data.updated.toISOString(), // Update with your actual timestamp field
        });
      })
    );

    sitemap.end();

    return new Response(await streamToPromise(Readable.from(sitemap)), {
      headers: {
        'content-type': 'text/xml',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
      headers: {
        'content-type': 'text/xml',
      },
    });
  }
};
