/**Color Sscheme / theme

- define semantic / color_Convetion paletttes
  - light dark theme
  - primary
  - success/ failure
  - background
  - text*/

export const colors = {
  //----------- theme : Light -----------
  // Bellatrix Ligh palette ---
  light: {
    background: "#FFFFFF",
    surface: "#F8FAFC",
    border: "#E5E7EB", //LGHT BORDER
    text: {
      primary: "#0f172a", // TOP important text
      secondary: "#475569", // subheadings, hints
      disabled: "#94a3b8", // faded/inactive text
    },
    // PRIMARY COLORS --- brdn palette based onshades
    primary: {
      50: "#f0f9ff", // lightest
      100: "#e0f2fe",
      500: "#0ea5e9", // main brand color
      600: "#0284c7",
      900: "#0c4a6e", // darkest
    },
    //   UNIVERSAL meanigns ----
    semantic: {
      success: "#22c55e", // grenn
      warning: "#f59e0b", //ornge
      error: "#ef4444", // red
      info: "#3b82f6", // blueidsh
    },
    // nuetrals - greys/greyscale for contrast
    neutral: {
      50: "#f8fafc",
      100: "#f1f5f9",
      500: "#64748b",
      900: "#0f172a",
    },
  },
  //------------  theme : DArk ------------- Main look - my fabvorite look---
  // Bellatrix dark palette ---
  dark: {
    background: "#0b0e13",
    surface: "#141821",
    border: "#2a2f3a",

    text: {
      primary: "#F5F7FA", // mn text
      secondary: "#B4BCC9", // subtext
      disabled: "#5A6270", // muted/disabled text
    },

    // Brand = bold red ! Pop of COlor -- we'll see how it looks...
    primary: {
      50: "#fff1f1",
      100: "#ffd6d6",
      500: "#E11D2F", // main brand RED --> will pass to my Call2Actin bttn tokens ---
      600: "#C11224",
      900: "#7A0A14",
    },

    // Still neutrals for UI contrast--
    neutral: {
      50: "#111318",
      100: "#171A20",
      500: "#596173",
      900: "#F5F7FA",
    },

    // same semantics --
    semantic: {
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#f87171",
      info: "#60a5fa",
    },
  },
} as const;

/** e/a section-----
 * bck: main page
 * surfce: cars,modals, elev. srufaces
 * broders/ dividesr
 * text hierarchy
 *  prim: brand colors
 *  sec
 *  disabled *
 * Neutrals: Greys -> gtr for backgronds / text / borders
 *      helps strong/subtle ccontrasts
 * semantics --> uni. meaning
 * succes errors warning
 */
