export const prerender = true;
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import cloudflare from '@astrojs/cloudflare';
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.ueuie.dev',
  integrations: [mdx(), tailwind(), partytown(), prefetch(), solidJs()],
  output: 'server',
  adapter: cloudflare({ mode: 'advanced' }),
});
