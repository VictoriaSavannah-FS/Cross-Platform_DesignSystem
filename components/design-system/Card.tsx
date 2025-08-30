/**CARD COMPONET
 *
 * reusable container - wwrapp text/img / otehr compoent
 * consistent styling based on pasedd Theme
 * 3  VAriants /styles
 * responsive elementes -platform
 * header/footer sections -- need to come abck -> maybe break down to paltform specficif/adptiv3 files>>
 * [https://vuetifyjs.com/en/components/cards/#combined]
 * - elevated
 *  - flat
 * - outlined
 */

import React from "react";
import { View, ViewStyle, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { useResponsive } from "../../hooks/useResponsive";
import { responsive as responsiveUtil } from "../../utils/responsive";
import { spacing } from "../../design-tokens/spacing";

type Variant = "elevated" | "outline" | "flat";

/**VAriatns types
 * - elev: elevates card with Shadow
 * - Outline: apllies thin border + card has no elevatoin
 * - falt: removese card shadow
 *
 */

interface CardProps {
  // main content
  children: React.ReactNode;

  //Optional -- elements--- Header/Footer
  //Header
  header?: React.ReactNode;
  // footer
  footer?: React.ReactNode;

  //   VAriant type---
  variant?: Variant;
  //syles---
  padded?: boolean;
  style?: ViewStyle;
}

// ------- COMPONENT ------------
export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  //deafaults styles ----
  variant = "elevated",
  padded = true,
  style,
}) => {
  // import theme -----
  const { theme } = useTheme();
  //   import Brpotn --- utils-----
  const { breakpoint, isWeb } = useResponsive();

  // RESPONSIVE -----
  // inner padding --> asjsut for smll screens---
  const pad = responsiveUtil<number>(breakpoint.name, {
    xs: spacing.md,
    md: spacing.lg,
    default: spacing.lg,
  })!;

  // Base CArd THEMSE ------
  const base: ViewStyle = {
    // color/ Theme -
    backgroundColor: theme.colors.surface,
    // rounded corderns -- -
    borderRadius: spacing.md,
    // cool trik for stop overflow --
    overflow: "hidden",
  };

  // Variant visuals ----------- STYLES --------
  const byVariant: Record<Variant, ViewStyle> = {
    // ELEVATED ----
    elevated: {
      // iOS shadow -----
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 }, //love it!
    },
    // /styles ---- border--- from theme
    outline: {
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    // /NO fx/clean ------
    flat: {},
  };

  // ----------- UI REDNR -----------

  return (
    <View style={[base, byVariant[variant], style]}>
      {/* ------ HEADER SEction ------ */}
      {header && (
        <View
          style={{
            padding: pad,
            paddingBottom: padded ? spacing.sm : 0,
            borderBottomWidth: 1, //div. line---
            // cool -- only show divider color if outline condiotnnal!!
            borderBottomColor:
              variant === "outline" ? theme.colors.border : "transparent",
          }}
        >
          {header}
        </View>
      )}

      {/* ---------- MAIN CONTENT ------- */}
      <View style={{ padding: padded ? pad : 0 }}>{children}</View>

      {/* ----- FOOTER SECTION ------- */}
      {footer && (
        <View
          style={{
            padding: pad,
            paddingTop: padded ? spacing.sm : 0,
            borderTopWidth: 1,
            borderTopColor:
              variant === "outline" ? theme.colors.border : "transparent",
            // On web, align buttons to the end by default feels nice
            ...(isWeb ? ({ alignItems: "flex-end" } as any) : null),
            gap: spacing.sm,
          }}
        >
          {/* footer content --- */}
          {footer}
        </View>
      )}
    </View>
  );
};
