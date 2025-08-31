// app/playground.tsx
/**
 * Interactive Component Playground ----
 * Showcase/ Demo
 *  --> responsive/platform-adaptive layouts
 * Trigger/import Modal
 */

import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TextInput, // fallback IF X yert---
} from "react-native";
// Safe area keeps content off iOS notch/home indicator
import { SafeAreaView } from "react-native-safe-area-context";

// import design-system hooks/components ---
import { useTheme } from "../hooks/useTheme";
import { useResponsive } from "../hooks/useResponsive";
import { Typography } from "../components/design-system/Typography";
import { Button } from "../components/design-system/Button";
import { Card } from "../components/design-system/Card";
import { ThemeToggle } from "../components/design-system/ThemeToggle";
// Modal Compoent -----------
import { ModalComponent as Modal } from "../components/design-system/Modal";
// utils — button variant picker for buttons----
import { ButtonVariant } from "../utils/ButtonVariant";
import { useAdaptiveNav } from "../hooks/useAdaptiveNav";

export default function PlaygroundScreen() {
  //theme tokesn----
  const { theme } = useTheme();
  // responsive pltform----
  const { isDesktop, isTablet } = useResponsive();
  //   responsive Padding NAvBAr---
  const { showBottomTabs, tabHeight } = useAdaptiveNav();

  // -----States to store curnt settings -----
  const [btnVariant, setBtnVariant] = useState<
    // Opts
    "primary" | "secondary" | "outline" | "ghost"
  >("primary");

  // toggle-- Modal ----
  const [modalVisible, setModalVisible] = useState(false);

  //receive User input ----
  const [inputValue, setInputValue] = useState("");

  // layout Renders -- pass desing tokens
  const gap = theme.spacing.md;
  const rowStyle = isDesktop || isTablet ? styles.row : undefined;
  // figure out Xamount of BttmPad neded--
  const bttmPading = showBottomTabs
    ? // check tabHght and ADD tokenSpacing for padding
      tabHeight + theme.spacing.lg
    : //   esle -- defaltu token - lgPadding--
      theme.spacing.lg;

  // -------------- UI RENDER ----------------
  return (
    <SafeAreaView
      // theme - passColor token
      style={[styles.safe, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        //scrool @small screen---
        contentContainerStyle={{
          padding: theme.spacing.md,
          //  extra bttm padding---
          paddingBottom: bttmPading,
          gap,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* --- Header --- */}
        <Typography variant="h2" align="center" style={{ marginBottom: gap }}>
          Interactive Playground
        </Typography>
        <Typography variant="body1" color="secondary" align="center">
          Choose from the various props and Components below and see them live.
        </Typography>

        {/* Button DEmos ----  */}
        <Card style={{ padding: gap, gap }}>
          <Typography variant="h4">Button</Typography>

          {/* Variant picker-> prim / sec / outline / ghost ..boo!*/}
          <View style={{ gap: 8 }}>
            <Typography variant="caption" color="secondary">
              Variant | Types | Options
            </Typography>
            <ButtonVariant
              options={["primary", "secondary", "outline", "ghost"]}
              value={btnVariant}
              onChange={(v) =>
                setBtnVariant(
                  v as "primary" | "secondary" | "outline" | "ghost"
                )
              }
            />
          </View>

          {/* Live Preview -- Live Render ----- */}
          <View style={{ gap }}>
            <Button
              //   fullWidth={btnFullWidth}
              variant={btnVariant}
              accessibilityLabel="Playground button preview"
            >
              Press Me... go on.. I dare you...
            </Button>

            {/* --- row style/render --- */}
            <View style={[rowStyle, { gap }]}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </View>
          </View>
        </Card>

        {/* Input + CArd COmponent ----- */}
        <Card style={{ padding: gap, gap }}>
          <Typography variant="h4">Input + Card</Typography>
          <Typography variant="caption" color="secondary">
            Simple controlled input - Card Input
          </Typography>

          {/* Input --> allwos user to text-- /> */}
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Type something cool to try this text input out…"
            placeholderTextColor={theme.colors.text.secondary}
            style={{
              // then/colro tokens---
              borderColor: theme.colors.border,
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 12,
              color: theme.colors.text.primary,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: Platform.OS === "ios" ? 12 : 10,
              backgroundColor: theme.colors.surface,
            }}
          />

          <Typography variant="caption" color="secondary">
            Below is wrapped in a Card for surface contrast:
          </Typography>
          <Card style={{ padding: theme.spacing.md }}>
            <Typography variant="body1">
              You typed: “{inputValue || "…"}”
            </Typography>
          </Card>
        </Card>

        {/* ------ THE MODAL COMPONENT ----- */}
        <Card style={{ padding: gap, gap }}>
          <Typography variant="h4">Modal</Typography>

          <View style={[rowStyle, { gap }]}>
            <Button onPress={() => setModalVisible(true)}>Open Modal</Button>
          </View>
        </Card>

        {/* Theme utils--- */}
        <Card style={{ padding: gap, gap }}>
          <Typography variant="h4">Theme</Typography>
          <Typography variant="body1">
            Mode:{" "}
            <Typography variant="body1" weight="semibold">
              {theme.mode}
            </Typography>
          </Typography>
          <ThemeToggle />
        </Card>
      </ScrollView>
      {/*  Modal OUTSIDE Card so it overlays WHOLE screen --- */}
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={
          Platform.OS === "web" ? "Dialog (Web/Desktop)" : "Bottom Sheet (iOS)"
        }
        style={{ backgroundColor: theme.colors.primary[900] }}
        footer={
          <View style={[rowStyle, { gap }]}>
            <Button variant="ghost" onPress={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button onPress={() => setModalVisible(false)}>Confirm</Button>
          </View>
        }
      >
        <View
          style={{ backgroundColor: theme.colors.primary[600], padding: 16 }}
        >
          <Typography variant="h3">
            THIS IS THE MODAL. On the Web it's a Dialog Box that is centered on
            this SCREEN. On iOS it IS a SHEET that RISES.
          </Typography>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// --- basic layout styles
const styles = StyleSheet.create({
  safe: { flex: 1 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
