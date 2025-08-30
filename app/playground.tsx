/** Interactive Component Playground
 * Sandbox-style page to test and tweak components live
 */
import { View } from "react-native";
import { Typography } from "../components/design-system/Typography";

export default function PlaygroundScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Typography variant="h2" align="center">
        Interactive Playground
      </Typography>
      {/* Later: import/ DEmo 
      - Button
      - Card
      - Input*/}
    </View>
  );
}
