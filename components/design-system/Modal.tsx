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
  FlatList,
  Modal,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { spacing } from "../../design-tokens/spacing";
import { breakpoints } from "../../utils/breakpoints";
import { Button } from "./Button";
import { ThemeProvider } from "../../theme/ThemeProvider";
import { useResponsive } from "../../hooks/useResponsive";

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
  fullScreen: boolean; //full/X sceen size--
  //   optina---
  title?: string;
  footer?: React.ReactNode; //actionRow--> Confrim/Canxxel
  children: React.ReactNode; //target inside Modal content
  //Allow! extneral styles ---
  style?: ViewStyle;
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
      // shorthadn - mdmn docs
      // inset: 0,
      inset: 0 as any, //TS -->for RN native -- - ***

      backgroundColor: overlayColor,
      // Center + Modal onpage
      justifyContent: "center",
      alignItems: "center",
    },

    container: {
      // width -- RESPONSIVE/paltform
      // width: "92%",
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
      justifyContent: "flex-end",
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
    },
    // close X btuon arear -
    closeModal: {
      // palcehoder for the X bttn ot close screen---
      position: "absolute",
      //   theme-token / padding aroudn edges
      top: spacing.sm,
      right: spacing.sm,
    },
  });

  //----- IF Platfrom == iOS -- STYLES | UI RENDER -------

  /***
   * sldies from bttm
   * has a "Grabebr Area"
   *  -- needde fro mobile --
   * [https://reactnative.dev/docs/modal]
   * On web, the modal is presented as a separate route, and the dismiss behavior has to be provided manually using router.canGoBack(). ??
   * --> [https://docs.expo.dev/router/advanced/modals/]
   */

  // pass theme/design tokesn for consistency
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
      fontWeight: theme.typography.fontWeight.medium,
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
      flexDirection: "row",
      gap: spacing.sm,
      justifyContent: "flex-end",
    },
  });

  // ---- Web dialog UI RENDER  ----
  if (useDialog) {
    return (
      <View
        // Backdrop
        style={dialogStyles.overlay}
        // a11y: label ---
        accessibilityLabel="Modal overlay"
        accessible
      >
        {/* Dialog container */}
        <View
          style={(dialogStyles.container, style)}
          // a11y: announce this is a dialog
          //   accessibilityRole="Dialog" -- View? Text?
          accessibilityLabel={title ?? "Dialog"}
        >
          {/* Body */}
          <View style={dialogStyles.body}>{children}</View>

          {/* Footer --- CLOSE  */}
          <View style={dialogStyles.footer}>
            {footer ?? (
              <Button variant="outline" onPress={onClose}>
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
    <Modal
      visible={visible}
      animationType="slide" // native slide animation**
      transparent
    >
      {/* STOP backdrop press from closing when touching the sheet */}
      <View style={sheetStyles.overlay}>
        <Pressable
          onPress={() => {}}
          style={sheetStyles.sheet} //merging nboth styles/ defalut or extenal---
          //   accessibilityRole="dialog"
          accessibilityLabel={title ?? "Bottom sheet"}
        >
          {/* Grabbr ----- */}
          <View style={sheetStyles.grabberArea}>
            <View style={sheetStyles.grabber} />
          </View>
          {/* Content */}
          <View style={sheetStyles.body}>{children}</View>

          {/* Footer actions or default Close */}
          <View style={sheetStyles.footer}>
            {footer ?? <Button onPress={onClose}>Close</Button>}
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

/** React.FC
 * - a type that ships i/ React's typeScript types
 * represents the type of a fucntinal compooent --> the builing block of most modern React apps
 * [https://www.totaltypescript.com/you-can-stop-hating-react-fc]- TotalTypeScript - MAtt
 * -But - I still don't think it's the best way to annotate your types. That accolade goes to annotating props directly:
import React from "react";

const Component = (props: { name: string }) => {
  return <div>{props.name}</div>;
};

This approach is nicer because it's friendlier to beginners - you don't need to know what React.FC is, or even what type argument syntax is. It's also slightly easier to refactor to a generic component if needed.
 * 
* Overlay FX----
* [https://reactnative.dev/docs/dropshadowvalue]
* [https://reactnativeelements.com/docs/1.2.0/overlay]
* windowBackgroundColor
Background color for the overlay background

Type	Default
string	rgba(0, 0, 0, .5)

-Inset:[https://developer.mozilla.org/en-US/docs/Web/CSS/inset]
-overflow[https://developer.mozilla.org/en-US/docs/Web/CSS/overflow]
 
- iOS Docs for sheets styles -- so many! 
[https://developer.apple.com/documentation/UIKit/UIModalPresentationStyle/fullScreen]
*/
