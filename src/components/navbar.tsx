"use client";

import { useState } from "react";
import Link from "next/link";

import AuthModal from "./auth-modal";
import EnquiryModal from "./enquiry-modal";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("login");
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const openLogin = () => {
    setAuthView("login");
    setAuthOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-extrabold text-white">
              E
            </span>
            EttiExpo
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openLogin}
              className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="hidden rounded-lg border border-zinc-300 px-4 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 sm:inline-flex dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Enquiry
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialView={authView} />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
