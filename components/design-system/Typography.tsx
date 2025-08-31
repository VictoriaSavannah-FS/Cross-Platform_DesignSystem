// src/components/design-system/Typography.tsx
import React from "react";
import { Text, TextStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";

// improt utils for screen types/props
import { responsive as responsiveUtil } from "../../utils/responsive";
import { useResponsive } from "../../hooks/useResponsive";

// brkpoitn ---
// const { breakpoints } = useResponsive();

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

type Tone = "primary" | "secondary" | "disabled" | "error" | "success";

interface TypographyProps {
  children: React.ReactNode;
  variant?: Variant; // which text style to use (size/weight/spacing)
  color?: Tone; // override color (uses theme text by default)
  align?: "left" | "center" | "right" | "justify";
  weight?: "normal" | "medium" | "semibold" | "bold"; // optional manual override
  style?: TextStyle; // final manual style overrides
  numberOfLines?: number; // clamp lines if you want
  testID?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body1",
  color = "primary",
  align = "left",
  weight,
  style,
  numberOfLines,
  testID,
}) => {
  const { theme } = useTheme();

  //hoorefer..
  const { breakpoint } = useResponsive();

  // --- helper: make a font size responsive ---
  // desktopSize = your main token size
  // mobileSize  = optional smaller size for tiny screens
  const getFontSize = (desktopSize: number, mobileSize?: number) =>
    // utils prop--->`default`
    responsiveUtil(breakpoint.name, {
      xs: mobileSize ?? Math.max(desktopSize - 2, 12), // shrink-> sm screens
      md: desktopSize, // +md->use desktop token
      default: desktopSize, // fallback if nothing else matched
    })!;

  // --- base text styles shared by all variants ---
  const base: TextStyle = {
    fontFamily: theme.typography.fontFamily.sans,
    textAlign: align,
    color: theme.colors.text.primary, // overridden below by `color` prop
  };

  // --- pick size/weight/spacing by variant ---
  const byVariant = (): TextStyle => {
    switch (variant) {
      case "h1":
        return {
          ...base,
          fontSize: getFontSize(
            theme.typography.fontSize["4xl"],
            theme.typography.fontSize["3xl"]
          ),
          fontWeight: (weight ??
            theme.typography.fontWeight.bold) as TextStyle["fontWeight"],
          lineHeight: theme.typography.lineHeight.tight,
          marginBottom: theme.spacing.lg,
        };
      case "h2":
        return {
          ...base,
          fontSize: getFontSize(
            theme.typography.fontSize["3xl"],
            theme.typography.fontSize["2xl"]
          ),
          fontWeight: (weight ??
            theme.typography.fontWeight.bold) as TextStyle["fontWeight"],
          lineHeight: theme.typography.lineHeight.tight,
          marginBottom: theme.spacing.md,
        };
      case "h3":
        return {
          ...base,
          fontSize: getFontSize(
            theme.typography.fontSize["2xl"],
            theme.typography.fontSize.xl
          ),
          fontWeight: (weight ??
            theme.typography.fontWeight.semibold) as TextStyle["fontWeight"],
          lineHeight: theme.typography.lineHeight.snug,
          marginBottom: theme.spacing.sm,
        };
      case "h4":
        return {
          ...base,
          fontSize: getFontSize(
            theme.typography.fontSize.xl,
            theme.typography.fontSize.lg
          ),
          fontWeight: (weight ??
            theme.typography.fontWeight.semibold) as TextStyle["fontWeight"],
          lineHeight: theme.typography.lineHeight.snug,
          marginBottom: theme.spacing.sm,
        };
      case "body1":
        return {
          ...base,
          fontSize: getFontSize(theme.typography.fontSize.base),
          fontWeight: (weight ??
            theme.typography.fontWeight.normal) as TextStyle["fontWeight"],
          lineHeight: theme.typography.lineHeight.normal,
        };
      case "body2":
        return {
          ...base,
          fontSize: getFontSize(theme.typography.fontSize.sm),
          fontWeight: (weight ??
            theme.typography.fontWeight.normal) as TextStyle["fontWeight"],
          lineHeight: theme.typography.lineHeight.normal,
        };
      case "caption":
        return {
          ...base,
          fontSize: getFontSize(theme.typography.fontSize.xs),
          fontWeight: (weight ??
            theme.typography.fontWeight.normal) as TextStyle["fontWeight"],
          lineHeight: theme.typography.lineHeight.normal,
          color: theme.colors.text.secondary,
        };
      case "overline":
        return {
          ...base,
          fontSize: getFontSize(theme.typography.fontSize.xs),
          fontWeight: (weight ??
            theme.typography.fontWeight.medium) as TextStyle["fontWeight"],
          lineHeight: theme.typography.lineHeight.normal,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          color: theme.colors.text.secondary,
        };
      default:
        return base;
    }
  };

  // --- tone overrides (optional) ---
  const byColor: { color: string } =
    color === "primary"
      ? { color: theme.colors.text.primary }
      : color === "secondary"
      ? { color: theme.colors.text.secondary }
      : color === "disabled"
      ? { color: theme.colors.text.disabled }
      : color === "error"
      ? { color: theme.colors.semantic.error }
      : color === "success"
      ? { color: theme.colors.semantic.success }
      : { color: theme.colors.text.primary };

  return (
    <Text
      style={[byVariant(), byColor, style]}
      numberOfLines={numberOfLines}
      testID={testID}
      accessibilityRole="text"
    >
      {children}
    </Text>
  );
};
// FROM lesson eaxmple -----
// import React from "react";
// import { Text, TextStyle, Platform } from "react-native";
// import { useTheme } from "../hooks/useTheme";
// import { useResponsive } from "../hooks/useResponsive";
// interface TypographyProps {
//   children: React.ReactNode;
//   variant?:
//     | "h1"
//     | "h2"
//     | "h3"
//     | "h4"
//     | "body1"
//     | "body2"
//     | "caption"
//     | "overline";
//   color?: "primary" | "secondary" | "disabled" | "error" | "success";
//   align?: "left" | "center" | "right" | "justify";
//   weight?: "normal" | "medium" | "semibold" | "bold";
//   style?: TextStyle;
//   numberOfLines?: number;
//   testID?: string;
// }
// export const Typography: React.FC<TypographyProps> = ({
//   children,
//   variant = "body1",
//   color = "primary",
//   align = "left",
//   weight,
//   style,
//   numberOfLines,
//   testID,
// }) => {
//   const { theme } = useTheme();
//   const { responsive } = useResponsive();
//   const getTypographyStyles = (): TextStyle => {
//     const baseStyles: TextStyle = {
//       fontFamily: theme.typography.fontFamily.sans,
//       textAlign: align,
//       color: theme.colors.text.primary,
//     };
//     // Platform-specific font adjustments
//     if (Platform.OS === "web") {
//       baseStyles.fontFamily = theme.typography.fontFamily.sans;
//     }
//     // Responsive font sizes
//     const getFontSize = (desktopSize: number, mobileSize?: number) => {
//       return responsive({
//         xs: mobileSize || Math.max(desktopSize - 2, 12),
//         md: desktopSize,
//       });
//     };
//     // Variant styles
//     switch (variant) {
//       case "h1":
//         return {
//           ...baseStyles,
//           fontSize: getFontSize(
//             theme.typography.fontSize["4xl"],
//             theme.typography.fontSize["3xl"]
//           ),
//           fontWeight: weight || theme.typography.fontWeight.bold,
//           lineHeight: theme.typography.lineHeight.tight,
//           marginBottom: theme.spacing.lg,
//         };
//       case "h2":
//         return {
//           ...baseStyles,
//           fontSize: getFontSize(
//             theme.typography.fontSize["3xl"],
//             theme.typography.fontSize["2xl"]
//           ),
//           fontWeight: weight || theme.typography.fontWeight.bold,
//           lineHeight: theme.typography.lineHeight.tight,
//           marginBottom: theme.spacing.md,
//         };
//       case "h3":
//         return {
//           ...baseStyles,
//           fontSize: getFontSize(
//             theme.typography.fontSize["2xl"],
//             theme.typography.fontSize.xl
//           ),
//           fontWeight: weight || theme.typography.fontWeight.semibold,
//           lineHeight: theme.typography.lineHeight.snug,
//           marginBottom: theme.spacing.sm,
//         };
//       case "h4":
//         return {
//           ...baseStyles,
//           fontSize: getFontSize(
//             theme.typography.fontSize.xl,
//             theme.typography.fontSize.lg
//           ),
//           fontWeight: weight || theme.typography.fontWeight.semibold,
//           lineHeight: theme.typography.lineHeight.snug,
//           marginBottom: theme.spacing.sm,
//         };
//       case "body1":
//         return {
//           ...baseStyles,
//           fontSize: getFontSize(theme.typography.fontSize.base),
//           fontWeight: weight || theme.typography.fontWeight.normal,
//           lineHeight: theme.typography.lineHeight.normal,
//         };
//       case "body2":
//         return {
//           ...baseStyles,
//           fontSize: getFontSize(theme.typography.fontSize.sm),
//           fontWeight: weight || theme.typography.fontWeight.normal,
//           lineHeight: theme.typography.lineHeight.normal,
//         };
//       case "caption":
//         return {
//           ...baseStyles,
//           fontSize: getFontSize(theme.typography.fontSize.xs),
//           fontWeight: weight || theme.typography.fontWeight.normal,
//           lineHeight: theme.typography.lineHeight.normal,
//           color: theme.colors.text.secondary,
//         };
//       case "overline":
//         return {
//           ...baseStyles,
//           fontSize: getFontSize(theme.typography.fontSize.xs),
//           fontWeight: weight || theme.typography.fontWeight.medium,
//           lineHeight: theme.typography.lineHeight.normal,
//           textTransform: "uppercase",
//           letterSpacing: 0.5,
//           color: theme.colors.text.secondary,
//         };
//       default:
//         return baseStyles;
//     }
//   };
//   const getColorStyles = (): { color: string } => {
//     switch (color) {
//       case "primary":
//         return { color: theme.colors.text.primary };
//       case "secondary":
//         return { color: theme.colors.text.secondary };
//       case "disabled":
//         return { color: theme.colors.text.disabled };
//       case "error":
//         return { color: theme.colors.semantic.error };
//       case "success":
//         return { color: theme.colors.semantic.success };
//       default:
//         return { color: theme.colors.text.primary };
//     }
//   };
//   return (
//     <Text
//       style={[getTypographyStyles(), getColorStyles(), style]}
//       numberOfLines={numberOfLines}
//       testID={testID}
//       accessibilityRole="text"
//     >
//       {children}
//     </Text>
//   );
// };
