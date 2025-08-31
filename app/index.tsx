// app/index.tsx
import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../hooks/useTheme";
import { Typography } from "../components/design-system/Typography";
import { Button } from "../components/design-system/Button";
// import SafeAres for ios ---- keep conent on screen
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,

        gap: theme.spacing.md,
      }}
    >
      {/* <Typography variant="h3">Mode: {theme.mode}</Typography> */}
      {/* Works---- */}
      {/* <Button variant="outline" onPress={toggleTheme}>
        Toggle Theme
      </Button> */}

      {/* Simple “hero” area - BEALLTRIX Title --- */}
      <View>
        <Typography
          variant="h1"
          style={{
            fontWeight: "600",
            padding: theme.spacing.md,
            alignSelf: "center",
          }}
        >
          Bellatrix
        </Typography>

        {/* need to fix link issues ----  diff. variants ---*/}
        <Link href="/documentation" asChild>
          <Button
            fullWidth
            // a11y lables ---
            accessibilityLabel="Go to documentation"
            accessibilityRole="link"
          >
            Documentation
          </Button>
        </Link>

        <Link href="/playground" asChild>
          <Button
            fullWidth
            variant="secondary"
            // a11y lables ---
            accessibilityLabel="Go to playground"
            accessibilityRole="link"
          >
            Sandbox / Playground
          </Button>
        </Link>

        <Link href="/comX" asChild>
          <Button
            fullWidth
            variant="ghost"
            // a11y lables ---
            accessibilityLabel="Go to components page"
            accessibilityRole="link"
          >
            Components 📍
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}
