import React from "react";
import { Text, TextStyle, Platform } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useResponsive } from "../hooks/useResponsive";
interface TypographyProps {
  children: React.ReactNode;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "body1"
    | "body2"
    | "caption"
    | "overline";
  color?: "primary" | "secondary" | "disabled" | "error" | "success";
  align?: "left" | "center" | "right" | "justify";
  weight?: "normal" | "medium" | "semibold" | "bold";
  style?: TextStyle;
  numberOfLines?: number;
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
  const { responsive } = useResponsive();
  const getTypographyStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      fontFamily: theme.typography.fontFamily.sans,
      textAlign: align,
      color: theme.colors.text.primary,
    };
    // Platform-specific font adjustments
    if (Platform.OS === "web") {
      baseStyles.fontFamily = theme.typography.fontFamily.sans;
    }
    // Responsive font sizes
    const getFontSize = (desktopSize: number, mobileSize?: number) => {
      return responsive({
        xs: mobileSize || Math.max(desktopSize - 2, 12),
        md: desktopSize,
      });
    };
    // Variant styles
    switch (variant) {
      case "h1":
        return {
          ...baseStyles,
          fontSize: getFontSize(
            theme.typography.fontSize["4xl"],
            theme.typography.fontSize["3xl"]
          ),
          fontWeight: weight || theme.typography.fontWeight.bold,
          lineHeight: theme.typography.lineHeight.tight,
          marginBottom: theme.spacing.lg,
        };
      case "h2":
        return {
          ...baseStyles,
          fontSize: getFontSize(
            theme.typography.fontSize["3xl"],
            theme.typography.fontSize["2xl"]
          ),
          fontWeight: weight || theme.typography.fontWeight.bold,
          lineHeight: theme.typography.lineHeight.tight,
          marginBottom: theme.spacing.md,
        };
      case "h3":
        return {
          ...baseStyles,
          fontSize: getFontSize(
            theme.typography.fontSize["2xl"],
            theme.typography.fontSize.xl
          ),
          fontWeight: weight || theme.typography.fontWeight.semibold,
          lineHeight: theme.typography.lineHeight.snug,
          marginBottom: theme.spacing.sm,
        };
      case "h4":
        return {
          ...baseStyles,
          fontSize: getFontSize(
            theme.typography.fontSize.xl,
            theme.typography.fontSize.lg
          ),
          fontWeight: weight || theme.typography.fontWeight.semibold,
          lineHeight: theme.typography.lineHeight.snug,
          marginBottom: theme.spacing.sm,
        };
      case "body1":
        return {
          ...baseStyles,
          fontSize: getFontSize(theme.typography.fontSize.base),
          fontWeight: weight || theme.typography.fontWeight.normal,
          lineHeight: theme.typography.lineHeight.normal,
        };
      case "body2":
        return {
          ...baseStyles,
          fontSize: getFontSize(theme.typography.fontSize.sm),
          fontWeight: weight || theme.typography.fontWeight.normal,
          lineHeight: theme.typography.lineHeight.normal,
        };
      case "caption":
        return {
          ...baseStyles,
          fontSize: getFontSize(theme.typography.fontSize.xs),
          fontWeight: weight || theme.typography.fontWeight.normal,
          lineHeight: theme.typography.lineHeight.normal,
          color: theme.colors.text.secondary,
        };
      case "overline":
        return {
          ...baseStyles,
          fontSize: getFontSize(theme.typography.fontSize.xs),
          fontWeight: weight || theme.typography.fontWeight.medium,
          lineHeight: theme.typography.lineHeight.normal,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          color: theme.colors.text.secondary,
        };
      default:
        return baseStyles;
    }
  };
  const getColorStyles = (): { color: string } => {
    switch (color) {
      case "primary":
        return { color: theme.colors.text.primary };
      case "secondary":
        return { color: theme.colors.text.secondary };
      case "disabled":
        return { color: theme.colors.text.disabled };
      case "error":
        return { color: theme.colors.semantic.error };
      case "success":
        return { color: theme.colors.semantic.success };
      default:
        return { color: theme.colors.text.primary };
    }
  };
  return (
    <Text
      style={[getTypographyStyles(), getColorStyles(), style]}
      numberOfLines={numberOfLines}
      testID={testID}
      accessibilityRole="text"
    >
      {children}
    </Text>
  );
};
