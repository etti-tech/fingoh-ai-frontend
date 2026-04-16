import Link from "next/link";
import type { Metadata } from "next";

import { features, heroStats, roleFeatures, testimonials } from "@/data/mock-data";
import { CheckIcon, roleIconMap } from "@/components/icons";
import AuthButtons from "@/components/auth-buttons";

export const metadata: Metadata = {
  title: "EttiExpo \u2014 B2B Trade Fair & Exhibition Platform",
  description:
    "EttiExpo is a trade fair organiser platform where exhibitors, visitors, sponsors and vendors collaborate to run world-class B2B exhibitions and trade fairs.",
};

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-sky-500 px-6 py-20 text-center text-white shadow-2xl dark:from-indigo-800 dark:via-purple-900 dark:to-sky-800 sm:px-12 sm:py-28">
        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/10" />

        <p className="relative text-sm font-semibold uppercase tracking-widest text-indigo-200 dark:text-indigo-300">
          Your Trade Fair Partner
        </p>
        <h1 className="relative mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          One Platform. Every Stakeholder. World-Class Trade Fairs.
        </h1>
        <p className="relative mx-auto mt-6 max-w-2xl text-lg text-indigo-100 dark:text-indigo-200 sm:text-xl">
          EttiExpo is a B2B trade fair organiser platform that brings exhibitors,
          visitors, sponsors and vendors together &mdash; from fair creation to
          QR check-in, booth booking to sponsor payments.
        </p>

        <AuthButtons variant="hero" />
      </section>

      {/* Stats bar */}
      <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Role-based value props */}
      <section>
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Built for Every Trade Fair Role
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          One login. Five powerful experiences.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roleFeatures.map((rf) => (
            <article
              key={rf.role}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              {(() => {
                const Icon = roleIconMap[rf.role];
                return Icon ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                    <Icon className="h-5 w-5" />
                  </div>
                ) : null;
              })()}
              <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">{rf.role}</h3>
              <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">{rf.tagline}</p>
              <ul className="mt-4 space-y-2">
                {rf.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-indigo-500/5 transition-transform group-hover:scale-150 dark:bg-indigo-400/5" />
            </article>
          ))}
        </div>
      </section>

      {/* Platform features */}
      <section className="rounded-3xl bg-zinc-100 px-6 py-16 dark:bg-zinc-900/60 sm:px-12">
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Platform Highlights
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Everything you need, nothing you don&apos;t.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white text-lg font-bold shadow">
                {f.title.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{f.title}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Trusted by Industry Leaders
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Hear from our community.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{t.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 text-center text-white shadow-xl dark:from-indigo-800 dark:to-purple-900 sm:px-12">
        <h2 className="text-3xl font-bold sm:text-4xl">Ready to elevate your next trade fair?</h2>
        <p className="mx-auto mt-4 max-w-xl text-indigo-100 dark:text-indigo-200">
          Get started in minutes &mdash; no credit card required. See how EttiExpo
          can transform your trade fairs and exhibitions.
        </p>
        <AuthButtons variant="cta" />
      </section>
    </div>
  );
}
