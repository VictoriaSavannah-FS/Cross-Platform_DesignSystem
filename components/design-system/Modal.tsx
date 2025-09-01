/** MODAL ---
 * 	A modal is a UI element that appears on top of your current screen.
 * It temporarily interrupts the main content so the user can focus on one specific action (like filling a form, confirming something, or reading important info).
 * You usually can’t interact with the rest of the screen until the modal is closed.
 *  popup dialog (web) or a bottom sheet / full-screen overlay (mobile).
 *
 * MEED TO INCLUD A11Y LABELS AND FX--
 * [https://docs.expo.dev/tutorial/create-a-modal/]
 * [https://youtu.be/HRAMzrBwVeo?si=GwWPgdrxF_xNLhoa]
 *
 */

import React from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  StyleSheet,
  Modal as RNModal, // alias to avoid confusion
  ViewStyle,
  AccessibilityInfo,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { spacing } from "../../design-tokens/spacing";
import { breakpoints } from "../../utils/breakpoints";
import { Button } from "./Button";
import { ThemeProvider } from "../../theme/ThemeProvider";
import { useResponsive } from "../../hooks/useResponsive";
// a11y label role ---
import { AccessibilityRole } from "react-native";

/** PSUDEO CODE--
 * IF (modal is visible) THEN
   Show a semi-transparent background (dark overlay)
   Show a box (the modal window) centered on screen
      OPTIONAL: show title
      Show main content (children)
      Show a close button (X or “Cancel”)
ELSE
   Render nothing (return null)
 */

/** props passed -------
 * visible: seen/X
 * onClsoe - @close' fucntio / lse voide / never opnedn
 * -- Actaul Modal input/Form
 * title-Mdoal: tesxt
 * children: React.ReatNode -> body/Modal ipnut
 * fullScreen:boolean -> if mobile/Web
 */
type ModalComponentProps = {
  visible: boolean;

  //trigger --> will Close modal-----
  onClose: () => void;
  fullScreen?: boolean; //full/X sceen size-- (optional default)
  //   optina---
  title?: string;
  footer?: React.ReactNode; //actionRow--> Confrim/Canxxel
  children: React.ReactNode; //target inside Modal content
  //Allow! extneral styles ---
  style?: ViewStyle;

  // a11y overrides (optional) ----
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole; // maps to ARIA on web; native uses accessibilityViewIsModal
};

// deifni fx+pass Props ^^^
export const ModalComponent: React.FC<ModalComponentProps> = ({
  // props---
  visible,
  onClose,
  fullScreen = false, //deflt to ios smscreen
  title,
  footer,
  children,
  style, // had to add --

  // a11y label -----
  accessibilityLabel,
  accessibilityRole = "dialog",
}) => {
  // impot temes+responsive ----- check paltform/size
  const { theme } = useTheme(); //folwo theme
  const { isDesktop } = useResponsive();

  // handle Logic based on Platform -----
  const useDialog = Platform.OS === "web" || isDesktop;

  // if not visobl - don't do anything --
  if (!visible) return null;

  /**--Pass Theme tokens for Elevetaed theme Dialogs/FullSCreen  */
  const overlayColor = "rgba(0,0,0,0.5)"; //from RNelemnts.
  // passcolo Tokes
  const borderColor = theme.colors.border;
  const surface = theme.colors.surface;
  // migth chaneg ---double chck ----
  const textPrim = theme.colors.text.primary;
  const textSec = theme.colors.text.secondary;

  // --- IF paltform --> Web | STYLES | UI RENDER  ---
  const dialogStyles = StyleSheet.create({
    /** Dialog Props----
     * pass theme/color tokens ---
     * overlay: shadpw/dim backgorudn
     * conaiter/ CArd compomet?
     * title--
     * header
     * body - content
     * footer
     * buttons / actions
     */

    // Overlay
    overlay: {
      position: "absolute", //covers all scren--
      inset: 0 as any, //TS -->for RN native -- - ***
      backgroundColor: overlayColor,
      // Center + Modal onpage
      justifyContent: "center",
      alignItems: "center",
    },

    container: {
      // width -- RESPONSIVE/paltform
      width: "95%",
      maxWidth: 560,

      // pass dsgn token---
      backgroundColor: surface,
      borderRadius: spacing.md,
      borderColor,
      //  cutoff / no spill over--å
      overflow: "hidden",
    },

    header: {
      // pass theme tokens--
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderBottomColor: borderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    body: {
      // content ---- pass toekn
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    },
    footer: {
      // padding- theme/tokens
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderTopColor: borderColor,
      //cotent layotu----------------
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.sm,
      // thin top broder -visuall seperation --
      borderTopWidth: StyleSheet.hairlineWidth,
    },
    // Heading Text ---------
    title: {
      // pass theme/tokesn --
      color: textPrim,
      fontFamily: theme.typography.fontFamily.sans,
      fontSize: theme.typography.fontSize.lg,
      // TS type checl----
      fontWeight: theme.typography.fontWeight.medium as any,
      // layout-- fixed issue---
      paddingBottom: spacing.sm,
      textAlign: "center",
      width: "100%",
    },
    // close X btuon arear -
    closeModal: {
      position: "absolute",
      top: spacing.sm,
      right: spacing.sm,
    },
  });

  //----- IF Platfrom == iOS -- STYLES | UI RENDER -------
  const sheetStyles = StyleSheet.create({
    overlay: {
      // -- overleya style---
      flex: 1,
      backgroundColor: overlayColor,
      justifyContent: "flex-end",
    },
    //SHeet panel ----
    sheet: {
      // pass theem tokens layout
      backgroundColor: surface,
      borderTopLeftRadius: spacing.lg,
      borderTopRightRadius: spacing.lg,
      borderColor,
      paddingBottom: spacing.lg,
    },

    // GRabberArea -- neded for Mobile -> maesk "draggabel"
    grabberArea: {
      alignItems: "center",
      paddingTop: spacing.sm,
      paddingBottom: spacing.xs,
    },
    // Acatul Bar @top of shet to press
    grabber: {
      // asjst -- EDit if need be---
      width: 30,
      height: 4,
      borderRadius: 2,
      backgroundColor: borderColor,
      opacity: 0.8,
    },

    title: {
      color: textPrim,
      fontFamily: theme.typography.fontFamily.sans,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.medium as any,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.sm,
      textAlign: "center",
      width: "100%",
    },
    // conent dispaly ARea----
    body: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    },
    // space/area for Bttusn@ bttm ---
    footer: {
      // theme/token--
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
      // layout--
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.sm,
    },
  });

  // ---- Web dialog UI RENDER  ----
  if (useDialog) {
    return (
      <View
        // Backdrop
        style={dialogStyles.overlay}
        // a11y: label ---
        accessibilityViewIsModal
        // accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel ?? title ?? "Dialog"}
      >
        {/* Dialog container */}
        <View
          style={[dialogStyles.container, style]} // <-- FIXED: keep base + external style
          // a11y: announce this is a dialog
          // accessibilityRole={accessibilityRole}
          accessibilityLabel={accessibilityLabel ?? title ?? "Dialog"}
          importantForAccessibility="yes"
        >
          {/* Optional title */}
          {title ? (
            <View style={dialogStyles.header}>
              <Text accessibilityRole="header" style={dialogStyles.title}>
                {title}
              </Text>
            </View>
          ) : null}

          {/* Body */}
          <View style={dialogStyles.body}>{children}</View>

          {/* Footer --- CLOSE  */}
          <View style={dialogStyles.footer} accessibilityRole="toolbar">
            {footer ?? (
              <Button
                variant="outline"
                onPress={onClose}
                accessibilityHint="Close dialog"
              >
                Close
              </Button>
            )}
          </View>
        </View>
      </View>
    );
  }

  // ---- Mobile bottom-sheet render ----
  /**RN-Modal[https://docs.expo.dev/router/advanced/modals/]
   * On iOS, the modal slides from the bottom of the current screen.
   * To dismiss it, swipe it down from the top.
   */
  return (
    <RNModal
      visible={visible}
      animationType="slide" // native slide animation**
      transparent
      onRequestClose={onClose} // Android back button
      // a11y: treat as modal region for SRs
      accessibilityViewIsModal
      presentationStyle={fullScreen ? "fullScreen" : "overFullScreen"}
    >
      {/* STOP backdrop press from closing when touching the sheet */}
      <View style={sheetStyles.overlay} accessibilityViewIsModal>
        <Pressable
          onPress={() => {}}
          style={[sheetStyles.sheet, style]} //merging nboth styles/ defalut or extenal---
          // accessibilityRole={accessibilityRole}
          accessibilityLabel={accessibilityLabel ?? title ?? "Bottom sheet"}
          importantForAccessibility="yes"
        >
          {/* Grabbr ----- */}
          <View
            style={sheetStyles.grabberArea}
            accessibilityElementsHidden
            importantForAccessibility="no"
          >
            <View style={sheetStyles.grabber} />
          </View>

          {/* Optional title */}
          {title ? (
            <Text accessibilityRole="header" style={sheetStyles.title}>
              {title}
            </Text>
          ) : null}

          {/* Content */}
          <View style={sheetStyles.body}>{children}</View>

          {/* Footer actions or default Close */}
          <View style={sheetStyles.footer} accessibilityRole="toolbar">
            {footer ?? (
              <Button onPress={onClose} accessibilityHint="Close modal">
                Close
              </Button>
            )}
          </View>
        </Pressable>
      </View>
    </RNModal>
  );
};
