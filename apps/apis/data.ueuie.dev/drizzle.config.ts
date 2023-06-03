import type { Config } from 'drizzle-kit';

export default {
  schema: './src/server/data/schema.ts',
  out: './drizzle',
} satisfies Config;
