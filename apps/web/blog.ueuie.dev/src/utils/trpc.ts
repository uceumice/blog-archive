import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { Router } from '@uceumice/blog.ueuie.dev.api';

export const trpc = createTRPCProxyClient<Router>({
  links: [
    httpBatchLink({
      url: (import.meta.env.DEV ? 'http://127.0.0.1:8787' : "https://blog.ueuie.dev") + '/api/trpc',
    }),
  ],
});
