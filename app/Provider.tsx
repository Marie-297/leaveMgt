"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ProvidersProps extends ThemeProviderProps {
  session?: Session | null;
}

const Providers = ({ children, session, ...props }: ProvidersProps) => {
  return (
    <SessionProvider session={session ?? undefined}>
      <NextThemesProvider {...props}>
      <Toaster />
      {children}
      </NextThemesProvider>
    </SessionProvider>
  )
}

export default Providers