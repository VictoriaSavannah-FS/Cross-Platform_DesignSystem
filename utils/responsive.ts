/** responsive.ts
 *
 * helpr function to maek dsign tokesn responsive to screen sizes--
 */

import type { Breakpoint } from "./breakpoints";

// bp refernce values--- []sm-lg
export const breakpointOrder = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const satisfies readonly Breakpoint[];

//utils fucntion--- gen,function--- can return any type
// defien at which breakpoint
export function responsive<T>(
  // take 2 values/inputd
  currentBp: Breakpoint,
  values: Partial<Record<Breakpoint, T>> & { default?: T }
): T | undefined {
  // exact mathc
  if (values[currentBp] !== undefined) return values[currentBp];

  //fidn the smll brkpoitn tofallback
  const idx = breakpointOrder.indexOf(currentBp);
  for (let i = idx - 1; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }
  //fallback to defult sixe
  return values.default;
}
