import { actions as language_actions } from "@/shared/modules/language";
import { actions as theme_actions } from "@/shared/modules/theme";
import { named } from "@/shared/server/named";

import type { ActionArgs } from "@remix-run/cloudflare";

// ----
export async function action(args: ActionArgs) {
  return await named(args, {
    ...theme_actions,
    ...language_actions,
  });
}
