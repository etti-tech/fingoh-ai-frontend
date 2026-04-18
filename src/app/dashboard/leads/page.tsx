"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { mockExhibitorLeads, mockEvents } from "@/data/mock-data";

const scoreStyles: Record<string, string> = {
  Hot: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  Warm: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  Cold: "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
};

export default function LeadsPage() {
  const { user } = useAuth();
  const leads = mockExhibitorLeads.filter((l) => l.userId === user?.id);
  const [filter, setFilter] = useState<"all" | "Hot" | "Warm" | "Cold">("all");

  const filtered = filter === "all" ? leads : leads.filter((l) => l.score === filter);

  const stats = [
    { label: "Total Leads", value: leads.length, color: "text-indigo-600 dark:text-indigo-400" },
    { label: "Hot", value: leads.filter((l) => l.score === "Hot").length, color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Warm", value: leads.filter((l) => l.score === "Warm").length, color: "text-amber-600 dark:text-amber-400" },
    { label: "Cold", value: leads.filter((l) => l.score === "Cold").length, color: "text-zinc-500" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Leads</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Visitor leads captured across your exhibition booths
      </p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="mt-6 flex gap-2">
        {(["all", "Hot", "Warm", "Cold"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition ${
              filter === tab
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Leads table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50 text-left text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300">
              <tr>
                <th className="px-4 py-3">Visitor</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Interest</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => {
                const event = mockEvents.find((e) => e.id === l.eventId);
                return (
                  <tr key={l.id} className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="px-4 py-3">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">{l.visitorName}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{l.visitorEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{l.visitorCompany}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{event?.title ?? "—"}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{l.interest}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${scoreStyles[l.score]}`}>{l.score}</span>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                      {new Date(l.capturedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No leads found.</p>
        </div>
      )}
    </div>
  );
}
