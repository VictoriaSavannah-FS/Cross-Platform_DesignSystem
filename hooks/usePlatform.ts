// src/hooks/usePlatform.ts
import { Platform } from "react-native";

export function usePlatform() {
  const os = Platform.OS; // 'ios' | 'web'
  return {
    platform: os,
    isIOS: os === "ios",

    isWeb: os === "web",
  } as const;
}
