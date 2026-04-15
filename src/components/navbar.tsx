import Link from "next/link";

import { navLinks } from "@/data/mock-data";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          ExpoFlow
        </Link>
        <nav className="hidden gap-5 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
