"use client";

import { useState } from "react";

type EnquiryStatus = "new" | "replied" | "closed";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
  status: EnquiryStatus;
}

const mockEnquiries: Enquiry[] = [
  { id: "ENQ-001", name: "Liam Chen", email: "liam@nexagen.io", company: "NexaGen", message: "We'd like to book 10 booths for FutureTech Expo. Can you share sponsorship packages?", date: "2025-07-10", status: "new" },
  { id: "ENQ-002", name: "Sara Okonkwo", email: "sara@greenpath.co", company: "GreenPath", message: "Interested in exhibiting at GreenBuild Summit. What are the booth sizes available?", date: "2025-07-08", status: "replied" },
  { id: "ENQ-003", name: "Marcus Holt", email: "marcus@tradecore.de", company: "TradeCore GmbH", message: "Can we partner as a logistics vendor for AutoDrive World?", date: "2025-07-05", status: "replied" },
  { id: "ENQ-004", name: "Ana Petrov", email: "ana@biosynth.sg", company: "BioSynth", message: "Looking for sponsorship opportunities at HealthTech Connect. Please send the prospectus.", date: "2025-07-12", status: "new" },
  { id: "ENQ-005", name: "Farid Shah", email: "farid@swiftpack.com", company: "SwiftPack", message: "We exhibited last year and want to renew for PackLogix International. Same booth location please.", date: "2025-06-28", status: "closed" },
];

const statusStyle: Record<EnquiryStatus, string> = {
  new: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  replied: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  closed: "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState(mockEnquiries);
  const [expanded, setExpanded] = useState<string | null>(null);

  const updateStatus = (id: string, status: EnquiryStatus) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const counts = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    replied: enquiries.filter((e) => e.status === "replied").length,
  };

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Enquiries</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Incoming enquiries from the website
      </p>

      {/* Summary */}
      <div className="mt-6 flex gap-4">
        <div className="rounded-xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Total</p>
          <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{counts.all}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">New</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{counts.new}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Replied</p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{counts.replied}</p>
        </div>
      </div>

      {/* Enquiry list */}
      <div className="mt-6 space-y-3">
        {enquiries.map((enq) => (
          <div
            key={enq.id}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
          >
            <button
              type="button"
              onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                    {enq.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">{enq.name}</p>
                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{enq.company} · {enq.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle[enq.status]}`}>
                  {enq.status.charAt(0).toUpperCase() + enq.status.slice(1)}
                </span>
                <span className="text-xs text-zinc-400">{new Date(enq.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                <svg className={`h-4 w-4 text-zinc-400 transition-transform ${expanded === enq.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </button>
            {expanded === enq.id && (
              <div className="border-t border-zinc-100 px-5 py-4 dark:border-zinc-800">
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{enq.message}</p>
                <div className="mt-4 flex gap-2">
                  {enq.status !== "replied" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(enq.id, "replied")}
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                    >
                      Mark as Replied
                    </button>
                  )}
                  {enq.status !== "closed" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(enq.id, "closed")}
                      className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
