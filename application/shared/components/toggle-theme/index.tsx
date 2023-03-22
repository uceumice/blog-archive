import clsx from "clsx";
import { forwardRef, useMemo } from "react";
import { RxSun, RxMoon, RxDot } from "react-icons/rx";

import { useThemeStore } from "@/shared/modules/theme/store";

// ----
export const ToggleTheme = forwardRef<
  HTMLButtonElement,
  Omit<React.HTMLProps<HTMLButtonElement>, "onClick">
>(({ className }, ref) => {
  const mode = useThemeStore((s) => {
    return s.mode;
  });
  const change = useThemeStore((s) => {
    return s.setNextMode;
  });

  const Icon = useMemo(() => {
    if (mode === "dark") return RxSun;
    if (mode === "light") return RxMoon;
    return RxDot;
  }, [mode]);
  return (
    <button
      ref={ref}
      className={clsx(["btn btn-md btn-circle", className])}
      onClick={change}
    >
      <Icon className={clsx(["w-5 h-5"])} />
    </button>
  );
});
