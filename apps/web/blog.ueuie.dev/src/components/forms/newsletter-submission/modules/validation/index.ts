import { z } from 'zod';

export const schemaNewsletterSubscription = z.object({
  email: z.string().email(),
});

export type NewsletterSubscription = z.infer<typeof schemaNewsletterSubscription>;
