// src/theme/ThemeProvider.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors as allColors } from "@/design-tokens/colors";
import { spacing } from "../design-tokens/spacing";
import { typography } from "../design-tokens/typography";
import { breakpoints } from "../utils/breakpoints";

type Mode = "light" | "dark";

// This is ONE palette (either light or dark), not both
type Palette = (typeof allColors)["light"];

export interface Theme {
  mode: Mode;
  colors: Palette;
  spacing: typeof spacing;
  typography: typeof typography;
  breakpoints: typeof breakpoints;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => Promise<void>;
  setTheme: (mode: Mode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

const STORAGE_KEY = "app_theme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const system = useColorScheme(); // 'light' | 'dark' | null
  const [mode, setMode] = useState<Mode>("light");

  // Load saved preference or fall back to system
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "light" || saved === "dark") {
          setMode(saved);
        } else {
          setMode((system ?? "light") as Mode);
        }
      } catch (e) {
        console.warn("Failed to load theme preference:", e);
        setMode((system ?? "light") as Mode);
      }
    })();
  }, [system]);

  // Pick the correct palette for current mode
  const palette = mode === "dark" ? allColors.dark : allColors.light;

  // Memoize the theme object so child re-renders are cheap
  const theme = useMemo<Theme>(
    () => ({
      mode,
      colors: palette,
      spacing,
      typography,
      breakpoints,
    }),
    [mode, palette]
  );

  const setTheme = async (next: Mode) => {
    setMode(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      console.warn("Failed to save theme preference:", e);
    }
  };

  const toggleTheme = async () => {
    await setTheme(mode === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
//   // import React, { createContext, useContext, useState, useEffect } from "react";
// // import { useColorScheme } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // interface Theme {
// //   colors: typeof colors;
// //   spacing: typeof spacing;
// //   typography: typeof typography;
// //   breakpoints: typeof breakpoints;
// //   mode: "light" | "dark";
// // }
// // interface ThemeContextType {
// //   theme: Theme;
// //   toggleTheme: () => void;
// //   setTheme: (mode: "light" | "dark") => void;
// // }
// // const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
// // export const useTheme = (): ThemeContextType => {
// //   const context = useContext(ThemeContext);
// //   if (!context) {
// //     throw new Error("useTheme must be used within a ThemeProvider");
// //   }
// //   return context;
// // };
// // export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
// //   children,
// // }) => {
// //   const systemColorScheme = useColorScheme();
// //   const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
// //   // Load saved theme preference
// //   useEffect(() => {
// //     const loadTheme = async () => {
// //       try {
// //         const savedTheme = await AsyncStorage.getItem("app_theme");
// //         if (savedTheme) {
// //           setThemeMode(savedTheme as "light" | "dark");
// //         } else {
// //           // Use system preference as default
// //           setThemeMode(systemColorScheme || "light");
// //         }
// //       } catch (error) {
// //         console.error("Failed to load theme preference:", error);
// //       }
// //     };
// //     loadTheme();
// //   }, [systemColorScheme]);
// //   // Create theme object with mode-specific overrides
// //   const theme: Theme = {
// //     colors: {
// //       ...colors,
// //       // Override colors based on theme mode
// //       background:
// //         themeMode === "dark" ? colors.neutral[900] : colors.neutral[50],
// //       surface: themeMode === "dark" ? colors.neutral[800] : colors.neutral[100],
// //       text: {
// //         primary:
// //           themeMode === "dark" ? colors.neutral[50] : colors.neutral[900],
// //         secondary:
// //           themeMode === "dark" ? colors.neutral[300] : colors.neutral[600],
// //         disabled:
// //           themeMode === "dark" ? colors.neutral[600] : colors.neutral[400],
// //       },
// //     },
// //     spacing,
// //     typography,
// //     breakpoints,
// //     mode: themeMode,
// //   };
// //   const toggleTheme = async () => {
// //     const newMode = themeMode === "light" ? "dark" : "light";
// //     setThemeMode(newMode);
// //     try {
// //       await AsyncStorage.setItem("app_theme", newMode);
// //     } catch (error) {
// //       console.error("Failed to save theme preference:", error);
// //     }
// //   };
// //   const setTheme = async (mode: "light" | "dark") => {
// //     setThemeMode(mode);
// //     try {
// //       await AsyncStorage.setItem("app_theme", mode);
// //     } catch (error) {
// //       console.error("Failed to save theme preference:", error);
// //     }
// //   };
// //   return (
// //     <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // };

// // src/theme/ThemeProvider.tsx
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { useColorScheme } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { colors as allColors } from "@/design-tokens/colors";
// import { spacing } from "../design-tokens/spacing";
// import { typography } from "../design-tokens/typography";
// import { breakpoints } from "../utils/breakpoints";

// type Mode = "light" | "dark";

// // This is ONE palette (either light or dark), not both
// type Palette = (typeof allColors)["light"];

// export interface Theme {
//   mode: Mode;
//   colors: Palette;
//   spacing: typeof spacing;
//   typography: typeof typography;
//   breakpoints: typeof breakpoints;
// }

// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => Promise<void>;
//   setTheme: (mode: Mode) => Promise<void>;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export function useTheme(): ThemeContextType {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
//   return ctx;
// }

// const STORAGE_KEY = "app_theme";

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const system = useColorScheme(); // 'light' | 'dark' | null
//   const [mode, setMode] = useState<Mode>("light");

//   // Load saved preference or fall back to system
//   useEffect(() => {
//     (async () => {
//       try {
//         const saved = await AsyncStorage.getItem(STORAGE_KEY);
//         if (saved === "light" || saved === "dark") {
//           setMode(saved);
//         } else {
//           setMode((system ?? "light") as Mode);
//         }
//       } catch (e) {
//         console.warn("Failed to load theme preference:", e);
//         setMode((system ?? "light") as Mode);
//       }
//     })();
//   }, [system]);

//   // Pick the correct palette for current mode
//   const palette = mode === "dark" ? allColors.dark : allColors.light;

//   // Memoize the theme object so child re-renders are cheap
//   const theme = useMemo<Theme>(
//     () => ({
//       mode,
//       colors: palette,
//       spacing,
//       typography,
//       breakpoints,
//     }),
//     [mode, palette]
//   );

//   const setTheme = async (next: Mode) => {
//     setMode(next);
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, next);
//     } catch (e) {
//       console.warn("Failed to save theme preference:", e);
//     }
//   };

//   const toggleTheme = async () => {
//     await setTheme(mode === "light" ? "dark" : "light");
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
