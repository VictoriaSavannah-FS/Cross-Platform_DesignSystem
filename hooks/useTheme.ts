// src/hooks/useTheme.ts
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeProvider";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx; // { theme, toggleTheme, setTheme }
}
