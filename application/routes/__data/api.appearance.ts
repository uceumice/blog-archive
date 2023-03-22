import { action as _action } from "@/api/appearance/_action";

import type { ActionFunction } from "@remix-run/cloudflare";

// ----
export const action: ActionFunction = (_) => {
  return _action(_);
};
