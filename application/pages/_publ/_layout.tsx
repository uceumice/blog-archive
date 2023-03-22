import { Outlet } from "@remix-run/react";
import { Cursor } from "./components/cursor";
import { ReactLenis } from "@studio-freight/react-lenis";

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
