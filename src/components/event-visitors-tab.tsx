"use client";

import { useState } from "react";
import type { EventVisitor } from "@/data/mock-data";

interface Props {
  visitors: EventVisitor[];
  onUpdate: (updated: EventVisitor[]) => void;
}

export default function VisitorsTab({ visitors, onUpdate }: Props) {
  const [search, setSearch] = useState("");
  const [filterBadge, setFilterBadge] = useState<"all" | "sent" | "not_sent">("all");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "inactive">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkSending, setBulkSending] = useState(false);

  const filtered = visitors
    .filter((v) => {
      if (filterBadge === "sent" && v.badgeStatus !== "sent") return false;
      if (filterBadge === "not_sent" && v.badgeStatus !== "not_sent") return false;
      if (filterActive === "active" && !v.active) return false;
      if (filterActive === "inactive" && v.active) return false;
      return true;
    })
    .filter((v) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        v.name.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        v.phone.includes(q) ||
        v.company.toLowerCase().includes(q)
      );
    });

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((v) => v.id)));
    }
  };

  const sendBadge = (ids: string[]) => {
    const now = new Date().toISOString().split("T")[0];
    onUpdate(
      visitors.map((v) =>
        ids.includes(v.id) ? { ...v, badgeStatus: "sent" as const, badgeSentDate: now } : v,
      ),
    );
    setSelected(new Set());
  };

  const handleBulkSend = () => {
    const ids = Array.from(selected).filter((id) => {
      const v = visitors.find((vis) => vis.id === id);
      return v && v.active;
    });
    if (ids.length === 0) return;
    setBulkSending(true);
    // Simulate async send
    setTimeout(() => {
      sendBadge(ids);
      setBulkSending(false);
    }, 600);
  };

  const toggleActive = (id: string) => {
    onUpdate(
      visitors.map((v) => (v.id === id ? { ...v, active: !v.active } : v)),
    );
  };

  const counts = {
    total: visitors.length,
    active: visitors.filter((v) => v.active).length,
    badgeSent: visitors.filter((v) => v.badgeStatus === "sent").length,
  };

  const selectedActiveCount = Array.from(selected).filter((id) => {
    const v = visitors.find((vis) => vis.id === id);
    return v && v.active;
  }).length;

  return (
    <div>
      {/* Summary stats */}
      <div className="flex flex-wrap gap-3">
        <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Total</span>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{counts.total}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Active</span>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{counts.active}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Badges Sent</span>
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{counts.badgeSent}</p>
        </div>
      </div>

      {/* Search & filters */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone or company…"
            className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value as typeof filterActive)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={filterBadge}
            onChange={(e) => setFilterBadge(e.target.value as typeof filterBadge)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
          >
            <option value="all">All Badges</option>
            <option value="sent">Badge Sent</option>
            <option value="not_sent">Not Sent</option>
          </select>
        </div>
      </div>

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2.5 dark:border-indigo-500/30 dark:bg-indigo-500/10">
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            {selected.size} selected
          </span>
          <button
            type="button"
            onClick={handleBulkSend}
            disabled={bulkSending || selectedActiveCount === 0}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {bulkSending ? "Sending…" : `Send e-Badges (${selectedActiveCount} active)`}
          </button>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
          >
            Clear
          </button>
        </div>
      )}

      {/* Visitor table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selected.size === filtered.length}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-600"
                  />
                </th>
                <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Visitor</th>
                <th className="hidden px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400 sm:table-cell">Contact</th>
                <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Status</th>
                <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Badge</th>
                <th className="px-4 py-3 text-right font-medium text-zinc-500 dark:text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(v.id)}
                      onChange={() => toggleSelect(v.id)}
                      className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-600"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                        {v.avatar}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">{v.name}</p>
                        <p className="truncate text-xs text-zinc-400">{v.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <p className="text-xs text-zinc-600 dark:text-zinc-300">{v.email}</p>
                    <p className="text-xs text-zinc-400">{v.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(v.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition ${
                        v.active
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                          : "bg-zinc-100 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${v.active ? "bg-emerald-500" : "bg-zinc-400"}`} />
                      {v.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {v.badgeStatus === "sent" ? (
                      <div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          Sent
                        </span>
                        {v.badgeSentDate && (
                          <p className="text-xs text-zinc-400">
                            {new Date(v.badgeSentDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400">Not sent</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      {v.active && v.badgeStatus !== "sent" && (
                        <button
                          type="button"
                          onClick={() => sendBadge([v.id])}
                          className="rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-indigo-700"
                        >
                          Send Badge
                        </button>
                      )}
                      {v.badgeStatus === "sent" && (
                        <button
                          type="button"
                          onClick={() => sendBadge([v.id])}
                          className="rounded-lg border border-indigo-300 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                        >
                          Resend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm text-zinc-400">No visitors found.</div>
        )}
      </div>
    </div>
  );
}
