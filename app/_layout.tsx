// // Root layout witth theme provider

// import { Stack } from "expo-router";
// // import them---
// export default function Layout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ title: "Home" }} />
//       <Stack.Screen name="documentation" options={{ title: "Docs" }} />
//       <Stack.Screen name="playground" options={{ title: "Playground" }} />
//       {/* <Stack.Screen name="qr" options={{ title: "QR" }} /> */}
//       {/* <Stack.Screen name="profile" options={{ title: "Profile" }} /> */}
//     </Stack>
//   );
// }

// src/app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../hooks/useTheme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
