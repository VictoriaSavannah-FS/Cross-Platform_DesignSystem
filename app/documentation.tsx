/** Design system Documentation
 * Renders design system docs
 * guidelines
 * descrriptions/ how to use
 */

import { View, Platform } from "react-native";
import { Typography } from "../components/design-system/Typography";
// import SafeAres for ios ---- keep conent on screen
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeProvider } from "../theme/ThemeProvider";

export default function DocumentationScreen() {
  return (
    <SafeAreaView>
      <ThemeProvider>
        <View style={{ flex: 1, padding: 16 }}>
          <Typography variant="h2" align="center">
            Design System Documentation will go here....
          </Typography>
          <Typography variant="body1" style={{ marginTop: 12 }}>
            Documentation - use guidelines ....
          </Typography>
        </View>
      </ThemeProvider>
    </SafeAreaView>
  );
}
