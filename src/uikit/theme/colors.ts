import { Colors } from "./types";
	
export const baseColors = {	
  failure: "#ED4B9E",	
  primary: "#afd1ed",	// ice color, light blue
  primaryBright: "#d9e2e9",	// space color, lightish gray
  primaryDark: "#d9e2e9",	
  secondary: "#d9e2e9",	// space color, lightish gray
  success: "#31D0AA",	
  warning: "#000000",	
};
	
export const brandColors = {	
  binance: "#F0B90B",	
};
	
export const lightColors: Colors = {	
  ...baseColors,	
  ...brandColors,	
  background: "#FAF9FA",	
  backgroundDisabled: "#E9EAEB",	
  contrast: "#191326",	
  invertedContrast: "#FFFFFF",	
  input: "rgb(0,0,0,1)",	
  modalBackground: "rgb(20,20,20,0.8)",	// almost solid black
  tertiary: "#EFF4F5",	
  text: "#1457a8",	
  textDisabled: "#BDC2C4",	
  textSubtle: "#63b6c7",	
  borderColor: "#E9EAEB",	
  card: "#FFFFFF",	
  gradients: {	
    bubblegum: "linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)",	
  },	
};
	
export const darkColors: Colors = {	
  ...baseColors,	
  ...brandColors,	
  secondary: "#afd1ed",	
  background: "#343135",	
  backgroundDisabled: "#3c3742",	
  contrast: "#FFFFFF",	
  invertedContrast: "#191326",	// blackish color
  input: "rgb(35, 35, 35, 1)",	// almost solid black
  modalBackground: "rgb(20,20,20,0.8)",	// almost solid black
  primaryDark: "#d9e2e9",	// space color, lightish gray
  tertiary: "#353547",	
  text: "#fffdfa",	
  textDisabled: "#666171",	
  textSubtle: "#d9e2e9",	// space color, lightish gray	
  borderColor: "#524B63",	
  card: "rgba( 10, 10, 10, 0.35 );",	
  gradients: {	
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",	
  },	
};
