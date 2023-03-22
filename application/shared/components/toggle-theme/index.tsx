import clsx from "clsx";
import { forwardRef, useMemo } from "react";
import { RxSun, RxMoon, RxDot } from "react-icons/rx";

import { useThemeStore } from "@/shared/modules/theme/store";
import { useTranslate } from "@/shared/modules/language";

// ----
export const ToggleTheme = forwardRef<
  HTMLButtonElement,
  Omit<React.HTMLProps<HTMLButtonElement>, "onClick" | "ref">
>(({ className, ...props }, ref) => {
  const t = useTranslate();
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
    // @ts-ignore
    <button
      ref={ref}
      className={clsx(["btn btn-md btn-circle", className])}
      onClick={change}
      {...props}
    >
      <Icon
        className={clsx(["w-5 h-5"])}
        aria-label={t({
          en: "Change Color Theme",
          de: "Farbenpalette ändern",
        })}
      />
    </button>
  );
});
