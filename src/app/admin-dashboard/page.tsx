import type { Metadata } from "next";

import { booths, organizerStats } from "@/data/mock-data";

export const metadata: Metadata = {
  title: "Organizer Dashboard",
  description: "Admin experience for event creation, booth allocation, and analytics overview.",
};

export default function AdminDashboardPage() {
  const availableBooths = booths.filter((booth) => booth.status === "available").length;
  const reservedBooths = booths.length - availableBooths;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Organizer Dashboard</h1>

      <section className="grid gap-4 md:grid-cols-3">
        {organizerStats.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
            <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-300">{stat.growth} vs last event</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Create Event</h2>
          <form className="mt-4 space-y-3">
            <input placeholder="Event Name" className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
            <input type="date" className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
            <input placeholder="Location" className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
            <button type="button" className="w-full rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
              Save Event (Demo)
            </button>
          </form>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Booth Allocation</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Available Booths</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{availableBooths}</p>
            </div>
            <div className="rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Reserved Booths</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{reservedBooths}</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
