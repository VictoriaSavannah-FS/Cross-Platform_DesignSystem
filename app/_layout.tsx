// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../theme/ThemeProvider";
import { NavigationBar } from "../components/layout/NavBar";
// import DafeAreaProvider for ios ---
import { SafeAreaProvider } from "react-native-safe-area-context";
// troublehsoot - link issue -- ANv Adpat to platform---

export default function Layout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="documentation" options={{ title: "Docs" }} />
          <Stack.Screen name="playground" options={{ title: "Playground" }} />
        </Stack>
        <NavigationBar />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
