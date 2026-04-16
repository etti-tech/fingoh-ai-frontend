"use client";

import { useState } from "react";
import type { EventExhibitor, ExhibitorStatus } from "@/data/mock-data";

interface Props {
  exhibitors: EventExhibitor[];
  onUpdate: (updated: EventExhibitor[]) => void;
}

const statusConfig: Record<ExhibitorStatus, { label: string; cls: string; dot: string }> = {
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300", dot: "bg-amber-500" },
  approved: { label: "Approved", cls: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300", dot: "bg-blue-500" },
  payment_pending: { label: "Payment Pending", cls: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300", dot: "bg-violet-500" },
  activated: { label: "Activated", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300", dot: "bg-emerald-500" },
  ignored: { label: "Ignored", cls: "bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400", dot: "bg-zinc-400" },
};

const filterTabs: { key: ExhibitorStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "payment_pending", label: "Payment Pending" },
  { key: "activated", label: "Activated" },
  { key: "ignored", label: "Ignored" },
];

export default function ExhibitorsTab({ exhibitors, onUpdate }: Props) {
  const [filter, setFilter] = useState<ExhibitorStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = exhibitors
    .filter((e) => filter === "all" || e.status === filter)
    .filter((e) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
      );
    });

  const updateStatus = (id: string, status: ExhibitorStatus, extra?: Partial<EventExhibitor>) => {
    onUpdate(
      exhibitors.map((ex) =>
        ex.id === id ? { ...ex, status, ...extra } : ex,
      ),
    );
  };

  const handleApprove = (ex: EventExhibitor) => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 14);
    updateStatus(ex.id, "approved", {
      paymentDeadline: deadline.toISOString().split("T")[0],
    });
  };

  const handleIgnore = (id: string) => {
    updateStatus(id, "ignored");
  };

  const handleMarkPaid = (ex: EventExhibitor) => {
    updateStatus(ex.id, "activated", {
      paidDate: new Date().toISOString().split("T")[0],
    });
  };

  const counts = {
    all: exhibitors.length,
    pending: exhibitors.filter((e) => e.status === "pending").length,
    approved: exhibitors.filter((e) => e.status === "approved").length,
    payment_pending: exhibitors.filter((e) => e.status === "payment_pending").length,
    activated: exhibitors.filter((e) => e.status === "activated").length,
    ignored: exhibitors.filter((e) => e.status === "ignored").length,
  };

  return (
    <div>
      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        {filterTabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setFilter(t.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              filter === t.key
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {t.label}
            <span className="ml-1.5 text-xs opacity-70">({counts[t.key]})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mt-4">
        <div className="relative">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company or email…"
            className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 sm:max-w-sm"
          />
        </div>
      </div>

      {/* Exhibitor list */}
      <div className="mt-4 space-y-3">
        {filtered.map((ex) => {
          const cfg = statusConfig[ex.status];
          return (
            <div
              key={ex.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Left info */}
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {ex.avatar}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{ex.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{ex.company} · {ex.industry}</p>
                    <p className="mt-0.5 text-xs text-zinc-400">{ex.email} · {ex.phone}</p>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.cls}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </span>
                  <span className="rounded-lg bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    Booth {ex.boothNumber}
                  </span>
                </div>
              </div>

              {/* Contextual info & actions */}
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                <span className="text-xs text-zinc-400">
                  Applied {new Date(ex.appliedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>

                {ex.paymentDeadline && ex.status !== "activated" && (
                  <span className="text-xs text-orange-600 dark:text-orange-400">
                    · Pay by {new Date(ex.paymentDeadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                )}

                {ex.paidDate && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">
                    · Paid {new Date(ex.paidDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                )}

                <div className="ml-auto flex gap-2">
                  {ex.status === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleApprove(ex)}
                        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => handleIgnore(ex.id)}
                        className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        Ignore
                      </button>
                    </>
                  )}

                  {(ex.status === "approved" || ex.status === "payment_pending") && (
                    <button
                      type="button"
                      onClick={() => handleMarkPaid(ex)}
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Mark as Paid
                    </button>
                  )}

                  {ex.status === "activated" && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Active
                    </span>
                  )}

                  {ex.status === "ignored" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(ex.id, "pending")}
                      className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Reconsider
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm text-zinc-400">No exhibitors found.</div>
        )}
      </div>
    </div>
  );
}
