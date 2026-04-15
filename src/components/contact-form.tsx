"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const successMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSubmitted) {
      successMessageRef.current?.focus();
    }
  }, [isSubmitted]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    // Placeholder for CRM integration endpoint.
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
          Name
          <input required name="name" className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
        </label>
        <label className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
          Email
          <input required type="email" name="email" className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
        </label>
      </div>
      <label className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
        Company
        <input required name="company" className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
      </label>
      <label className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
        Message
        <textarea required name="message" rows={5} className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
      </label>
      <button type="submit" className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300">
        Submit Request
      </button>
      {isSubmitted ? (
        <div ref={successMessageRef} tabIndex={-1} role="status" aria-live="polite" className="text-sm text-emerald-600 outline-none dark:text-emerald-300">
          Thanks! Demo request captured. CRM integration hook is ready for implementation.
        </div>
      ) : null}
    </form>
  );
}
