"use client";

import { useMemo, useState } from "react";

import { exhibitors } from "@/data/mock-data";

export default function VisitorDirectory() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All");
  const [booked, setBooked] = useState<string[]>([]);

  const industries = useMemo(() => ["All", ...new Set(exhibitors.map((item) => item.industry))], []);

  const filteredExhibitors = exhibitors.filter((item) => {
    const matchesQuery = `${item.name} ${item.shortDescription}`.toLowerCase().includes(query.toLowerCase());
    const matchesIndustry = industry === "All" || item.industry === industry;
    return matchesQuery && matchesIndustry;
  });

  return (
    <section className="space-y-5">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
          Search exhibitors
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by company or keyword"
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </label>
        <label className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
          Industry filter
          <select
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-sky-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredExhibitors.map((item) => {
          const isBooked = booked.includes(item.id);
          return (
            <article key={item.id} className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{item.industry} · {item.location}</p>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{item.shortDescription}</p>
              <button
                type="button"
                onClick={() => setBooked((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]))}
                className={`mt-4 w-full rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  isBooked
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                    : "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                }`}
              >
                {isBooked ? "Meeting Requested" : "Book Meeting"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
