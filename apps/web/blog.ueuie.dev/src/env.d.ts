/// <reference path="../.astro-i18n/generated.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types"/>

import type { CreateTRPCProxyClient } from '@trpc/client';
import type { AppRouter } from '@uceumice/data.ueuie.dev';

export interface Env {
  API_URL: string;
  db: D1Database;
}

declare module 'astro' {
  declare namespace App {
    export interface Locals {
      trpc: CreateTRPCProxyClient<AppRouter>;
    }
  }
}
