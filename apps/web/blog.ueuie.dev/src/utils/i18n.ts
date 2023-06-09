import type { AstroGlobal } from 'astro';
import { z } from 'zod';

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */
export const localesLabels = {
  en: 'English',
  de: 'Deutsch',
  ua: 'Українська',
} as const;

export const locales = Object.keys(localesLabels) as ['en', 'de', 'ua'];

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type Locale = keyof typeof localesLabels;

/* -------------------------------------------------------------------------- */
/*                                   Parser                                   */
/* -------------------------------------------------------------------------- */
export function parseLocale(value: unknown) {
  try {
    return z.enum(locales).parse(value);
  } catch (e) {
    return null;
  }
}

/**
 * Get the locale from "global" `{locale}` parameter...
 */
export function getLocale({ params }: AstroGlobal): Locale {
  let locale: Locale | null = null;

  /* ------------------------- choose by `parameters` ------------------------- */
  if (params.locale) {
    locale = parseLocale(params.locale);
    if (locale) return locale;
  }

  return locales[0];
}

export const getLabels = function <
  T extends Record<string, string | ((...args: unknown[]) => string)>,
  D extends Record<string, Record<Locale, string> | ((...args: any[]) => Record<Locale, string>)> = Record<
    string,
    Record<Locale, string> | ((...args: any[]) => Record<Locale, string>)
  >
>(astro: AstroGlobal, labels: D): T {
  return Object.fromEntries(
    Object.entries<Record<Locale, string> | ((...args: unknown[]) => Record<Locale, string>)>(labels).map(([key, value]) => {
      if (typeof value === 'function') {
        const getter = (...args: Parameters<typeof value>) => {
          return value(...args)[getLocale(astro)];
        };
        return [key, getter];
      } else {
        return [key, value[getLocale(astro)]];
      }
    })
  ) as T;
};
