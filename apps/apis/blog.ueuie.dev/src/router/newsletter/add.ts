import { z } from "zod";
import { procedure } from "../trpc";
import { sql } from "drizzle-orm";
import { emails } from "@/server/data/schema";
import { nanoid } from "nanoid";
import { dayjs } from '@/server/utils/date';
import { type MailDataRequired } from "@sendgrid/mail";
import { FetchError } from "ohmyfetch";
import { lang, pref } from "@uceumice/constants"

/* ------------------------------- validation ------------------------------- */
const schema = {
    input: z.object({
        email: z.string(),
        lang: z.enum(lang),
        pref: z.object({
            mode: z.enum(pref.mode)
        })
    }),
    output: z.boolean()
}

/* ---------------------------------- logic --------------------------------- */
export const add = procedure.input(schema.input).output(schema.output).mutation(
    async ({ input, ctx: { orm, fetch } }) => {
        // [1] check if email was already added
        const { exists } = await orm.get<{ exists: boolean }>(sql`SELECT EXISTS(SELECT 1 FROM ${emails} WHERE ${emails.email} = ${input.email}) as "exists"`);
        if (exists) {
            return false;
        }

        // [1] insert the email into the list (include timestamp and id that would be used to remove the email from the list)
        const inserted = await orm.insert(emails).values({ id: nanoid(), email: input.email, timestamp: dayjs.utc().toDate() }).run();
        if (!inserted.success) {
            return false;
        }

        /* --------------------------------- SUCCESS -------------------------------- */
        const response = await fetch.sendgrid("/mail/send", {
            body: {
                from: {
                    name: "UCEUMICE",
                    email: "notify@ueuie.dev"
                },
                subject: "UEUIE | You subscribed to notifications",
                content: [{
                    type: "text/html",
                    value: "Hello, email has been set!"
                }],
                personalizations: [{
                    to: [{
                        email: input.email
                    }]
                }]
            } satisfies MailDataRequired
        }).catch((error: FetchError) => {
            console.log(JSON.stringify(error.response?._data, undefined, 2))
        })

        return true;
    });