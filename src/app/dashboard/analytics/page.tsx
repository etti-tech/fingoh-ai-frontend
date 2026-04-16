"use client";

import { mockEvents } from "@/data/mock-data";

const kpis = [
  { label: "Total Visitors", value: "54,500", change: "+12.3%", up: true },
  { label: "Total Exhibitors", value: "1,080", change: "+8.1%", up: true },
  { label: "Revenue", value: "$2.4M", change: "+22.5%", up: true },
  { label: "Avg. Satisfaction", value: "4.6/5", change: "-0.1", up: false },
];

const topEvents = mockEvents
  .filter((e) => e.status !== "draft")
  .sort((a, b) => b.visitors - a.visitors)
  .slice(0, 5);

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Analytics</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Cross-event performance overview
      </p>

      {/* KPI cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{k.label}</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">{k.value}</p>
            <span
              className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
                k.up
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              <svg
                className={`h-3 w-3 ${k.up ? "" : "rotate-180"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
              {k.change} vs last quarter
            </span>
          </div>
        ))}
      </div>

      {/* Top events table */}
      <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Top Events by Visitors</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
                <th className="px-5 py-3 font-medium text-zinc-500 dark:text-zinc-400">Event</th>
                <th className="px-5 py-3 font-medium text-zinc-500 dark:text-zinc-400">City</th>
                <th className="px-5 py-3 text-right font-medium text-zinc-500 dark:text-zinc-400">Exhibitors</th>
                <th className="px-5 py-3 text-right font-medium text-zinc-500 dark:text-zinc-400">Visitors</th>
                <th className="px-5 py-3 text-right font-medium text-zinc-500 dark:text-zinc-400">Booths</th>
              </tr>
            </thead>
            <tbody>
              {topEvents.map((evt) => (
                <tr key={evt.id} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                  <td className="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-50">{evt.title}</td>
                  <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">{evt.city}</td>
                  <td className="px-5 py-3 text-right text-zinc-700 dark:text-zinc-300">{evt.exhibitors}</td>
                  <td className="px-5 py-3 text-right font-semibold text-zinc-900 dark:text-zinc-50">{evt.visitors.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-zinc-700 dark:text-zinc-300">{evt.booths}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Placeholder chart area */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm text-zinc-400">Visitor trend chart — coming soon</p>
        </div>
        <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm text-zinc-400">Revenue breakdown chart — coming soon</p>
        </div>
      </div>
    </div>
  );
}
