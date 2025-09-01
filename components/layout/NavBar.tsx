/** NAvBAR ---
 * adpative / responsive layouts ---
 */

import React from "react";
import { View, StyleSheet, ViewStyle, Platform } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { useAdaptiveNav } from "../../hooks/useAdaptiveNav";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import new theme Toggle ---
import { ThemeToggle } from "../design-system/ThemeToggle";
// router / back buttn
import { useRouter, Link, usePathname } from "expo-router";
import { Button } from "../design-system/Button";
import { AccessibilityRole } from "react-native";
// routes for nav
const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "△" },
  // { href: "/playground", label: "Playground", icon: "❖" },
  // { href: "/components", label: "Components", icon: "⦿" },
  { href: "/documentation", label: "Docs", icon: "❖" },
];

// pasas props
export const NavigationBar: React.FC = () => {
  // pass tehme/hooks ---
  const { theme } = useTheme();
  const { showTopBar, showBottomTabs, tabHeight, minTouchSize } =
    useAdaptiveNav(); // upated!
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname(); // <- current route for active state

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
      justifyContent: showTopBar ? "space-between" : "space-around", // <- space-between for top bar

      //upfstr w/spacing token -- consistency
      // paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm + (showTopBar ? insets.top : 0),
      paddingBottom: theme.spacing.sm + (showBottomTabs ? insets.bottom : 0),
      // style layout/position----
      minHeight: tabHeight,

      // Pin location@ TOP for top bar, BOTTOM for tabs
      position: "absolute",
      // position: showBottomTabs ? "absolute" : "relative",
      bottom: showBottomTabs ? 0 : undefined,
      left: 0,
      right: 0,
      zIndex: 10, // keep above content
    },
  ];

  // --- render a single nav item (tab/top link) ---
  const renderItem = (item: { href: string; label: string; icon?: string }) => {
    const active = pathname === item.href;
    // use a subtle variant on top bar, a chunkier one on tabs
    const variant = active
      ? showBottomTabs
        ? "secondary"
        : "outline"
      : "ghost";

    // addTabLebl: hekpsk prvent wrappign
    const labelForTabs = item.icon ? item.icon : item.label;

    return (
      // give each item an equal flexible slot on tabs
      <View
        key={item.href}
        style={showBottomTabs ? { flex: 1, alignItems: "center" } : undefined}
      >
        <Link key={item.href} href={item.href} asChild>
          <Button
            variant={variant}
            // fullWidth={showBottomTabs} //
            // a11y: tabs on mobile, links on top bar
            accessibilityRole={showBottomTabs ? "tab" : "link"}
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
            // min touch target 44pts
            style={{
              minHeight: Math.max(minTouchSize, 44),
              paddingHorizontal: theme.spacing.sm,
              alignSelf: "center",
            }}
          >
            {/* KEEP tabs Text --- */}
            {showBottomTabs
              ? item.icon
                ? `${item.icon} ${item.label}`
                : item.label
              : item.icon
              ? `${item.icon} ${item.label}`
              : item.label}
          </Button>
        </Link>
      </View>
    );
  };

  return (
    <View
      style={containerStyle}
      // a11y container role: tablist for tabs
      // toolbar for top bar
      accessibilityLabel={
        showBottomTabs ? "Bottom navigation" : "Top navigation"
      }
      {...(Platform.OS === "web"
        ? // RN web supports the DOM role attribute; we cast to any to satisfy TS
          ({
            role: showBottomTabs ? ("tablist" as any) : ("toolbar" as any),
          } as any)
        : // Native a11y role
          {
            accessibilityRole: showBottomTabs
              ? ("tablist" as any)
              : ("toolbar" as any),
          })}
    >
      {/* bck bttn availabel on pages -- */}
      {showTopBar ? (
        <Button
          variant="ghost"
          // pass Bttn hndler---
          onPress={handleBack}
          // a11y label --
          accessibilityLabel="Go Back"
        >
          ⬅︎ Back
        </Button>
      ) : (
        // keep spacing on tabs layout
        <View style={{ width: theme.spacing.lg }} />
      )}

      {/*nav stuff here---*/}
      <View
        style={{
          // middle cluster of nav items
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: showTopBar ? "flex-start" : "space-between",
          gap: theme.spacing.sm,
        }}
      >
        {NAV_ITEMS.map(renderItem)}
      </View>

      {/* theme toggle on the right -- hide on Tabs */}
      {/* <ThemeToggle /> */}
      {showTopBar ? <ThemeToggle /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
});
