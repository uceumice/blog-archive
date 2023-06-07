import { options } from "@uceumice/tsup/package.mjs";
import { defineConfig } from 'tsup';

export default defineConfig({
  ...options,
  entry: ['./constants/index.ts']
});
