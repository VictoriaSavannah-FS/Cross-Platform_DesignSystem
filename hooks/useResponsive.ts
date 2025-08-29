// import { breakpoints } from './../design-tokens/platform';
import { useState, useEffect, useMemo } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { breakpoints, type Breakpoint } from "../utils/breakpoints";

// use bp uitls for determine wdith basedon bp---
function widthToBreakpoint(w: number): Breakpoint {
  if (w >= breakpoints["2xl"]) return "2xl";
  if (w >= breakpoints.xl) return "xl";
  if (w >= breakpoints.lg) return "lg";
  if (w >= breakpoints.md) return "md";
  if (w >= breakpoints.sm) return "sm";
  return "xs"; //deflt size
}
export const useResponsive = () => {
  // statess-----
  // Auto updates on rotate/resize; no manual listeners needed /useState()X----
  const { width, height } = useWindowDimensions();
  // brkpoitn value ----useMemo = store values when h/w change
  const breakpoint = useMemo(
    // name = result of widthToBreakpoint(width) → "xs"/"sm"/"md"/"lg"/"xl"/"2xl"
    // width: current width (px)
    // height: current height (px)
    /**
     * Example shape:
     * {
     *   name: "md",   // breakpoint label
     *   width: 768,   // px
     *   height: 1024, // px
     * }
     */
    () => ({ name: widthToBreakpoint(width), width, height } as const),
    // dependencies ⇒ only re-calc when THESE values change
    [width, height]
  );

  // identify/find what DEvice user is on --- Boolean / t/F
  const isPhone = useMemo(() => width < breakpoints.md, [width]); // < 768 smller screensx
  //   iPads/Tablests--- range 768–1023
  const isTablet = useMemo(
    () => width >= breakpoints.md && width < breakpoints.lg,
    [width]
  );
  //   laptop/desktops
  const isDesktop = useMemo(() => width >= breakpoints.lg, [width]); // ≥ 1024

  // ----- platform -----------------
  const isMobile = Platform.OS === "ios" || Platform.OS === "android";
  const isWeb = Platform.OS === "web";

  // ----- return API/obejcts  -----
  return {
    // expose raw dimensions for convenience
    dimensions: { width, height },

    // expose brkpoint object -defiend ^^^
    breakpoint, // { name: Breakpoint, width, height }

    // form-factor booleans (layout helpers)
    isPhone,
    isTablet,
    isDesktop,

    // platform booleans (interaction/UX helpers)
    isMobile,
    isWeb,
  } as const;
};

/**
 * NOTE/ CHANGES ---
 * removed Dimensions.addEventListener + manual state.
 * useWindowDimensions()-> listens size/orientation changes
 *
 * useWindowDimensions ()
 * [https://reactnative.dev/docs/usewindowdimensions]
 *
 * useWindowDimensions automatically updates all of its values when screen size or font scale changes. You can get your application window's width and height like so:
 *
 * "responsive()" value-picker helper now lives in:
 *   src/utils/responsive.ts
 * Usage inside a component:
 *   const padding = responsive(breakpoint.name, { xs: 12, md: 16, lg: 24, default: 12 });
 */

/** useMemo
useMemo is a React Hook that lets you cache the result of a calculation between re-renders
[https://react.dev/reference/react/useMemo]  */
