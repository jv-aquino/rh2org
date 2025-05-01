import type { Metadata } from "next";
import "./globals.css";


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
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
