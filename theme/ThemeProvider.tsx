import React, { createContext, useMemo, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

// design tokens -----------------
import { colors as allColors } from "../design-tokens/colors";
import { spacing } from "../design-tokens/spacing";
import { typography } from "../components/design-system/Typography";
import { breakpoints } from "../utils/breakpoints";

// -------- TYPES -------
// setMode----
type Mode = "light" | "dark";
// which colortheme to choose---
type Palette = (typeof allColors)["light" | "dark"];

// ------- UI --- Theme ----Prop
//  Theme interface = the "shape" of our theme object
export interface Theme {
  mode: Mode; //l/d
  colors: Palette; //thembasedcolorPalelte
  spacing: typeof spacing; //token--
  typography: typeof typography; //token
  breakpoints: typeof breakpoints; // utils
}

//holds theme + fx to change it
interface ThemeContextType {
  theme: Theme;
  //   flip l/d---
  toggleTheme: () => void;
  //   set Mode----
  setTheme: (mode: Mode) => void;
}

// --- Box -> hold data | theme obj. +toggle fx ---
// ⬇️ EXPORT the context so hooks/useTheme.ts can import it -- woow! that was it....
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
); //dflt/init value befoer wrappr----

// (moved the useTheme() hook into src/hooks/useTheme.ts)

// ---- COMPONET PROVIDER ---
// wrapper so all children can acess THEME ---- setup previusly^^^
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // system Preference --- Light/dark/null----
  const system = useColorScheme(); // 'light' | 'dark' | null
  //STORE->current theme mode in state() ---
  const [mode, setMode] = useState<Mode>("light");

  // @mount-> go w/ system deflt then SYNC w/ system prefernce--
  useEffect(() => {
    setMode((system ?? "light") as Mode);
  }, [system]);

  // pick palette based on MODE chooosen---
  const palette = mode === "dark" ? allColors.dark : allColors.light;

  // Save theme ->useMomo and only cahnegd when ThEME changes--
  const theme = useMemo<Theme>(
    () => ({
      //tokens/utils
      mode,
      colors: palette,
      spacing,
      typography,
      breakpoints,
    }),
    // only change/reload if mode/pallete changes--
    [mode, palette]
  );

  // ---- TOGGLE FUNCTIONS -----
  // -- Light->Dark (muah hahah..)
  const toggleTheme = () => setMode((m) => (m === "light" ? "dark" : "light"));
  //Forve Mde mannuall --- override setMode
  const setTheme = (m: Mode) => setMode(m);

  // ---- UI --> Pass theme+helprs to chilren values delcred @ begining
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
