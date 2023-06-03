import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

export async function getLegalPage(lang: Lang, slug: string) {
  const pages = await getCollection('legals', (entry) => {
    const [_lang, _slug] = entry.slug.split('/');

    if (_lang !== lang) {
      return false;
    }
    if (![...(entry.data.slugs ? entry.data.slugs : []), _slug].includes(slug)) {
      return false;
    }

    return true;
  });

  if (!pages[0]) {
    return null;
  }
  if (pages[1]) {
    throw new Error('There is an overlap between different `slugs` for legal pages!');
  }
  return pages[0];
}
