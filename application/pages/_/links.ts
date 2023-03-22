import type { LinkDescriptor, LinksFunction } from "@remix-run/cloudflare";

import styles from "@/root.css";

// ----
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    {
      href: "https://fontbit.io",
      rel: "preconnect",
    },
    {
      href: `https://fontbit.io/css2?${[
        `family=Archivo:wght@400;700`,
        `family=Public+Sans`,
        `family=Gaegu`,
      ].join("&")}&display=swap`,
      rel: "stylesheet",
    },
    ...favicons,
  ];
};

// ----
const favicons: LinkDescriptor[] = [
  {
    href: "/favicons/apple-touch-icon.png",
    rel: "apple-touch-icon",
    sizes: "180x180",
  },
  {
    href: "/favicons/favicon-32x32.png",
    type: "image/png",
    rel: "icon",
    sizes: "32x32",
  },
  {
    href: "/favicons/favicon-16x16.png",
    type: "image/png",
    rel: "icon",
    sizes: "16x16",
  },
  {
    href: "/favicons/safari-pinned-tab.svg",
    color: "#1b1b1b",
    rel: "mask-icon",
  },
  {
    rel: "shortcut icon",
    href: "/favicons/favicon.ico",
  },
];

// TODO: New Favicons Configuration
// <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png?v=1.0.0">
// <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png?v=1.0.0">
// <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png?v=1.0.0">
// <link rel="manifest" href="/favicons/site.webmanifest?v=1.0.0">
// <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg?v=1.0.0" color="#1b1b1b">
// <link rel="shortcut icon" href="/favicons/favicon.ico?v=1.0.0">
// <meta name="msapplication-TileColor" content="#ffffff">
// <meta name="msapplication-config" content="/favicons/browserconfig.xml?v=1.0.0">
// <meta name="theme-color" content="#ffffff">
