import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@uceumice/data.ueuie.dev';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: (import.meta.env.DEV ? 'http://127.0.0.1:8787' : import.meta.env.SITE) + '/api/trpc',
    }),
  ],
});