import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        {/* Top row – branding + links */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-extrabold text-white">
              F
            </span>
            Fingoh
          </Link>

          <nav className="flex flex-wrap gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/about" className="transition hover:text-zinc-900 dark:hover:text-white">
              About Us
            </Link>
            <Link href="/terms" className="transition hover:text-zinc-900 dark:hover:text-white">
              Terms of Service
            </Link>
            <Link href="/privacy" className="transition hover:text-zinc-900 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition hover:text-zinc-900 dark:hover:text-white">
              Contact
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <hr className="border-zinc-200 dark:border-zinc-800" />

        {/* Bottom row – copyright */}
        <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} Fingoh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
