import localFont from "next/font/local";
import { Nunito } from "next/font/google";

export const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const sansation = localFont({
  variable: "--font-sansation",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Sansation/Sansation-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Sansation/Sansation-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Sansation/Sansation-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Sansation/Sansation-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Sansation/Sansation-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Sansation/Sansation-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});