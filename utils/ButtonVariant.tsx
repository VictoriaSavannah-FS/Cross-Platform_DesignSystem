/** Btton VAriants - Helper/Handelr
 *  Helps choosing type of Button display/demo on Palyfgroudn page---
 * ---params/props --
 * - helps select be/w prim/sec/ghost/outline def. import Buttons componet
 */

import React from "react";
import { View } from "react-native";
import { Button } from "../components/design-system/Button";

// types of props ---

type ButtonVariantProps = {
  // []of options ---
  options: string[];
  //   curent opt --
  value: string;
  //   callPAck/triggered when new one choosen--
  onChange: (next: string) => void;
};

// Render -------
export function ButtonVariant({
  options,
  value,
  onChange,
}: ButtonVariantProps) {
  // UI RENDER -----
  return (
    <View
      style={{
        // space b/w
        gap: 8,
        // directiom--
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {/* map trhough []opts --> logif IFx else defaul tot "ghots" type */}
      {options.map((opt) => (
        <Button
          // highlight selected one
          key={opt}
          variant={value === opt ? "primary" : "ghost"}
          // update selct---- new opt!
          onPress={() => onChange(opt)}
          //a11y label---
          accessibilityLabel={`Select ${opt}`}
          //   adjsutgi spacign b/w elmets on page--
          style={{ marginRight: 12, marginBottom: 12 }}
        >
          {opt}
        </Button>
      ))}
    </View>
  );
}
