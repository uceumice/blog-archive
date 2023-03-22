import { generateRobotsTxt } from "@balavishnuvj/remix-seo";

// ----
export function loader() {
  return generateRobotsTxt([
    // { type: "sitemap", value: "https://www.ueuie.dev/sitemap.xml" },
    { type: "disallow", value: "/manage" },
    { type: "disallow", value: "/manage/*" },
  ]);
}
