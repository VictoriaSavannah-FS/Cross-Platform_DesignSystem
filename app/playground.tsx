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
  //  showTopBar--? add some padding for header when navbar is @top
  const { showBottomTabs, showTopBar, tabHeight } = useAdaptiveNav();
  // -----States to store curnt settings -----
  const [btnVariant, setBtnVariant] = useState<
    // Opts
    "primary" | "secondary" | "outline" | "ghost"
  >("primary");

  // toggle-- Modal ----
  const [modalVisible, setModalVisible] = useState(false);
  // something fun...???... why not!
  const [gotchaVisible, setGotchaVisible] = useState(false); //wait for it...

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

  // TOp Padding--> nav@ TOP (web/desktop) --
  const topPadding = showTopBar ? tabHeight + theme.spacing.sm : 0;

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
          //  extra top/bttm padding---
          paddingTop: topPadding, // SOLVES -> header from being hidden
          paddingBottom: bttmPading, //Sme bttmPadding@Tabs
          //  extra bttm padding---

          gap,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* --- Header --- */}
        <Typography
          variant="h2"
          align="center"
          style={{ marginBottom: gap, padding: 6 }}
        >
          Interactive Playground
        </Typography>
        <Typography variant="body1" color="secondary" align="center">
          Choose from the various props and Components below and see them live.
        </Typography>

        {/* Button DEmos ----  */}
        <Card style={{ padding: gap, gap }}>
          <Typography variant="h4" style={styles.sectionHeader}>
            Button
          </Typography>

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
              variant={btnVariant}
              accessibilityLabel="Playground button preview"
              //trigger -boom!
              onPress={() => setGotchaVisible(true)}
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
          <Typography variant="h4" style={styles.sectionHeader}>
            Input + Card
          </Typography>
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
          <Typography variant="h4" style={styles.sectionHeader}>
            Modal
          </Typography>

          {/* <View style={[rowStyle, { gap }]}>
            <Button onPress={() => setModalVisible(true)}>Open Modal</Button>
          </View>
           */}
          <View style={{ width: "100%" }}>
            <Button
              variant="primary"
              fullWidth={Platform.OS === "web"} // full width only on web
              onPress={() => setModalVisible(true)}
              accessibilityLabel="Open modal"
              // helps in tight flex rows on web; safe to keep
              style={{ alignSelf: "stretch" }}
            >
              Open Modal
            </Button>
          </View>
        </Card>

        {/* Theme utils--- */}
        <Card style={{ padding: gap, gap }}>
          <Typography variant="h4" style={styles.sectionHeader}>
            Theme
          </Typography>
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
      {/* Gotcha -- Modal ... 🙃 */}
      <Modal
        visible={gotchaVisible}
        onClose={() => setGotchaVisible(false)}
        title="Booooo! 👻 — Gotcha! 😎"
        footer={
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 12 }}
          >
            <Button variant="ghost" onPress={() => setGotchaVisible(false)}>
              Close
            </Button>
            <Button onPress={() => setGotchaVisible(false)}>
              😂 You're doneee…
            </Button>
          </View>
        }
      >
        <Typography variant="body1" align="center" color="secondary">
          You're a brave one… I see you. Great job! Go forth and conquer more
          unknowns…
        </Typography>
      </Modal>
      {/* Actual modal example with theme+tokens  */}
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
          <Typography variant="body1">
            This is a Modal Example. On the Web it's a Dialog Box that is
            centered on the Screen. On iOS it is a sheet that rises.
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
  // center headr txt onpage
  sectionHeader: {
    textAlign: "center",
    marginBottom: 7,
  },
});
