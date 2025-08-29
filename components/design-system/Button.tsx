import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { useResponsive } from "../../hooks/useResponsive";
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  onPress,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { responsive, isWeb } = useResponsive();
  // Responsive sizing
  const buttonSize = responsive({
    xs: size === "lg" ? "md" : size, // Smaller on mobile
    md: size,
  });
  const getButtonStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      borderRadius: theme.spacing.sm,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      minHeight: buttonSize === "sm" ? 32 : buttonSize === "md" ? 40 : 48,
      paddingHorizontal:
        buttonSize === "sm" ? theme.spacing.sm : theme.spacing.md,
      opacity: disabled || loading ? 0.6 : 1,
    };
    // Platform-specific adjustments
    if (isWeb) {
      baseStyles.cursor = disabled ? "not-allowed" : "pointer";
      baseStyles.userSelect = "none";
    }
    if (fullWidth) {
      baseStyles.width = "100%";
    }
    // Variant styles
    switch (variant) {
      case "primary":
        return {
          ...baseStyles,
          backgroundColor: theme.colors.primary[500],
          borderWidth: 0,
        };
      case "secondary":
        return {
          ...baseStyles,
          backgroundColor: theme.colors.neutral[200],
          borderWidth: 0,
        };
      case "outline":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary[500],
        };
      case "ghost":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          borderWidth: 0,
        };
      default:
        return baseStyles;
    }
  };
  const getTextStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      fontSize:
        buttonSize === "sm"
          ? theme.typography.fontSize.sm
          : theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      fontFamily: theme.typography.fontFamily.sans,
    };
    // Variant text colors
    switch (variant) {
      case "primary":
        return {
          ...baseStyles,
          color: theme.colors.neutral[50],
        };
      case "secondary":
        return {
          ...baseStyles,
          color: theme.colors.neutral[700],
        };
      case "outline":
      case "ghost":
        return {
          ...baseStyles,
          color: theme.colors.primary[500],
        };
      default:
        return baseStyles;
    }
  };
  const handlePress = () => {
    if (disabled || loading) return;
    onPress?.();
  };
  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      // Web-specific props
      {...(isWeb && {
        onMouseEnter: () => {
          // Add hover effects for web
        },
        onMouseLeave: () => {
          // Remove hover effects
        },
      })}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary"
              ? theme.colors.neutral[50]
              : theme.colors.primary[500]
          }
          style={{ marginRight: theme.spacing.xs }}
        />
      )}
      <Text style={getTextStyles()}>{children}</Text>
    </TouchableOpacity>
  );
};
