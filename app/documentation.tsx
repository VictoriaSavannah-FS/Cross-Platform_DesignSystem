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
        Design System Documentation will go here....
      </Typography>
      <Typography variant="body1" style={{ marginTop: 12 }}>
        Documentation - use guidelines ....
      </Typography>
    </View>
  );
}
