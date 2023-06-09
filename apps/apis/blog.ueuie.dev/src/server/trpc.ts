import { initTRPC } from '@trpc/server';
import { Context } from '@/context';

/* ---------------------------------- init ---------------------------------- */
export const t = initTRPC.context<Context>().create();
