import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Muller = Geist({
  variable: "--font-muller",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Колусо фартуны",
  description: "Крути колесо, получай призы!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Muller.variable} ${Muller.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
