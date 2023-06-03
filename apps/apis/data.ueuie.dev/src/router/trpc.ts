import { initTRPC } from '@trpc/server';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { dayjs } from '@/server/utils/date';
import { emails } from '@/server/data/schema';
import { Context } from '@/context';
import { eq, sql } from 'drizzle-orm';

export const t = initTRPC.context<Context>().create();

export const { router } = t;
export const { procedure } = t;

export const app = router({
  hello: procedure.input(z.string().nullish()).query(({ input }) => `hello ${input ?? 'world'}`),
  newsletter: router({
    add: procedure.input(z.object({ email: z.string() })).mutation(async ({ input: { email }, ctx: { orm } }) => {
      const { exists } = await orm.get<{ exists: boolean }>(sql`select exists(${orm.select({ n: sql`1` }).from(emails).where(eq(emails.email, email))}) as exists`);
      if (!exists) return false;

      // ----
      const { success } = await orm.insert(emails).values({ email, id: nanoid(), timestamp: dayjs.utc().toDate() }).run();
      if (!success) return false;
      return true;
    }),
  }),
});

export type AppRouter = typeof app;
