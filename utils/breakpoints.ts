//YAass! Instead of having tp repeat time and time againthis values --> store code snippt + jsut fetch!

export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
  "2xl": 1920,
} as const; //now keys=types X not just #'s

// keyof typeof => unnion of the keys xs:0 -> "sm"
// Auto-generates: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export type Breakpoint = keyof typeof breakpoints;

// 2025 breakpoits [https://www.browserstack.com/guide/responsive-design-breakpoints]
