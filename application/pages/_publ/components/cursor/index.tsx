import clsx from "clsx";
import { useEffect } from "react";

import { useGlobalCursor } from "@/shared/store/global.cursor.store";

// ----
export function Cursor() {
  const visible = useGlobalCursor((s) => {
    return s.visible;
  });
  const position = useGlobalCursor((s) => {
    return s.position;
  });
  const setPosition = useGlobalCursor((s) => {
    return s.set.position;
  });

  // ----
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.pageX, y: e.pageY });
    };

    // ----
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [setPosition]);

  return (
    <div className={clsx([!visible && "hidden", "max-sm:hidden"])}>
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transitionDuration: "1.2s",
          transitionTimingFunction: "cubic-bezier(0.07, 1.18, 1, 1)",
        }}
        className={clsx([
          "w-1 h-1",
          "absolute",
          "bg-primary-content",
          "rounded-lg",
          "z-[100000000]",
        ])}
      />
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transitionDuration: "0.1s",
          transitionTimingFunction: "cubic-bezier(0.07, 1.18, 1, 1)",
        }}
        className={clsx([
          "w-4 h-4",
          "absolute",
          "border-2 border-solid border-primary-content",
          "rounded-full",
        ])}
      />
    </div>
  );
}
