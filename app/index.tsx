// // component library Overview - AKA: Homepage ---
// import { View, Text, Button } from "react-native";
// import { Link } from "expo-router";

// export default function Home() {
//   return (
//     <View style={{ padding: 24, gap: 12 }}>
//       <Text style={{ fontSize: 22, fontWeight: "600", alignSelf: "center" }}>
//         Bellatrix
//       </Text>
//       <Link href="/Docs" asChild>
//         <Button title="Documentations" />
//       </Link>
//       <Link href="/playground" asChild>
//         <Button title="Sandbox | Playground" />
//       </Link>
//       <Link href="/comX" asChild>
//         <Button title="Components📍" />
//       </Link>
//       {/* <Link href="/profile" asChild>
//         <Button title="Profile 😎 | ⚙️Settings" />
//       </Link> */}
//     </View>
//   );
// }

// // src/app/index.tsx
// import React from "react";
// import { View } from "react-native";
// import { useTheme } from "../hooks/useTheme";
// import { Button } from "../components/design-system/Button";
// import { Typography } from "../design-tokens/typography";

// export default function Home() {
//   const { theme, toggleTheme } = useTheme();
//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: theme.colors.background,
//         padding: theme.spacing.md,
//       }}
//     >
//       <Typography variant="h3">Mode: {theme.mode}</Typography>
//       <Button
//         onPress={toggleTheme}
//         variant="outline"
//         style={{ marginTop: theme.spacing.md }}
//       >
//         Toggle Theme
//       </Button>
//     </View>
//   );
// }

// src/app/index.tsx
import React from "react";
import { View } from "react-native";
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
      }}
    >
      <Typography variant="h3">Mode: {theme.mode}</Typography>
      <Button
        variant="outline"
        onPress={toggleTheme}
        style={{ marginTop: theme.spacing.md }}
      >
        Toggle Theme
      </Button>
    </View>
  );
}
