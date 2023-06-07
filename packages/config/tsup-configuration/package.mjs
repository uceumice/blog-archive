/** @type {import("tsup").Options} */
export const options = {
    bundle: true,
    dts: true,
    entry: "./src/index.ts",
    sourcemap: true,
    format: ["cjs", "esm"],
    outDir: "dist",
}