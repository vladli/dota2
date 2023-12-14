import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const hypatia_font = localFont({
  src: [
    {
      path: "/fonts/hypatia/HypatiaSansPro-Regular.otf",
      weight: "400",
    },
    {
      path: "/fonts/hypatia/HypatiaSansPro-Semibold.otf",
      weight: "600",
    },
    {
      path: "/fonts/hypatia/HypatiaSansPro-Bold.otf",
      weight: "700",
    },
  ],
});

export const albertus_font = localFont({
  src: "./fonts/AlbertusMT.otf",
});
