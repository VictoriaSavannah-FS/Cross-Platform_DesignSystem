// app/index.tsx
import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../hooks/useTheme";
import { Typography } from "../components/design-system/Typography";
import { Button } from "../components/design-system/Button";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
        gap: theme.spacing.md,
      }}
    >
      <Typography variant="h3">Mode: {theme.mode}</Typography>

      <Button variant="outline" onPress={toggleTheme}>
        Toggle Theme
      </Button>

      {/* Simple “hero” area */}
      <View style={{ padding: 24, gap: 12 }}>
        <Typography
          variant="h1"
          style={{ fontSize: 22, fontWeight: "600", alignSelf: "center" }}
        >
          Bellatrix
        </Typography>

        {/* Use children (not "title") with your DS Button */}
        <Link href="/documentation" asChild>
          <Button fullWidth>Documentation</Button>
        </Link>

        <Link href="/playground" asChild>
          <Button fullWidth variant="secondary">
            Sandbox / Playground
          </Button>
        </Link>

        <Link href="/comX" asChild>
          <Button fullWidth variant="ghost">
            Components 📍
          </Button>
        </Link>
      </View>
    </View>
  );
}
