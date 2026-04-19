"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { mockFloorMaps, mockVisitorRegistrations } from "@/data/mock-data";
import type { FloorMapOverview, FloorMapHall } from "@/data/mock-data";

export default function FloorMapPage() {
  const { user } = useAuth();
  const registrations = mockVisitorRegistrations.filter((r) => r.userId === user?.id);
  const registeredEventIds = new Set(registrations.map((r) => r.eventId));

  // Floor maps for events the visitor is registered for
  const availableMaps = mockFloorMaps.filter((m) => registeredEventIds.has(m.eventId));
  // Also include other events for browsing
  const otherMaps = mockFloorMaps.filter((m) => !registeredEventIds.has(m.eventId));
  const allMaps = [...availableMaps, ...otherMaps];

  const [selectedEvent, setSelectedEvent] = useState<FloorMapOverview | null>(allMaps[0] ?? null);
  const [selectedHall, setSelectedHall] = useState<FloorMapHall | null>(null);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Floor Map</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          View the event floor plan and find exhibitor locations
        </p>
      </div>

      {/* Event selector */}
      <div className="mt-6 flex flex-wrap gap-2">
        {allMaps.map((m) => (
          <button
            key={m.eventId}
            type="button"
            onClick={() => { setSelectedEvent(m); setSelectedHall(null); }}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition ${
              selectedEvent?.eventId === m.eventId
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {m.eventTitle}
            {registeredEventIds.has(m.eventId) && (
              <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            )}
          </button>
        ))}
      </div>

      {!selectedEvent && (
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No floor maps available. Register for an event to explore the floor plan.</p>
        </div>
      )}

      {selectedEvent && !selectedHall && (
        <>
          {/* Overall floor map */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {selectedEvent.eventTitle} — Overview
            </h2>

            {/* Overview map image or placeholder */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              {selectedEvent.overviewImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedEvent.overviewImage}
                  alt={`${selectedEvent.eventTitle} floor plan overview`}
                  className="h-auto w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                    <svg className="h-8 w-8 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-zinc-700 dark:text-zinc-200">
                    Floor Plan Coming Soon
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
                    The organiser will upload the overall floor plan closer to the event. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Hall cards */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Halls ({selectedEvent.halls.length})
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedEvent.halls.map((hall) => (
                <button
                  key={hall.id}
                  type="button"
                  onClick={() => setSelectedHall(hall)}
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 text-left transition hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                      {hall.hallName}
                    </span>
                    <svg className="h-4 w-4 text-zinc-400 transition group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {hall.hallLabel}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {hall.exhibitors.length} exhibitor{hall.exhibitors.length !== 1 ? "s" : ""}
                  </p>
                  {/* Mini exhibitor avatars */}
                  <div className="mt-3 flex -space-x-2">
                    {hall.exhibitors.slice(0, 5).map((ex) => (
                      <span
                        key={ex.boothNumber}
                        className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${ex.logo} text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-900`}
                        title={ex.company}
                      >
                        {ex.company.charAt(0)}
                      </span>
                    ))}
                    {hall.exhibitors.length > 5 && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-bold text-zinc-600 ring-2 ring-white dark:bg-zinc-700 dark:text-zinc-300 dark:ring-zinc-900">
                        +{hall.exhibitors.length - 5}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Hall detail view */}
      {selectedEvent && selectedHall && (
        <div className="mt-6">
          {/* Back button */}
          <button
            type="button"
            onClick={() => setSelectedHall(null)}
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to Overview
          </button>

          <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {selectedHall.hallLabel}
          </h2>

          {/* Hall map image or placeholder */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {selectedHall.mapImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedHall.mapImage}
                alt={`${selectedHall.hallLabel} floor plan`}
                className="h-auto w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                  <svg className="h-7 w-7 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Hall Map Coming Soon
                </h3>
                <p className="mt-1 max-w-xs text-xs text-zinc-500 dark:text-zinc-400">
                  The organiser will upload the detailed hall layout before the event.
                </p>
              </div>
            )}
          </div>

          {/* Exhibitor list for this hall */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              Exhibitors in {selectedHall.hallLabel}
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedHall.exhibitors.map((ex) => (
                <div
                  key={ex.boothNumber}
                  className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  {/* Company logo placeholder */}
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${ex.logo} text-sm font-bold text-white shadow-sm`}>
                    {ex.company.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      {ex.company}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Booth {ex.boothNumber} · {ex.industry}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {selectedHall.exhibitors.length === 0 && (
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                No exhibitors assigned to this hall yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
