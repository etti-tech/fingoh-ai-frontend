import Image from "next/image";
import Link from "next/link";

import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Fingoh home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Fingoh"
            width={160}
            height={44}
            priority
            className="h-10 w-auto dark:hidden"
          />
          <Image
            src="/logo-white.png"
            alt="Fingoh"
            width={160}
            height={44}
            priority
            className="hidden h-10 w-auto dark:block"
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Login
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
