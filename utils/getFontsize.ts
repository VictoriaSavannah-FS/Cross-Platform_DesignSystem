// src/utils/typography.ts
import { responsive } from "./responsive";
import type { Breakpoint } from "./breakpoints";

export function getFontSize(
  breakpoint: Breakpoint,
  desktopSize: number,
  mobileSize?: number
) {
  return responsive(breakpoint, {
    xs: mobileSize ?? Math.max(desktopSize - 2, 12),
    md: desktopSize,
    default: desktopSize,
  })!;
}
