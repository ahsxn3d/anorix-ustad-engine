import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Motion from "@/components/kit/Motion";
const serif = localFont({ src: [{ path: "../public/fonts/fraunces-latin-opsz-normal.woff2", style: "normal" }, { path: "../public/fonts/fraunces-latin-opsz-italic.woff2", style: "italic" }], variable: "--f-serif", weight: "100 900", display: "swap" });
const sans = localFont({ src: "../public/fonts/inter-latin-wght-normal.woff2", variable: "--f-sans", weight: "100 900", display: "swap" });
const mono = localFont({ src: "../public/fonts/jetbrains-mono-latin-wght-normal.woff2", variable: "--f-mono", weight: "100 800", display: "swap" });
export const metadata: Metadata = { title: "Ustad Engine — A patient teacher for every question", description: "An AI tutor that teaches the way good teachers do: asks before it tells, checks your working, and remembers what you found hard. A concept by Anorix.", openGraph: { title: "Ustad Engine — A patient teacher for every question", description: "An AI study platform by Anorix.", type: "website" } };
export const viewport: Viewport = { themeColor: "#f3ede1", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} /></head>
      <body><Motion />{children}</body>
    </html>
  );
}
