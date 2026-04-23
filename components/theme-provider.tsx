"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes";
export default function ThemeProvider( {children,...props} : ThemeProviderProps) {
    <NextThemesProvider {...props}>
        {children}
    </NextThemesProvider>

}