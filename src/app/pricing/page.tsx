import type { Metadata } from "next";

import { pricingTiers } from "@/data/mock-data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent SaaS pricing tiers for B2B exhibition management.",
};

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Simple pricing for every event stage</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">Pick the plan that matches your exhibition scale and workflow complexity.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <article
            key={tier.name}
            className={`rounded-2xl border p-6 ${
              tier.popular
                ? "border-sky-500 bg-sky-50 dark:bg-sky-900/30"
                : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            }`}
          >
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{tier.name}</p>
            <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{tier.price}<span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{tier.price === "Custom" ? "" : "/mo"}</span></p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{tier.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
              {tier.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
