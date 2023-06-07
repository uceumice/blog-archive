import { defineConfig } from 'tsup';

export default defineConfig({
  bundle: true,
  dts: true,
  entry: ['./constants/index.ts'],
  sourcemap: true,
  format: ["cjs", "esm"],
  outDir: "dist",
});
