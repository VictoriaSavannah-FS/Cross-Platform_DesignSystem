/** NAvBAR ---
 * adpative / responsive layouts ---
 */

import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { useAdaptiveNav } from "../../hooks/useAdaptiveNav";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import new theme Toggle ---
import { ThemeToggle } from "../design-system/ThemeToggle";

// pasas props
export const NavigationBar: React.FC = () => {
  // pass tehme/hooks ---
  const { theme } = useTheme();
  const { showTopBar, showBottomTabs, tabHeight } = useAdaptiveNav();
  const insets = useSafeAreaInsets();

  // coantienr+styles ---
  const containerStyle: (ViewStyle | undefined)[] = [
    {
      // pass theme/designn tokens---
      backgroundColor: theme.colors.surface,

      //   pass adptNav hook else deault values ---
      borderTopWidth: showBottomTabs ? 1 : 0,
      borderBottomWidth: showTopBar ? 1 : 0,
      borderColor: theme.colors.border,

      //styles ---
      flexDirection: "row",
      // responsiev-> hook else deafult--
      justifyContent: showTopBar ? "flex-start" : "space-around",
      //upfstr w/spacing token -- consistency
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      minHeight: tabHeight,
      position: showBottomTabs ? "absolute" : "relative",
      bottom: showBottomTabs ? 0 : undefined,
      left: 0,
      right: 0,
    },
  ];
  return (
    <View style={containerStyle}>
      {/*nav stuff here---*/}
      <ThemeToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
});
