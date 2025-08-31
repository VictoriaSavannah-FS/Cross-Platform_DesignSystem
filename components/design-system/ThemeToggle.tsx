/**
 * ThemeToggle
 * reusable control -> flips light/dark mode
 * pass Button toekn
 */
import React from "react";
import { ViewStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "./Button";

export const ThemeToggle = () => {
  //pasTheme->toggle fx --
  const { theme, toggleTheme } = useTheme();
  //   check curernt Mode ---
  const isDark = theme.mode === "dark";
  // labels+emoji => based on CurentTheme Mode---
  const label = isDark ? "Light mode" : "Dark mode";
  const icon = isDark ? "☀️" : "🌙";

  return (
    <Button
      variant="ghost"
      onPress={toggleTheme}
      accessibilityLabel={`Switch to ${label}`}
    >{`${icon} ${label}`}</Button>
  );
};
