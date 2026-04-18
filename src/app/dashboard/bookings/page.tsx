"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { mockExhibitorBookings, mockEvents } from "@/data/mock-data";
import type { BookingStatus } from "@/data/mock-data";

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  approved: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
  payment_pending: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
  cancelled: "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
};

const statusLabels: Record<BookingStatus, string> = {
  pending: "Pending Approval",
  approved: "Approved",
  confirmed: "Confirmed",
  rejected: "Rejected",
  payment_pending: "Payment Pending",
  cancelled: "Cancelled",
};

const boothStyleLabels = { bare_space: "Bare Space", shell_scheme: "Shell Scheme" };
const positionLabels = { corner: "Corner", middle: "Middle", island: "Island", end_cap: "End Cap" };

export default function BookingsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  const userBookings = mockExhibitorBookings.filter((b) => b.userId === user?.id);
  const filtered = filter === "all" ? userBookings : userBookings.filter((b) => b.status === filter);

  const counts = {
    all: userBookings.length,
    pending: userBookings.filter((b) => b.status === "pending").length,
    approved: userBookings.filter((b) => b.status === "approved").length,
    confirmed: userBookings.filter((b) => b.status === "confirmed").length,
  };

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">My Bookings</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Track your booth bookings and approval status
      </p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Bookings" value={counts.all} color="text-indigo-600 dark:text-indigo-400" />
        <StatCard label="Pending" value={counts.pending} color="text-amber-600 dark:text-amber-400" />
        <StatCard label="Approved" value={counts.approved} color="text-blue-600 dark:text-blue-400" />
        <StatCard label="Confirmed" value={counts.confirmed} color="text-emerald-600 dark:text-emerald-400" />
      </div>

      {/* Filter tabs */}
      <div className="mt-6 flex gap-2 overflow-x-auto">
        {(["all", "pending", "approved", "confirmed", "rejected"] as const).map((tab) => (
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
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings list */}
      <div className="mt-6 space-y-4">
        {filtered.map((booking) => {
          const event = mockEvents.find((e) => e.id === booking.eventId);
          return (
            <div key={booking.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                      {event?.title ?? "Unknown Event"}
                    </h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[booking.status]}`}>
                      {statusLabels[booking.status]}
                    </span>
                  </div>

                  {event && (
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {event.venue}, {event.city} · {new Date(event.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – {new Date(event.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                      </svg>
                      {boothStyleLabels[booking.boothStyle]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                      </svg>
                      {positionLabels[booking.boothPosition]}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {booking.sqMeters} m²
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {booking.hallPreference}
                    </span>
                  </div>

                  {booking.rejectedReason && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      Reason: {booking.rejectedReason}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{booking.totalPrice}</p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    Submitted {new Date(booking.submittedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  {booking.approvedDate && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Approved {new Date(booking.approvedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No bookings found.</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
