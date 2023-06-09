import { locales } from "~/utils/i18n";
import { z } from "zod";

export const zParamsLocale = z.object({
    locale: z.enum(locales)
});