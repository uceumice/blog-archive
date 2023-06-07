import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/router/trpc.ts'],
  outDir: './dist.type',
  format: [],
  sourcemap: true,
  dts: true,
});
