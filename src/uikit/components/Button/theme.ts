import { ButtonTheme, variants } from "./types";
import { lightColors, darkColors } from "../../theme/colors";

const { PRIMARY, SECONDARY, TERTIARY, TEXT, DANGER, SUBTLE, SUCCESS } = variants;

export const dark: ButtonTheme = {
  [PRIMARY]: {
    background: "#f1bf00", // MAIN COLOR YELLOW
    backgroundActive: "linear-gradient(133deg, rgba(247,204,39,1) 0%, rgba(241,191,0,1) 78%)",	// space color, lightish gray,
    backgroundHover: "#f7d657", // more light tone of yellow
    border: "#f1bf00",
    borderColorHover: "currentColor",
    boxShadow: "inset 0px -1px 0px rgba(14, 14, 44, 0.4)",
    boxShadowActive: "inset 0px -1px 0px rgba(14, 14, 44, 0.4)",
    color: "#000000",
  },
  [SECONDARY]: {
    background: "#000000",
    backgroundActive: "transparent",
    backgroundHover: "rgba(255,255,255, 0.1)",
    border: "000000",
    borderColorHover: darkColors.primaryBright,
    boxShadow: "none",
    boxShadowActive: "none",
    color: "#fffdfa",
  },
  [TERTIARY]: {
    background: "#d9e2e9",	// space color, lightish gray,
    backgroundActive: "#d9e2e9",	// space color, lightish gray,
    backgroundHover: darkColors.tertiary,
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "none",
    boxShadowActive: "none",
    color: lightColors.primary,
  },
  [TEXT]: {
    background: "transparent",
    backgroundActive: "transparent",
    backgroundHover: "rgb(255,255,255,0.05)",
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "none",
    boxShadowActive: "none",
    color: lightColors.primary,
  },
  [DANGER]: {
    background: lightColors.failure,
    backgroundActive: "#D43285", // darkten 10%
    backgroundHover: "#FF65B8", // lighten 10%
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "none",
    boxShadowActive: "none",
    color: "#FFFFFF",
  },
  [SUBTLE]: {
    background: "#d9e2e9",	// space color, lightish gray
    backgroundActive:"#d9e2e9",	// space color, lightish gray
    backgroundHover: "#d9e2e9",	// space color, lightish gray
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "none",
    boxShadowActive: "none",
    color: "#FFFFFF",
  },
  [SUCCESS]: {
    background: lightColors.success,
    backgroundActive: `${lightColors.success}D9`, // 70% opacity
    backgroundHover: `${lightColors.success}B3`, // 85% opacity
    border: 0,
    borderColorHover: "currentColor",
    boxShadow: "none",
    boxShadowActive: "none",
    color: "#FFFFFF",
  },
};

export const light: ButtonTheme = {
  [PRIMARY]: {
    ...dark.primary,
  },
  [SECONDARY]: {
    ...dark.secondary,
  },
  [TERTIARY]: {
    ...dark.tertiary,
    background:"#d9e2e9",	// space color, lightish gray,,
    backgroundActive: "#d9e2e9",	// space color, lightish gray,,
    backgroundHover: darkColors.tertiary,
    color: "#d9e2e9",	// space color, lightish gray,,
  },
  [TEXT]: {
    ...dark.text,
    backgroundHover: darkColors.tertiary,
  },
  [DANGER]: {
    ...dark.danger,
  },
  [SUBTLE]: {
    ...dark.subtle,
  },
  [SUCCESS]: {
    ...dark.success,
  },
};
