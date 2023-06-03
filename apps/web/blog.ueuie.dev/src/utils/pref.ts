import type { AstroGlobal } from 'astro';
import { z } from 'zod';

export const themes = ['black', 'light'] as const;

export interface Pref {
  theme: 'black' | 'light' | null;
  dir: 'ltr';
}

// ----
const parse = {
  theme: (value: unknown) => {
    try {
      return z.enum(themes).parse(value);
    } catch (e) {
      return null;
    }
  },
};

// ----
export async function getPrefSSR(astro: AstroGlobal): Promise<Pref> {
  return {
    theme: parse.theme(astro.cookies.get('pref.theme').value),
    dir: 'ltr',
  };
}
