import { useGlobalCursor } from "@/shared/store/global.cursor.store";
import { useEffect } from "react";
import clsx from "clsx";

// ----
export function Cursor() {
  const visible = useGlobalCursor((s) => s.visible);
  const position = useGlobalCursor((s) => s.position);
  const setPosition = useGlobalCursor((s) => s.set.position);

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
  }, []);

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
