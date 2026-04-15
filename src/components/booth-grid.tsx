"use client";

import { useState } from "react";

import { booths } from "@/data/mock-data";

const firstAvailableBooth = booths.find((booth) => booth.status === "available")?.id ?? null;

export default function BoothGrid() {
  const [selectedBooth, setSelectedBooth] = useState<string | null>(firstAvailableBooth);

  return (
    <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Booth Selection</h2>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Selected: {selectedBooth ?? "None"}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {booths.map((booth) => {
          const isReserved = booth.status === "reserved";
          const isSelected = selectedBooth === booth.id;
          return (
            <button
              key={booth.id}
              type="button"
              onClick={() => !isReserved && setSelectedBooth(booth.id)}
              disabled={isReserved}
              className={`rounded-xl border p-3 text-left transition ${
                isReserved
                  ? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800"
                  : isSelected
                    ? "border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-sky-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              }`}
            >
              <p className="font-semibold">{booth.id}</p>
              <p className="text-xs">{booth.hall}</p>
              <p className="text-xs">{booth.size}</p>
              <p className="mt-1 text-xs font-medium">{booth.price}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
