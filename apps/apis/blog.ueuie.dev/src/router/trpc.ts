import { initTRPC } from '@trpc/server';
import { Context } from '@/context';
import { newsletter } from './newsletter/trpc';

export const t = initTRPC.context<Context>().create();

export const { router } = t;
export const { procedure } = t;

/* --------------------------------- router --------------------------------- */
export const app = router({ newsletter });

export type AppRouter = typeof app;
