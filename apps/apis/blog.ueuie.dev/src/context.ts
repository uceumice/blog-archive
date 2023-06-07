import { inferAsyncReturnType } from '@trpc/server';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/server/data/schema';
import { $fetch } from 'ohmyfetch';
// ----
export function createContextFunction(req: Request, env: Env, ctx: ExecutionContext) {
  const sendgrid = $fetch.create({
    baseURL: "https://api.sendgrid.com/v3",
    headers: {
      "Authorization": `Bearer ${env.SENDGRID_API_KEY}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  });


  return async function createContext() {
    return {
      req,
      env,
      ctx,
      orm: drizzle(env.D1, { schema }),
      fetch: {
        sendgrid
      }
    };
  };
}

export type Context = inferAsyncReturnType<ReturnType<typeof createContextFunction>>;
