"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MockEvent } from "@/data/mock-data";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: MockEvent) => void;
  event?: MockEvent | null; // null = create mode
}

const gradients = [
  "from-indigo-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-fuchsia-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-lime-500 to-green-600",
];

const statuses: MockEvent["status"][] = ["draft", "upcoming", "live", "completed"];

export default function EventModal({ open, onClose, onSave, event }: EventModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const isEdit = !!event;

  const [form, setForm] = useState({
    title: "",
    description: "",
    venue: "",
    city: "",
    startDate: "",
    endDate: "",
    status: "draft" as MockEvent["status"],
    booths: 0,
  });

  useEffect(() => {
    if (open && event) {
      setForm({
        title: event.title,
        description: event.description,
        venue: event.venue,
        city: event.city,
        startDate: event.startDate,
        endDate: event.endDate,
        status: event.status,
        booths: event.booths,
      });
    } else if (open) {
      setForm({ title: "", description: "", venue: "", city: "", startDate: "", endDate: "", status: "draft", booths: 0 });
    }
  }, [open, event]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saved: MockEvent = {
      id: event?.id ?? `EVT-${Date.now()}`,
      ...form,
      exhibitors: event?.exhibitors ?? 0,
      visitors: event?.visitors ?? 0,
      image: event?.image ?? gradients[Math.floor(Math.random() * gradients.length)],
    };
    onSave(saved);
  };

  if (!open) return null;

  const inputCls =
    "mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20";

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative mx-4 w-full max-w-lg animate-fade-in rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {isEdit ? "Edit Event" : "Create New Event"}
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {isEdit ? "Update the trade fair details below." : "Fill in the details for your new trade fair."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Event Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. FutureTech Expo 2025"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Description</label>
            <textarea
              required
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description of the trade fair…"
              className={inputCls + " resize-none"}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Venue</label>
              <input
                required
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                placeholder="Convention Centre"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">City</label>
              <input
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Berlin"
                className={inputCls}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Start Date</label>
              <input
                required
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">End Date</label>
              <input
                required
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className={inputCls}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as MockEvent["status"] })}
                className={inputCls}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Total Booths</label>
              <input
                type="number"
                min={0}
                value={form.booths}
                onChange={(e) => setForm({ ...form, booths: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              {isEdit ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
