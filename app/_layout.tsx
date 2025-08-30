// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../theme/ThemeProvider"; // adjust path if no alias

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="documentation" options={{ title: "Docs" }} />
        <Stack.Screen name="playground" options={{ title: "Playground" }} />
      </Stack>
    </ThemeProvider>
  );
}
