// app/index.tsx
import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../hooks/useTheme";
import { Typography } from "../components/design-system/Typography";
import { Button } from "../components/design-system/Button";
// import SafeAres for ios ---- keep conent on screen
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "../theme/ThemeProvider";
// responce NavBAr ---
import { useAdaptiveNav } from "../hooks/useAdaptiveNav";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  // --- b/c of fixed nav cutsoff HEading - so setup logic for resposive HEader based on Header
  const { showTopBar, showBottomTabs, tabHeight } = useAdaptiveNav();
  // check topNAv (web) or TabHEight (ios) nad add/pass desing toke space-> else defalut to 0 padding
  const paddingTop = showTopBar ? tabHeight + theme.spacing.sm : 0;
  // Check bbtPadding (web) => straight to Tabs (ios) - tabHeight and add/pass desing toke space-> else defalut to lg spcaign token desing
  const paddingBottom = showBottomTabs
    ? tabHeight + theme.spacing.lg
    : theme.spacing.lg;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
        gap: theme.spacing.md,
        // new checsk---
        paddingTop,
        paddingBottom,
      }}
    >
      {/* <ThemeProvider> */}
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
            padding: theme.spacing.lg,
            alignSelf: "center",
          }}
        >
          Bellatrix
        </Typography>

        <Link href="/playground" asChild>
          <Button
            fullWidth
            variant="primary"
            // a11y lables ---
            accessibilityLabel="Go to playground"
            accessibilityRole="link"
          >
            Sandbox / Playground
          </Button>
        </Link>
        {/* need to fix link issues ----  diff. variants ---*/}
        <Link href="/documentation" asChild>
          <Button
            variant="secondary"
            fullWidth
            // a11y lables ---
            accessibilityLabel="Go to documentation"
            accessibilityRole="link"
          >
            Documentation
          </Button>
        </Link>

        {/* <Link href="/comX" asChild>
          <Button
            fullWidth
            variant="ghost"
            // a11y lables ---
            accessibilityLabel="Go to components page"
            accessibilityRole="link"
          >
            Components 📍
          </Button>
        </Link> */}
      </View>
      {/* </ThemeProvider> */}
    </SafeAreaView>
  );
}
