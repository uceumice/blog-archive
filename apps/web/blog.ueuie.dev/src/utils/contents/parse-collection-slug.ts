import { locales, type Locale } from '~/utils/i18n';
import { z } from 'zod';

/* --------------------------------- Schema --------------------------------- */
export const zNumIntID = z.coerce.number().int().min(0);
export const zSnippets = z.array(z.string()).nonempty();
export const zSections = z.enum(["blog", "legal", "posts"]);

/* ---------------------------------- Types --------------------------------- */
export type Section = z.infer<typeof zSections>;

/* -------------------------------------------------------------------------- */
/*                                   Parser                                   */
/* -------------------------------------------------------------------------- */
/**
 * Parse a content.slug from the `content` collection...
 * @param slug
 * @returns
 */
export function parseContentCollectionSlug(value: string): [
    Locale,
    {
        id: number;
        section: Section;
    },
    {
        id: number;
        slug: string;
    }
] {
    const [locale_, section_, slug_] = z.string().nonempty().parse(value).split('/');

    // locale info
    const locale = z.enum(locales).parse(locale_);

    // section info
    const section = z
        .string()
        .transform((section) => {
            const [_id, ..._section] = section.split('-');

            return {
                id: zNumIntID.parse(_id),
                section: z.enum(["blog", "legal", "posts"]).parse(zSnippets.parse(_section).join('-'))
            };
        })
        .parse(section_);

    // slug info
    const slug = z
        .string()
        .transform((slug) => {
            const [_id, ..._slug] = slug.split('-');

            return {
                id: z.coerce.number().int().min(0).parse(_id),
                slug: zSnippets.parse(_slug).join('-')
            };
        })
        .parse(slug_);

    return [locale, section, slug];
}
