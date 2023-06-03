import type { AstroGlobal } from 'astro';

export function setCanonical(astro: AstroGlobal, ...links: string[]) {
  astro.response.headers.set(`Link`, `<https://blog.ueuie.dev/${links.join('/')}>; rel="canonical"`);
}
