import React from "react";

import { use$$Root } from "@/pages/_/_loader";
import { LanguageProvider } from "@/shared/modules/language/components/language-provider";
import { ThemeProvider } from "@/shared/modules/theme";

// ----
export function Providers({ children }: React.PropsWithChildren<{}>) {
  const {
    context: { language, theme },
  } = use$$Root();

  return (
    <ThemeProvider action="/api/appearance" server={theme}>
      <LanguageProvider action="/api/appearance" server={{ language }}>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
