// src/components/design-system/Button.tsx

/**KEEP all
 * visuals
 * layotu
 * variants /colrs/ font / in HERE
 * Reuasable logic--> responsive logic ->uitls
 */

import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  TouchableOpacityProps,
  View,
} from "react-native";
// improt router for bttn

// Pull in your theme + tokens and responsive helpers
import { useTheme } from "../../hooks/useTheme";
import { useResponsive } from "../../hooks/useResponsive";
import { responsive } from "../../utils/responsive";
import { spacing } from "../../design-tokens/spacing";

// -----BUTTON Variants Props-----
/**
 * Prim:filled-brnd color
 * Sec:light fill / low emphasis
 * Outline: transparen bckrgnd+colored border
 * Ghost: NO Bckgrnd+ ONLY TXT---
 */
type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps
  // extend TouchableOpacityProps so Link can inject props cleanly -- probelm curelty --
  // also omit 'style' AND 'onPress' so we can type our own onPress signature
  extends Omit<TouchableOpacityProps, "style" | "onPress"> {
  onPress?: (e: GestureResponderEvent) => void; // accept event
  children: React.ReactNode;
  // Visual style (filled/outline/etc.)
  variant?: Variant;
  // padding /typography size
  size?: Size;
  disabled?: boolean; //if bttn pressed/not
  loading?: boolean; //@ spinner
  fullWidth?: boolean; // Stretch to 100% width

  // Optional style overrides---
  style?: ViewStyle;
  textStyle?: TextStyle;
  //a11y Label---
  accessibilityLabel?: string;
  // allow Link role ---
  accessibilityRole?: "button" | "link";
}

// ----- Button Component -----
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  onPress,
  style,
  textStyle,
  // a11y: explicit screen reader label (fallback to text children if string)
  accessibilityLabel,
  accessibilityRole,
  // colelct/fetch everythign else Link/asChild -> inject onPresse,role
  ...touchableProps
}) => {
  // Active theme (light/dark + tokens)
  const { theme } = useTheme();

  //RESPONSIVE Utisl ----------
  // Crrent brlpoint / platform flags @responsive hook----
  const { breakpoint, isWeb } = useResponsive();

  // Size of bttns --> Adjust for small screens:
  const buttonSize = responsive<Size>(breakpoint.name, {
    // "xs" -> flback BTN "lg" -> "md"
    xs: size === "lg" ? "md" : size,
    // "md"+ -> default to prop req.
    md: size,
    default: size, // fllback
  })!;

  // size -> into actual values ---- need to updated based on visual ---
  const minHeight = buttonSize === "sm" ? 32 : buttonSize === "md" ? 40 : 48;
  const paddingX = buttonSize === "sm" ? spacing.sm : spacing.md;

  //Coantiner style shared by all variants
  const base: ViewStyle = {
    // fllback to spcing token--
    borderRadius: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    minHeight,
    paddingHorizontal: paddingX,
    // cool loadign FX -> dim @loading
    opacity: disabled || loading ? 0.6 : 1,
    // button -- adapt to window size - widht to fit
    ...(fullWidth ? { width: "100%" } : null),

    // Web-only ------
    /**cursor: styles -> when to press/X
     * userSElsect: "none"prevents txt from pressed/selct.
     * Importatn: Conditinal so doesn't apply to native platfrms
     */
    ...(isWeb
      ? ({
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
        } as any)
      : null),
  };

  // Visual variants -------- BELATRIX brand Tokens
  /** primary: filled (red @ dark)
   * Pass desing tokens
   */
  const containerByVariant: Record<Variant, ViewStyle> = {
    primary: { backgroundColor: theme.colors.primary[500] },
    secondary: { backgroundColor: theme.colors.surface },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    ghost: { backgroundColor: "transparent" },
  };

  //Base text style - sze adpats responsive---
  const textBase: TextStyle = {
    fontSize:
      buttonSize === "sm"
        ? theme.typography.fontSize.sm
        : theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium as TextStyle["fontWeight"],
    fontFamily: theme.typography.fontFamily.sans,
  };

  // Text color based VARIANT ------------
  /**REsponsive -----
   * prim/sec -> use theme text
   * outline/ghost -> use brand color for emphasis*/
  const textByVariant: Record<Variant, TextStyle> = {
    primary: { color: theme.colors.text.primary },
    secondary: { color: theme.colors.text.primary },
    outline: { color: theme.colors.primary[500] },
    ghost: { color: theme.colors.primary[500] },
  };

  //NEW hanlder -- onPress so Link’s handler still runs
  const handlePress = (e: GestureResponderEvent) => {
    // chekc is pressed or laoding state--
    if (disabled || loading) {
      // prevent Link navigation if disabled/loading
      (e as any).preventDefault?.();
      return;
    }
    /**NOTE: `onPress` here is either:
     * - the handler injected by <Link asChild>
     * OR --> onPress passed
     * --> result -> still call single unified onPress.
     * */
    onPress?.(e);
  };

  /** ----Accessibility Labels failsafes
   * ifno a11y labels --> read plain "text"
   */
  const plainLabel =
    // chck IF a11y label exist -> IF Not falbback to reade string "text" - else udnefiend
    accessibilityLabel ??
    (typeof children === "string" ? (children as string) : undefined);

  //------------------- UI RENDER -------------------
  return (
    <TouchableOpacity
      // pass props from (role/onPress button)
      {...touchableProps}
      onPress={handlePress} // composed handler (only once)
      // a11y ----
      accessibilityRole={accessibilityRole ?? "button"}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      //a11y -- fallback/failsafef
      accessibilityLabel={plainLabel}
      style={[base, containerByVariant[variant], style]}
      disabled={disabled || loading}
    >
      {/* Optional spinner --> @ left when loading */}
      {loading && (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary"
              ? theme.colors.text.primary // pass clr varnt token
              : theme.colors.primary[500] // spinner@brand clr w/ trnsprnt variants--- cool...
          }
          style={{ marginRight: spacing.xs }}
        />
      )}

      {/* Button label */}
      <Text style={[textBase, textByVariant[variant], textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

/**NOtes :
 * Link asChild --> clones Button
 * --> injects props like onPress, href, accessibilityRole="link" (on web), etc.
 * By spreading ...touchableProps onto TouchableOpacity, those props actually reach the native element.
 * By composing handlePress, the single `onPress` (either Link’s navigation or your consumer’s) runs unless disabled/loading blocks it.
 *
 *
 * ---onPress Issue / solution
 * 	Consumer’s onPress = a function the developer passes when they use <Button> directly.
 * Injected onPress (from Link) = Expo Router’s navigation click handler.
 */
