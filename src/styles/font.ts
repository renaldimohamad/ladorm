import { Montserrat, Poppins } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";

export const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const jakarta = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const fontVariables = `${montserrat.variable} ${jakarta.variable} ${poppins.variable}`;
