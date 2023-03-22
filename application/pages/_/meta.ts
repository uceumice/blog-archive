import type { MetaFunction } from "@remix-run/cloudflare";

// ----
export const meta: MetaFunction = () => {
  return {
    viewport: "width=device-width,initial-scale=1",
    charSet: "utf-8",
    title: "🥱 UCEUMICE 👀",
    description:
      "This is my (UCEUMICE's) personal website. Here you can find my portfolio, my projects, my music, and basically everything that I take interest in!",
    "msapplication-TileColor": "#ffffff",
    "msapplication-config": "/favicons/browserconfig.xml",
    "theme-color": "#ffffff",
  };
};
