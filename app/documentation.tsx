/** Design system Documentation
 * Renders design system docs
 * guidelines
 * descrriptions/ how to use
 */

import { View } from "react-native";
import { Typography } from "../components/design-system/Typography";

export default function DocumentationScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Typography variant="h2" align="center">
        Design System Documentation
      </Typography>
      <Typography variant="body1" style={{ marginTop: 12 }}>
        Welcome to the Bellatrix Design System. Here you’ll find usage
        guidelines, component descriptions, and examples of how to use our
        reusable UI building blocks.
      </Typography>
      {/* Later: add sections for colors, spacing, typography, button variants, etc. */}
    </View>
  );
}
