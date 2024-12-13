import type { Metadata } from "next";
import { Geist, Geist_Mono,  } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const Muller = localFont({ src: './MullerRegular.woff2' })
const MullerMedium = localFont({ src: './MullerMedium.woff2' })
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Muller.className} ${MullerMedium.className}`}
      >
        {children}
      </body>
    </html>
  );
}
