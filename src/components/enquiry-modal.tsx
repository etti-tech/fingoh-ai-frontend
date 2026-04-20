"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ open, onClose }: EnquiryModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === backdropRef.current) onClose();
    },
    [onClose],
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry"
    >
      <div className="relative mx-4 w-full max-w-md animate-fade-in rounded-2xl border border-zinc-200 bg-white p-8 text-left shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          aria-label="Close"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-extrabold text-white">
            F
          </span>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Fingoh</span>
        </div>

        <h2 className="mt-6 text-center text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Get in touch
        </h2>
        <p className="mt-1 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Tell us about your trade fair goals and we&apos;ll get back to you.
        </p>

        {isSubmitted ? (
          <div className="mt-8 rounded-xl bg-emerald-50 p-6 text-center dark:bg-emerald-950/30">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
              <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <p className="mt-3 text-sm font-semibold text-emerald-800 dark:text-emerald-300">Enquiry submitted!</p>
            <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
              We&apos;ll be in touch within 24 hours.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="enquiry-name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Name
                </label>
                <input
                  id="enquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Jane Doe"
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
                />
              </div>
              <div>
                <label htmlFor="enquiry-email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="enquiry-company" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Company
              </label>
              <input
                id="enquiry-company"
                name="company"
                type="text"
                autoComplete="organization"
                required
                placeholder="Acme Corp"
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
              />
            </div>

            <div>
              <label htmlFor="enquiry-phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Phone <span className="text-zinc-400 dark:text-zinc-500">(optional)</span>
              </label>
              <input
                id="enquiry-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 (555) 000-0000"
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
              />
            </div>

            <div>
              <label htmlFor="enquiry-message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Message
              </label>
              <textarea
                id="enquiry-message"
                name="message"
                rows={3}
                required
                placeholder="Tell us about your upcoming trade fair..."
                className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
