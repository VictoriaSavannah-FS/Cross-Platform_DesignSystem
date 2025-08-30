/**INPUT Compoonet w/ Vlidation
 * PALTFORM-specific stylig ---
 * Resuable text fields for Inpuot
 * - forsm / seacrh bar / email? usern, password?
 * Styling --
 * theme-based light/dark '@themPRovider'
 * consistency w/ design tokens ->  fonts-spacing
 *
 */

import React, { useMemo, useState } from "react";
import {
  TextInput,
  View,
  Text,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Platform,
} from "react-native";

import { useTheme } from "../../hooks/useTheme";
import { useResponsive } from "../../hooks/useResponsive";
import { responsive as responsiveUtil } from "../../utils/responsive";
import { spacing } from "../../design-tokens/spacing";

/** ---------- Validation helpers (mini utils) ----------- */
// We allow some simple "rules" to be passed in
type Rule =
  | { type: "required"; message?: string }
  | { type: "email"; message?: string }
  | { type: "minLength"; value: number; message?: string };

// Function that checks the value against all rules
function runValidation(value: string, rules?: Rule[]): string | null {
  if (!rules?.length) return null;

  for (const r of rules) {
    if (r.type === "required" && !value.trim()) {
      return r.message ?? "This field is required.";
    }
    if (r.type === "email") {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!ok) return r.message ?? "Please enter a valid email.";
    }
    if (r.type === "minLength" && value.length < r.value) {
      return r.message ?? `Must be at least ${r.value} characters.`;
    }
  }
  return null;
}

/** ---------- Props (what users can pass in) ----------- */
type Size = "sm" | "md" | "lg";

interface InputProps extends Omit<TextInputProps, "onChangeText" | "style"> {
  label?: string; // optional top label
  helperText?: string; // small hint under the field
  errorText?: string; // external error (overrides local validation)
  rules?: Rule[]; // simple validation rules
  size?: Size; // adjust padding/font size
  fullWidth?: boolean; // stretch input across screen
  onChangeText?: (value: string) => void;
  style?: ViewStyle; // container style override
  inputStyle?: TextStyle; // textinput style override
}

/** ---------- Component ------------------------------- */
export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  errorText,
  rules,
  size = "md",
  fullWidth,
  onChangeText,
  value = "",
  style,
  inputStyle,
  ...rest
}) => {
  const { theme } = useTheme();
  const { breakpoint, isWeb } = useResponsive();

  /** --- Responsive control size (smaller padding on xs) --- */
  const controlSize = useMemo<Size>(() => {
    return (
      responsiveUtil<Size>(breakpoint.name, {
        xs: size === "lg" ? "md" : size, // shrink lg → md on tiny screens
        md: size, // normal size otherwise
        default: size,
      }) ?? size
    );
  }, [breakpoint.name, size]);

  // Derived paddings + font sizes
  const paddY = controlSize === "sm" ? 8 : controlSize === "md" ? 10 : 12;
  const paddX = controlSize === "sm" ? spacing.sm : spacing.md;
  const fontSize =
    controlSize === "sm"
      ? theme.typography.fontSize.sm
      : theme.typography.fontSize.base;

  /** --- Validation state --- */
  const [touched, setTouched] = useState(false); // has user interacted?
  const localError =
    touched && !errorText ? runValidation(String(value), rules) : null;
  const showError = errorText ?? localError; // prefer external error if given

  /** --- Base container (wraps everything vertically) --- */
  const container: ViewStyle = {
    width: fullWidth ? "100%" : undefined,
  };

  /** --- Input box visual styles --- */
  const field: TextStyle = {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text.primary,
    borderColor: showError ? theme.colors.semantic.error : theme.colors.border,
    borderWidth: 1,
    borderRadius: spacing.sm,
    paddingVertical: paddY,
    paddingHorizontal: paddX,
    fontSize,
    fontFamily: theme.typography.fontFamily.sans,

    // Web niceties: remove browser default blue outline
    ...(isWeb ? ({ outlineStyle: "none" } as any) : null),
  };

  /** --- Helper or error text under the field --- */
  const subtle: TextStyle = {
    marginTop: 6,
    fontSize: theme.typography.fontSize.xs,
    color: showError
      ? theme.colors.semantic.error
      : theme.colors.text.secondary,
  };

  /** --- UI render --- */
  return (
    <View style={[container, style]}>
      {/* Label (optional) */}
      {!!label && (
        <Text
          style={{
            marginBottom: 6,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            fontFamily: theme.typography.fontFamily.sans,
          }}
        >
          {label}
        </Text>
      )}

      {/* Actual input field */}
      <TextInput
        value={String(value)}
        onChangeText={(txt) => {
          onChangeText?.(txt);
          if (!touched) setTouched(true); // mark as touched on first input
        }}
        onBlur={() => setTouched(true)} // mark touched when leaving field
        placeholderTextColor={theme.colors.text.disabled}
        style={[field, inputStyle]}
        // iOS/Android keyboard defaults
        autoCapitalize={rest.autoCapitalize ?? "none"}
        autoCorrect={rest.autoCorrect ?? false}
        // Optional subtle shadows depending on platform
        {...(Platform.OS === "android"
          ? ({ elevation: 0 } as any)
          : ({
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 2,
              shadowOffset: { width: 0, height: 1 },
            } as any))}
        {...rest}
      />

      {/* Helper or error message below field */}
      {(helperText || showError) && (
        <Text accessibilityLiveRegion="polite" style={subtle}>
          {showError ?? helperText}
        </Text>
      )}
    </View>
  );
};
