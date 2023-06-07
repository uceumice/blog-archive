import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContextFunction } from './context';
import { router } from './router/router';

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return fetchRequestHandler({
      responseMeta: () => ({
        headers:
          process.env.NODE_ENV === 'development'
            ? {
              'Access-Control-Allow-Origin': 'blog.',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Headers': '*',
              'Access-Control-Max-Age': '*',
              'Access-Control-Allow-Credentials': 'true',
            } : process.env.NODE_ENV === 'production' ? {
              'Access-Control-Allow-Origin': 'https://blog.ueuie.dev',
              'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE',
              'Access-Control-Allow-Headers': 'Content-Type, Accept',
              'Access-Control-Max-Age': '3600',
              'Access-Control-Allow-Credentials': 'false',
            } : undefined,
        status: 200,
      }),
      batching: { enabled: true },
      req,
      router,
      endpoint: '/api/trpc',
      onError: ({ error }) => {
        console.error(error);
      },
      createContext: createContextFunction(req, env, ctx),
    });
  },
};
