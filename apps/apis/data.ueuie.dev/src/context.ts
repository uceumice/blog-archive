import { inferAsyncReturnType } from '@trpc/server';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/server/data/schema';
// ----
export function createContextFunction(req: Request, env: Env, ctx: ExecutionContext) {
  return async function cretaeContext() {
    return {
      env,
      ctx,
      orm: drizzle(env.D1, { schema }),
    };
  };
}

export type Context = inferAsyncReturnType<ReturnType<typeof createContextFunction>>;
