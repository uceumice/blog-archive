import { useLanguageStore } from "@/shared/modules/language/store";
import { forwardRef } from "react";
import clsx from "clsx";

// ----
export const ToggleLanguage = forwardRef<
  HTMLButtonElement,
  Omit<React.HTMLProps<HTMLButtonElement>, "onClick" | "ref">
>(({ className, ...props }, ref) => {
  const mode = useLanguageStore((s) => {
    return s.language;
  });
  const change = useLanguageStore((s) => {
    return s.setNextLanguage;
  });

  return (
    // @ts-ignore
    <button
      ref={ref}
      className={clsx(["btn btn-md btn-circle", className])}
      onClick={change}
      {...props}
    >
      <span
        className={clsx([
          "w-5 h-5",
          "flex justify-center items-center uppercase font-bold",
        ])}
      >
        {mode}
      </span>
    </button>
  );
});
