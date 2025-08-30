/** NAvBAR ---
 * adpative / responsive layouts ---
 */

import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { useAdaptiveNav } from "../../hooks/useAdaptiveNav";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // nice-to-have

// NavBar Props -----
interface NavBarProps {
  // so pages can pass in own links/buttons-> react.reactNode
  children?: React.ReactNode;
  style?: ViewStyle; //override IF need eb...
}

// pasas props
export const NavigationBar: React.FC<NavBarProps> = ({ children, style }) => {
  // pass tehme/hooks ---
  const { theme } = useTheme();
  const { showTopBar, showBottomTabs, tabHeight } = useAdaptiveNav();
  const insets = useSafeAreaInsets();

  // coantienr+styles ---
  const containerStyle: (ViewStyle | undefined)[] = [
    styles.container,
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
      //spacing token --
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      ///adptNAv hook
      minHeight: tabHeight,
      // add safe-area padding if bottom tabs (so it doesn’t sit on the home bar)
      paddingBottom: showBottomTabs
        ? Math.max(insets.bottom, theme.spacing.xs)
        : undefined,

      //hoo else -> dflt w/ values
      position: showBottomTabs ? "absolute" : "relative",
      bottom: showBottomTabs ? 0 : undefined,
      left: 0,
      right: 0,
    },
    style, // allow override
  ];

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
});
