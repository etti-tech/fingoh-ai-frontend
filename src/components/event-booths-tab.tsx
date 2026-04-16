"use client";

import { useMemo, useState } from "react";
import type { EventBooth, BoothStatus } from "@/data/mock-data";

interface Props {
  booths: EventBooth[];
}

const statusStyle: Record<BoothStatus, { bg: string; border: string; text: string; label: string }> = {
  booked:          { bg: "bg-emerald-500 dark:bg-emerald-600", border: "border-emerald-600 dark:border-emerald-500", text: "text-white", label: "Booked" },
  approved:        { bg: "bg-blue-500 dark:bg-blue-600", border: "border-blue-600 dark:border-blue-500", text: "text-white", label: "Approved" },
  payment_pending: { bg: "bg-violet-500 dark:bg-violet-600", border: "border-violet-600 dark:border-violet-500", text: "text-white", label: "Payment" },
  pending:         { bg: "bg-amber-400 dark:bg-amber-500", border: "border-amber-500 dark:border-amber-400", text: "text-white", label: "Pending" },
  empty:           { bg: "bg-zinc-100 dark:bg-zinc-800", border: "border-zinc-200 dark:border-zinc-700", text: "text-zinc-400 dark:text-zinc-500", label: "Empty" },
};

export default function BoothsTab({ booths }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  // Group booths by hall
  const halls = useMemo(() => {
    const map = new Map<string, EventBooth[]>();
    for (const b of booths) {
      if (!map.has(b.hall)) map.set(b.hall, []);
      map.get(b.hall)!.push(b);
    }
    // Sort booth numbers within each hall
    for (const [, list] of map) {
      list.sort((a, b) => a.boothNumber.localeCompare(b.boothNumber));
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [booths]);

  // Summary counts
  const counts = useMemo(() => {
    const c = { total: booths.length, booked: 0, approved: 0, payment_pending: 0, pending: 0, empty: 0 };
    for (const b of booths) c[b.status]++;
    return c;
  }, [booths]);

  const selectedBooth = booths.find((b) => b.boothNumber === selected);

  return (
    <div>
      {/* Legend + summary */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-3">
          {(["booked", "approved", "payment_pending", "pending", "empty"] as BoothStatus[]).map((s) => {
            const style = statusStyle[s];
            return (
              <div key={s} className="flex items-center gap-1.5">
                <span className={`h-3.5 w-3.5 rounded-sm border ${style.bg} ${style.border}`} />
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {style.label}
                  <span className="ml-1 font-semibold text-zinc-700 dark:text-zinc-200">{counts[s]}</span>
                </span>
              </div>
            );
          })}
        </div>
        <span className="ml-auto text-xs text-zinc-400">
          {counts.total} booths total
        </span>
      </div>

      {/* Seat-map grid by hall */}
      <div className="mt-5 space-y-6">
        {halls.map(([hall, hallBooths]) => (
          <div key={hall}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Hall {hall}
            </p>
            <div className="flex flex-wrap gap-2">
              {hallBooths.map((b) => {
                const style = statusStyle[b.status];
                const isSelected = selected === b.boothNumber;
                return (
                  <button
                    key={b.boothNumber}
                    type="button"
                    onClick={() => setSelected(isSelected ? null : b.boothNumber)}
                    className={`relative flex h-14 w-16 flex-col items-center justify-center rounded-lg border-2 transition-all ${style.bg} ${style.border} ${style.text} ${
                      isSelected
                        ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-zinc-950"
                        : "hover:scale-105 hover:shadow-md"
                    }`}
                  >
                    <span className="text-xs font-bold leading-tight">{b.boothNumber}</span>
                    {b.orders > 0 && (
                      <span className="mt-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white/30 px-1 text-[10px] font-bold leading-none">
                        {b.orders}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected booth detail */}
      {selectedBooth && (
        <div className="mt-5 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-bold ${statusStyle[selectedBooth.status].bg} ${statusStyle[selectedBooth.status].border} ${statusStyle[selectedBooth.status].text}`}>
              {selectedBooth.boothNumber}
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Booth {selectedBooth.boothNumber}
              </p>
              <p className="text-xs text-zinc-400">
                Hall {selectedBooth.hall} · {selectedBooth.boothType}
              </p>
            </div>
            <span className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle[selectedBooth.status].bg} ${statusStyle[selectedBooth.status].text}`}>
              {statusStyle[selectedBooth.status].label}
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            {selectedBooth.orders === 0
              ? "No orders for this booth yet."
              : `${selectedBooth.orders} order${selectedBooth.orders !== 1 ? "s" : ""} placed for this booth.`}
          </p>
        </div>
      )}
    </div>
  );
}
