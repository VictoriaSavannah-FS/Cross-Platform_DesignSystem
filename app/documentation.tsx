// app/documentation.tsx
import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../hooks/useTheme";
import { Typography } from "../components/design-system/Typography";

// img imports---
import comingSoon from "../assets/comingSoon.jpg";
import docs1 from "../assets/docs-1.jpg";
import loading from "../assets/loading.jpg";

export default function DocumentationScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      // apply background from theme
      style={[styles.safe, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={{
          // pass themetokens --
          paddingHorizontal: theme.spacing.md,
          // paddd- header
          paddingTop: theme.spacing.xl + theme.spacing.lg,
          paddingBottom: theme.spacing.lg,
          alignItems: "center",
          gap: theme.spacing.lg,
        }}
      >
        <View style={styles.center}>
          <Typography variant="h2" align="center" style={{ marginBottom: 3 }}>
            ❖ Documentation
          </Typography>

          <Image
            source={comingSoon}
            style={{
              width: "90%", // flexible on small screens
              maxWidth: 400, // cap width on large screens (web/desktop)
              height: 400, // let aspect ratio control height
              aspectRatio: 1.6, // keeps proportions consistent
              marginBottom: 16,
            }}
            resizeMode="contain"
          />
          {/* <Image
          source={docs1}
          style={{ width: 220, height: 220, marginBottom: 16 }}
          resizeMode="contain"
        />

        <Image
          source={loading}
          style={{ width: 220, height: 220, marginBottom: 16 }}
          resizeMode="contain"
        /> */}

          <Typography variant="body1" align="center" color="secondary">
            Coming soon… This section is under construction. See
            DOCUMENTATION.md in the repo for details.
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
