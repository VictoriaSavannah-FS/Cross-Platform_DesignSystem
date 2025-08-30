// src/design-tokens/typography.ts
// Font families for acroos app----

export const typography = {
  fontFamily: {
    sans: "System",
    mono: "Menlo, Consolas, monospace",
  },

  // Text / fontSize
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16, // dlft par.
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },

  // Weights/ "fontWeight"
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // Line-heights
  lineHeight: {
    tight: 20,
    snug: 22,
    normal: 24,
    relaxed: 28,
  },
} as const;

// (Optional) Helper type if you want to import the shape elsewhere
export type TypographyTokens = typeof typography;

// Txt Style Props
// [https://reactnative.dev/docs/text-style-props]
