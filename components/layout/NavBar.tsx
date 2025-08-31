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
// router / back buttn
import { useRouter } from "expo-router";
import { Button } from "../design-system/Button";

// pasas props
export const NavigationBar: React.FC = () => {
  // pass tehme/hooks ---
  const { theme } = useTheme();
  const { showTopBar, showBottomTabs, tabHeight } = useAdaptiveNav();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Basic-->  back  Bttn handler ---
  const handleBack = () => {
    // failSafe - fall back prev. page ELSE --> gto home route---
    if (router.canGoBack?.()) router.back();
    else router.replace("/");
  };

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
      alignItems: "center",
      // responsiev-> hook else deafult--
      justifyContent: showTopBar ? "flex-start" : "space-around",

      //upfstr w/spacing token -- consistency
      // paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm + (showTopBar ? insets.top : 0),
      paddingBottom: theme.spacing.sm + (showBottomTabs ? insets.bottom : 0),
      // style layout/position----
      minHeight: tabHeight,
      position: showBottomTabs ? "absolute" : "relative",
      bottom: showBottomTabs ? 0 : undefined,
      left: 0,
      right: 0,
    },
  ];
  return (
    <View style={containerStyle}>
      {/* bck bttn availabel on pages -- */}
      <Button
        variant="ghost"
        // pass Bttn hndler---
        onPress={handleBack}
        // a11y label --
        accessibilityLabel="Go Back"
      >
        ⬅︎ Back
      </Button>
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
