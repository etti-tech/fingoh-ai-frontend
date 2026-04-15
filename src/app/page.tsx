import Link from "next/link";
import type { Metadata } from "next";

import { features, testimonials } from "@/data/mock-data";

export const metadata: Metadata = {
  title: "B2B Exhibitions Platform",
  description: "Showcase booth booking, lead capture, networking, and analytics in one modern exhibition experience.",
};

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-8 shadow-sm dark:from-zinc-900 dark:via-zinc-950 dark:to-sky-950/40 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">B2B Exhibition Intelligence</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Run high-performing exhibitions with one unified digital platform.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
          ExpoFlow helps organizers, exhibitors, and visitors collaborate through booth booking, lead capture, networking, and actionable analytics.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300">
            Request Demo
          </Link>
          <Link href="/login" className="rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900">
            Explore Dashboards
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Core Features</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{feature.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">What clients say</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-700 dark:text-zinc-200">“{item.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.role}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
