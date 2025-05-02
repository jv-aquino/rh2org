import "./globals.css";
import type { Metadata } from "next";
import ThemeProvider from "@/components/common/ThemeProvider";
import { nunito, sansation } from "./fonts";

export const metadata: Metadata = {
  title: "RH²Orgânico",
  description: "Plataforma completa para gestão de recursos humanos, cultura organizacional e desenvolvimento de pessoas. Meça OKRs, organize seu time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ThemeProvider
        className={`${sansation.variable} ${nunito.variable} antialiased`}
      >
        {children}
      </ThemeProvider>
    </html>
  );
}
