import type { Metadata } from "next";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://expoflow.demo"),
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
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
