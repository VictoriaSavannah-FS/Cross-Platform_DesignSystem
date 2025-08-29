// src/design-tokens/typography.ts
// Font families for acroos app----

export const typography = {
  fontFamily: {},

  // fontSize
  fontSize: {},

  // Weights as strings "fontWeight"
  fontWeight: {},

  // Line-heights: numbers ---
  lineHeight: {},
} as const;

// Helper type can fetch/impot elsewhere---
export type TypographyTokens = typeof typography;
