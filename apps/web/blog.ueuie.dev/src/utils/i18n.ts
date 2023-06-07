import type { AstroGlobal } from 'astro';
import { lang } from "@uceumice/constants";
import { z } from 'zod';

export type Lang = (typeof lang)[number];

export const parse = {
  lang: (value: unknown) => {
    try {
      return z.enum(lang).parse(value);
    } catch (e) {
      return null;
    }
  },
};

// ----
export function getLocale({  params }: AstroGlobal): Lang {

  let l: Lang | null = null;

  /* ------------------------- choose by `parameters` ------------------------- */
  if (params.lang) {
    l = parse.lang(params.lang);
    if (l) return l;
  }

  return lang[0];
}


// type Labels<L extends Record<string, string | ((...args: any[]) => string)>> = {
//   [K in keyof L]: L[K] extends ((...args: any[]) => string)
//   ? (...args: Parameters<L[K]>) => Record<Lang, string>
//   : Record<Lang, string>;
// };

export const getLabels = function <T extends Record<string, string | ((...args: unknown[]) => string)>, D extends Record<string, Record<Lang, string> | ((...args: any[]) => Record<Lang, string>)> = Record<string, Record<Lang, string> | ((...args: any[]) => Record<Lang, string>)>>(astro: AstroGlobal, labels: D): T {
  return Object.fromEntries(Object.entries<Record<Lang, string> | ((...args: unknown[]) => Record<Lang, string>)>(labels).map(([key, value]) => {
    if (typeof value === "function") {
      const getter = (...args: Parameters<typeof value>) => {
        return value(...args)[getLocale(astro)];
      }
      return [key, getter];
    } else {
      return [key, value[getLocale(astro)]];
    }
  })) as T;
}


