import { t } from '@/server/trpc';

/* --------------------------------- router --------------------------------- */
export const information = t.router({
  locale: t.procedure.query(({ ctx: { req } }) => {
    return req.cf;
  }),
});
