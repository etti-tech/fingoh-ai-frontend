"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockEvents, mockEventExhibitors, mockEventVisitors, mockEventBooths } from "@/data/mock-data";
import type { EventExhibitor, EventVisitor, EventBooth } from "@/data/mock-data";
import ExhibitorsTab from "@/components/event-exhibitors-tab";
import VisitorsTab from "@/components/event-visitors-tab";
import BoothsTab from "@/components/event-booths-tab";

type Tab = "exhibitors" | "visitors" | "booths";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const event = mockEvents.find((e) => e.id === id);

  const [activeTab, setActiveTab] = useState<Tab>("exhibitors");
  const [exhibitors, setExhibitors] = useState<EventExhibitor[]>(
    mockEventExhibitors.filter((e) => e.eventId === id),
  );
  const [visitors, setVisitors] = useState<EventVisitor[]>(
    mockEventVisitors.filter((v) => v.eventId === id),
  );
  const eventBooths = mockEventBooths.filter((b) => b.eventId === id);

  if (!event) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Event not found.</p>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            &larr; Back to Events
          </button>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    live: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    completed: "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
    draft: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  };

  const statusDot: Record<string, string> = {
    upcoming: "bg-blue-500",
    live: "bg-emerald-500 animate-pulse",
    completed: "bg-zinc-400",
    draft: "bg-amber-500",
  };

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "exhibitors", label: "Exhibitors", count: exhibitors.length },
    { key: "visitors", label: "Visitors", count: visitors.length },
    { key: "booths", label: "Booths", count: eventBooths.length },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      {/* Back button */}
      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to Events
      </button>

      {/* Event header card */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className={`relative h-36 bg-gradient-to-br ${event.image}`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-4 left-5 right-5">
            <h1 className="text-xl font-bold text-white drop-shadow-sm sm:text-2xl">{event.title}</h1>
          </div>
          <span
            className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[event.status]}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusDot[event.status]}`} />
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 px-5 py-4">
          <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {event.venue}, {event.city}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            {new Date(event.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} –{" "}
            {new Date(event.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-zinc-400">
              <strong className="text-zinc-700 dark:text-zinc-200">{event.booths}</strong> booths
            </span>
            <span className="text-zinc-400">
              <strong className="text-zinc-700 dark:text-zinc-200">{exhibitors.length}</strong> exhibitors
            </span>
            <span className="text-zinc-400">
              <strong className="text-zinc-700 dark:text-zinc-200">{visitors.length}</strong> visitors
            </span>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="mt-6 flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-4 py-2.5 text-sm font-medium transition ${
              activeTab === tab.key
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {tab.label}
            <span
              className={`ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                activeTab === tab.key
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                  : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {tab.count}
            </span>
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-5">
        {activeTab === "exhibitors" && (
          <ExhibitorsTab exhibitors={exhibitors} onUpdate={setExhibitors} />
        )}
        {activeTab === "visitors" && (
          <VisitorsTab visitors={visitors} onUpdate={setVisitors} />
        )}
        {activeTab === "booths" && (
          <BoothsTab booths={eventBooths} />
        )}
      </div>
    </div>
  );
}
