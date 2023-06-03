import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { app } from './router/trpc';
import { createContextFunction } from './context';

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return fetchRequestHandler({
      responseMeta: () => ({
        headers:
          process.env.NODE_ENV === 'development'
            ? {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Max-Age': '*',
                'Access-Control-Allow-Credentials': 'true',
              }
            : undefined,
        status: 200,
      }),
      batching: { enabled: true },
      req,
      router: app,
      endpoint: '/api/trpc',
      createContext: createContextFunction(req, env, ctx),
    });
  },
};
