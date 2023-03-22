import { useThemeStore } from "@/shared/modules/theme/store";
import { forwardRef, useMemo } from "react";
import { RxSun, RxMoon, RxDot } from "react-icons/rx";
import clsx from "clsx";

// ----
export const ToggleTheme = forwardRef<
  HTMLButtonElement,
  Omit<React.HTMLProps<HTMLButtonElement>, "onClick">
>(({ className, ...props }, ref) => {
  const mode = useThemeStore((s) => s.mode);
  const change = useThemeStore((s) => s.setNextMode);

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
