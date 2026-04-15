import type { Metadata } from "next";
import Script from "next/script";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "./globals.css";

const themeInitScript = `(() => {
  try {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldUseDark);
  } catch {}
})();`;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://expoflow-demo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ExpoFlow | B2B Exhibitions Platform Demo",
    template: "%s | ExpoFlow",
  },
  description: "Modern B2B exhibitions web app demo for organizers, exhibitors, and visitors.",
  keywords: ["B2B exhibitions", "event technology", "booth booking", "lead capture", "expo SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
