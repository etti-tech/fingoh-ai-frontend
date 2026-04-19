"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ExhibitorBooking, BoothStyle, BoothPosition } from "@/data/mock-data";

interface BoothBookingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (booking: ExhibitorBooking) => void;
  eventId: string;
  userId: string;
}

const boothStyles: { value: BoothStyle; label: string; description: string }[] = [
  { value: "bare_space", label: "Bare Space", description: "Raw floor space — you bring your own stand, walls and fittings" },
  { value: "shell_scheme", label: "Shell Scheme", description: "Pre-built booth with walls, fascia, lighting and carpet included" },
];

const boothPositions: { value: BoothPosition; label: string; description: string }[] = [
  { value: "corner", label: "Corner", description: "Two open sides, high visibility from two aisles" },
  { value: "middle", label: "Middle", description: "One open side, cost-effective standard position" },
  { value: "island", label: "Island", description: "Four open sides, maximum foot traffic and visibility" },
  { value: "end_cap", label: "End Cap", description: "Three open sides at the end of a row" },
];

const halls = ["Hall 1", "Hall 2", "Hall 3", "Hall 4"];

const pricePerSqMeter: Record<BoothStyle, number> = {
  bare_space: 180,
  shell_scheme: 250,
};

const positionMultiplier: Record<BoothPosition, number> = {
  middle: 1.0,
  corner: 1.15,
  end_cap: 1.25,
  island: 1.4,
};

export default function BoothBookingModal({ open, onClose, onSubmit, eventId, userId }: BoothBookingModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    boothStyle: "shell_scheme" as BoothStyle,
    boothPosition: "middle" as BoothPosition,
    sqMeters: 12,
    hallPreference: "Hall 1",
    specialRequirements: "",
  });

  useEffect(() => {
    if (open) {
      setForm({ boothStyle: "shell_scheme", boothPosition: "middle", sqMeters: 12, hallPreference: "Hall 1", specialRequirements: "" });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => { if (e.target === backdropRef.current) onClose(); },
    [onClose],
  );

  const totalPrice = Math.round(form.sqMeters * pricePerSqMeter[form.boothStyle] * positionMultiplier[form.boothPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking: ExhibitorBooking = {
      id: `BK-${Date.now()}`,
      userId,
      eventId,
      boothStyle: form.boothStyle,
      boothPosition: form.boothPosition,
      sqMeters: form.sqMeters,
      hallPreference: form.hallPreference,
      specialRequirements: form.specialRequirements || undefined,
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
      totalPrice: `$${totalPrice.toLocaleString()}`,
    };
    onSubmit(booking);
  };

  if (!open) return null;

  return (
    <div ref={backdropRef} onClick={handleBackdropClick} className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-lg animate-fade-in rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Book a Booth</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Booth Style */}
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Booth Type</legend>
            <div className="grid grid-cols-2 gap-3">
              {boothStyles.map((s) => (
                <label
                  key={s.value}
                  className={`cursor-pointer rounded-xl border-2 p-3 transition ${
                    form.boothStyle === s.value
                      ? "border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-500/10"
                      : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="boothStyle"
                    value={s.value}
                    checked={form.boothStyle === s.value}
                    onChange={() => setForm((prev) => ({ ...prev, boothStyle: s.value }))}
                    className="sr-only"
                  />
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{s.label}</p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{s.description}</p>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Booth Position */}
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Booth Position</legend>
            <div className="grid grid-cols-2 gap-3">
              {boothPositions.map((p) => (
                <label
                  key={p.value}
                  className={`cursor-pointer rounded-xl border-2 p-3 transition ${
                    form.boothPosition === p.value
                      ? "border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-500/10"
                      : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="boothPosition"
                    value={p.value}
                    checked={form.boothPosition === p.value}
                    onChange={() => setForm((prev) => ({ ...prev, boothPosition: p.value }))}
                    className="sr-only"
                  />
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{p.label}</p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{p.description}</p>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Area & Hall */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sqMeters" className="mb-1 block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Area (sq m)
              </label>
              <input
                id="sqMeters"
                type="number"
                min={6}
                max={200}
                value={form.sqMeters}
                onChange={(e) => setForm((prev) => ({ ...prev, sqMeters: Math.max(6, Number(e.target.value)) }))}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
            <div>
              <label htmlFor="hall" className="mb-1 block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Hall Preference
              </label>
              <select
                id="hall"
                value={form.hallPreference}
                onChange={(e) => setForm((prev) => ({ ...prev, hallPreference: e.target.value }))}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
              >
                {halls.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <label htmlFor="specialRequirements" className="mb-1 block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Special Requirements <span className="font-normal text-zinc-400">(optional)</span>
            </label>
            <textarea
              id="specialRequirements"
              rows={3}
              value={form.specialRequirements}
              onChange={(e) => setForm((prev) => ({ ...prev, specialRequirements: e.target.value }))}
              placeholder="Power requirements, water access, hanging points..."
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>

          {/* Price summary */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                {form.sqMeters} m² × ${pricePerSqMeter[form.boothStyle]}/m²
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">${(form.sqMeters * pricePerSqMeter[form.boothStyle]).toLocaleString()}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">
                {boothPositions.find((p) => p.value === form.boothPosition)?.label} position ({Math.round((positionMultiplier[form.boothPosition] - 1) * 100)}% premium)
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">×{positionMultiplier[form.boothPosition]}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-zinc-200 pt-2 dark:border-zinc-700">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Estimated Total</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">${totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
