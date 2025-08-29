// component library Overview - AKA: Homepage ---
import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "600", alignSelf: "center" }}>
        Bellatrix
      </Text>
      <Link href="/Docs" asChild>
        <Button title="Documentations" />
      </Link>
      <Link href="/playground" asChild>
        <Button title="Sandbox | Playground" />
      </Link>
      <Link href="/comX" asChild>
        <Button title="Components📍" />
      </Link>
      {/* <Link href="/profile" asChild>
        <Button title="Profile 😎 | ⚙️Settings" />
      </Link> */}
    </View>
  );
}

// Export all desing system components:
// export { ThemeProvider, useTheme } from './theme/ThemeProvider';
// export { useResponsive } from './hooks/useResponsive';
// export { Button } from './components/Button';
// export { Typography } from './components/Typography';
// export { Container, Grid, Stack } from './components/Layout';
// export { colors, spacing, typography, breakpoints } from './tokens';
// // Usage example in app
// import React from 'react';
// import { ThemeProvider, Container, Typography, Button, Stack } from './design-system';
// export const App: React.FC = () => {
//   return (
//     <ThemeProvider>
//       <Container>
//         <Stack spacing={24}>
//           <Typography variant="h1">Welcome to Our App</Typography>
//           <Typography variant="body1">
//             This interface adapts beautifully across mobile, tablet, and desktop.
//           </Typography>
//           <Button variant="primary" size="lg">
//             Get Started
//           </Button>
//         </Stack>
//       </Container>
//     </ThemeProvider>
//   );
// };
