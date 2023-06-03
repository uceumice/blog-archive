import type { AstroGlobal } from 'astro';
import type { RequestInit } from '@cloudflare/workers-types';
import { PREFERED_LANGUAGE_KEY } from './constants/cookies';
import { z } from 'zod';

export const langs = ['en', 'ua'] as const;
export type Lang = (typeof langs)[number];

export const parse = {
  lang: (value: unknown) => {
    try {
      return z.enum(langs).parse(value);
    } catch (e) {
      return null;
    }
  },
};

// ----
export function getLangSSR({ cookies, request }: AstroGlobal): Lang {
  const country: Iso3166Alpha2Code | 'T1' | undefined = (request as RequestInit).cf?.country as Iso3166Alpha2Code | 'T1' | undefined;

  if (country) {
    if (country === 'DE') {
      return 'en';
    }
    if (country === 'UA') {
      return 'ua';
    }
  }

  return parse.lang(cookies.get(PREFERED_LANGUAGE_KEY).value) || 'en';
}
