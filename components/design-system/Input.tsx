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
} from "react-native";

import { useTheme } from "../../hooks/useTheme";
import { useResponsive } from "../../hooks/useResponsive";
import { responsive as responsiveUtil } from "../../utils/responsive";
import { spacing } from "../../design-tokens/spacing";

// Import new VAlidation utils----
import { runValidation, type Rule } from "../../utils/validation";

/** ---------- Props ----------- */
type Size = "sm" | "md" | "lg";

interface InputProps extends Omit<TextInputProps, "onChangeText" | "style"> {
  label?: string; // optional top label
  helperText?: string; // small hint under the field
  errorText?: string; // external error
  rules?: Rule[]; //<---VAldiaiton Rules
  size?: Size; // Responsive size/font/pading
  fullWidth?: boolean; // Responsive->paddign /size
  onChangeText?: (value: string) => void; ///trigere

  //   Style overrides ------
  style?: ViewStyle;
  inputStyle?: TextStyle;
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
  ...rest //any other TextInput props caller paasses----
}) => {
  // import Theme+brkpint utils----
  const { theme } = useTheme();
  const { breakpoint, isWeb } = useResponsive();

  /** --- Responsive control size --- */
  const controlSize = useMemo<Size>(() => {
    return (
      // /check brkpoint /size ---
      responsiveUtil<Size>(breakpoint.name, {
        // shrink lg -> md on tiny screens
        xs: size === "lg" ? "md" : size,

        // normal size otherwise
        md: size,
        default: size,
      }) ?? size //deflt size
    );
  }, [breakpoint.name, size]);

  // Derived paddings + font sizes ---- logic hanlding
  /** ----- VERTICAL PAdding -----
   * if sm input -> tighter Vertical padding
   * if md input-> more breathign room
   * if lg inout-> tallest padding
   */
  const paddY = controlSize === "sm" ? 8 : controlSize === "md" ? 10 : 12;
  /** ----- HORIZAONTAL PADDIGN-----
   * pass spacing token
   * if sm-> pass sm spacing token
   * if md-> m spacing token / dflt
   */
  const paddX = controlSize === "sm" ? spacing.sm : spacing.md;

  /** ----- FONT SIZE -----
   * pass typogrphy token
   * if sm -> pass typo. smll token
   * if md/lg-> deaflut noamrl size token
   */
  const fontSize =
    controlSize === "sm"
      ? theme.typography.fontSize.sm
      : theme.typography.fontSize.base;

  /** --- Validation state
   * PAss NEW valdiatin Utils! :) --- */
  const [touched, setTouched] = useState(false); // has user interacted?
  /** --- Erron hadnlign Logic----
   *   only validte --> touches is true
   * AND -> NO external X errors @validaiton'
   * runs - validaiton helper to chekc rules
   * Else-> not touched/interacted-> no Valdation
   * */
  const localError =
    touched && !errorText ? runValidation(String(value), rules) : null;
  const showError = errorText ?? localError; // prefer external error if given

  /** --- Base container (wraps everything vertically) ---
   * great to check Input caontienr and IF it needs to strewtch the width of screen
   */
  const container: ViewStyle = {
    width: fullWidth ? "100%" : undefined,
  };

  /** --- Input box visual styles ---
   * pass theme / desing tokesn fro styles
   */
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
    // checks platform and adjust styls acoridnly ---
    ...(isWeb ? ({ outlineStyle: "none" } as any) : null),
  };

  /** --- Helper/ error text under the field --- */
  const subtle: TextStyle = {
    // styles ---
    marginTop: 6,
    fontSize: theme.typography.fontSize.xs,
    color: showError //red deflt
      ? theme.colors.semantic.error //pass color tokens
      : theme.colors.text.secondary,
  };

  //Contional----- for email fiild
  // --> pick keyboard for email if rule is present (but allow override)
  const wantsEmail = rules?.some((r) => r.type === "email");
  const keyboardType =
    rest.keyboardType ?? (wantsEmail ? "email-address" : "default");

  /** --- UI render --- */
  return (
    <View style={[container, style]}>
      {/* ---- Label (I like it....) */}
      {label && (
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

      {/* -----  Actual input field ---- */}
      <TextInput
        value={String(value)}
        onChangeText={(txt) => {
          onChangeText?.(txt);
          if (!touched) setTouched(true); // mark as touched on first input
        }}
        onBlur={() => setTouched(true)} // mark as touched
        placeholderTextColor={theme.colors.text.disabled}
        style={[field, inputStyle]}
        // iOS defults ----
        autoCapitalize={rest.autoCapitalize ?? "none"}
        autoCorrect={rest.autoCorrect ?? false}
        keyboardType={keyboardType} //keybrdType
        //a11y props----
        accessibilityLabel={label} //laebl text
        accessibilityHint={showError ?? helperText} //subtetx---
      />

      {/* ---- subtext ------ */}
      {(helperText || showError) && (
        <Text accessibilityLiveRegion="polite" style={subtle}>
          {showError ?? helperText}
        </Text>
      )}
    </View>
  );
};

/**
 * b/c I'm a Visual Learner--- 
 * CONTAIENER <View> = OuterBOx
┌──────────────────────────────┐
│  Label (optional)            │   <- top label -> passsed as prop
├──────────────────────────────┤
│  [   TextInput Field   ]     │   <- the input box -> typign field
├──────────────────────────────┤
│  helper text OR error text   │   <- feedback under field -> subtext
└──────────────────────────────┘            -> changes @validation'
 * 
 * 
 */
