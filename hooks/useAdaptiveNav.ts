import { Platform } from "react-native";
import { useResponsive } from "./useResponsive";

// label/types--> layouts ---
export type NavType = "tabs" | "top" | "sidebar";

export function useAdaptiveNav() {
  // use responsive hook to get screen info
  const { isDesktop, isTablet, breakpoint } = useResponsive();

  /** --- choose nav pattern by screen size --
   * desktop/web => TOP bar
   * everything else => TABS (bottom)
   * check pltfrom -> if desktop=top, else tabs */
  // Checks=> top bar on web != tabs only on native handhelds
  const isWeb = Platform.OS === "web";
  const navType: NavType = isWeb || isDesktop ? "top" : "tabs";

  // Render->depent values/Screen size for NAvtype

  //showtopbar -> when == Top
  const showTopBar = navType === "top";
  //show bttmBar -> when === tabs
  const showBottomTabs = navType === "tabs";

  /** chk tabHeight to see of Table or phone based on values and adjst touch  ---*/
  // bigger touch area on tablets
  const tabHeight = isTablet ? 70 : 60;
  const minTouchSize = Platform.OS === "ios" ? 44 : 48; // a11y target sizes - min values

  return {
    // "top"/"tabs"
    navType,
    // true on desktop/web
    showTopBar,
    // true on phones/tablets
    showBottomTabs,
    // use container styles
    tabHeight,
    minTouchSize,
    breakpoint,
  };
}
