import { Outlet } from "@remix-run/react";
import { ReactLenis } from "@studio-freight/react-lenis";

import { Cursor } from "./components/cursor";

// ----
export function $$Publ() {
  return (
    <ReactLenis root options={{}}>
      <div className="w-full h-full cursor-none">
        <Cursor />
        <Outlet />
      </div>
    </ReactLenis>
  );
}
