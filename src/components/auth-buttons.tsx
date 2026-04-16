"use client";

import { useState } from "react";
import AuthModal from "./auth-modal";
import EnquiryModal from "./enquiry-modal";

type AuthView = "login" | "signup";

interface AuthButtonsProps {
  variant: "hero" | "cta";
}

export default function AuthButtons({ variant }: AuthButtonsProps) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>("login");
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const openAuth = (view: AuthView) => {
    setAuthView(view);
    setAuthOpen(true);
  };

  if (variant === "hero") {
    return (
      <>
        <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => openAuth("login")}
            className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50 hover:shadow-xl dark:bg-zinc-100 dark:text-indigo-800 dark:hover:bg-white"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setEnquiryOpen(true)}
            className="inline-flex min-w-[180px] items-center justify-center rounded-xl border-2 border-white/60 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:border-white hover:bg-white/10 dark:border-white/40 dark:hover:border-white/70"
          >
            Enquiry
          </button>
        </div>
        <p className="relative mt-4 text-xs text-indigo-200 dark:text-indigo-300">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => openAuth("signup")}
            className="underline underline-offset-2 hover:text-white"
          >
            Create one for free
          </button>
        </p>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialView={authView} />
        <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      </>
    );
  }

  // CTA variant
  return (
    <>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={() => openAuth("login")}
          className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50 dark:bg-zinc-100 dark:text-indigo-800 dark:hover:bg-white"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setEnquiryOpen(true)}
          className="inline-flex min-w-[180px] items-center justify-center rounded-xl border-2 border-white/60 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10 dark:border-white/40 dark:hover:border-white/70"
        >
          Enquiry
        </button>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialView={authView} />
      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
