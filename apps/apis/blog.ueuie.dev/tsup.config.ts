import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/router/router.ts'],
  outDir: './dist.type',
  format: [],
  sourcemap: true,
  dts: true,
});
