"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { mockEvents, mockEventExhibitors, mockEventVisitors, mockEventBooths, mockExhibitorBookings, mockExhibitorProducts, mockExhibitorSponsors, mockExhibitorLeads } from "@/data/mock-data";
import type { EventExhibitor, EventVisitor, ExhibitorProduct, ExhibitorSponsor, ExhibitorLead } from "@/data/mock-data";
import ExhibitorsTab from "@/components/event-exhibitors-tab";
import VisitorsTab from "@/components/event-visitors-tab";
import BoothsTab from "@/components/event-booths-tab";

export default function EventDetailPage() {
  const { user } = useAuth();
  if (user?.role === "exhibitor") return <ExhibitorEventDetail />;
  return <OrganiserEventDetail />;
}

/* ─── Exhibitor Event Detail ─── */

type ExhibitorTab = "overview" | "products" | "sponsors" | "leads";

function ExhibitorEventDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const event = mockEvents.find((e) => e.id === id);
  const booking = mockExhibitorBookings.find((b) => b.eventId === id && b.userId === user?.id);

  const [activeTab, setActiveTab] = useState<ExhibitorTab>("overview");
  const [products, setProducts] = useState<ExhibitorProduct[]>(
    mockExhibitorProducts.filter((p) => p.eventId === id && p.userId === user?.id),
  );
  const [sponsors] = useState<ExhibitorSponsor[]>(
    mockExhibitorSponsors.filter((s) => s.eventId === id && s.userId === user?.id),
  );
  const [leads] = useState<ExhibitorLead[]>(
    mockExhibitorLeads.filter((l) => l.eventId === id && l.userId === user?.id),
  );

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", description: "" });

  if (!event) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Event not found.</p>
          <button type="button" onClick={() => router.push("/dashboard")} className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
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

  const tabs: { key: ExhibitorTab; label: string; count?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "products", label: "Products", count: products.length },
    { key: "sponsors", label: "Sponsors", count: sponsors.length },
    { key: "leads", label: "Leads", count: leads.length },
  ];

  const gradients = ["from-indigo-500 to-purple-600", "from-emerald-500 to-teal-600", "from-orange-500 to-red-600", "from-cyan-500 to-blue-600", "from-violet-500 to-fuchsia-600"];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: ExhibitorProduct = {
      id: `PRD-${Date.now()}`,
      userId: user?.id ?? "",
      eventId: id,
      name: newProduct.name,
      category: newProduct.category,
      description: newProduct.description,
      image: gradients[Math.floor(Math.random() * gradients.length)],
    };
    setProducts((prev) => [product, ...prev]);
    setNewProduct({ name: "", category: "", description: "" });
    setShowAddProduct(false);
  };

  const tierColors: Record<string, string> = {
    platinum: "bg-zinc-200 text-zinc-800 dark:bg-zinc-600 dark:text-zinc-100",
    gold: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    silver: "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
    bronze: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
  };

  const scoreStyles: Record<string, string> = {
    Hot: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    Warm: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    Cold: "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Back button */}
      <button type="button" onClick={() => router.push("/dashboard")} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Back to Events
      </button>

      {/* Event header */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className={`relative h-36 bg-gradient-to-br ${event.image}`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute bottom-4 left-5 right-5">
            <h1 className="text-xl font-bold text-white drop-shadow-sm sm:text-2xl">{event.title}</h1>
          </div>
          <span className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[event.status]}`}>
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
          {booking && (
            <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Booth booked ({booking.sqMeters} m², {booking.hallPreference})
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
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
            {tab.count !== undefined && (
              <span className={`ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                activeTab === tab.key ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              }`}>
                {tab.count}
              </span>
            )}
            {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-5">
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">About this event</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{event.description}</p>
              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <div className="text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{event.booths}</p>
                  <p className="text-xs text-zinc-400">Total Booths</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{event.exhibitors}</p>
                  <p className="text-xs text-zinc-400">Exhibitors</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{event.visitors.toLocaleString()}</p>
                  <p className="text-xs text-zinc-400">Expected Visitors</p>
                </div>
              </div>
            </div>

            {booking && (
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">Your Booth Booking</h3>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-zinc-400">Style</p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{booking.boothStyle === "bare_space" ? "Bare Space" : "Shell Scheme"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Position</p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{booking.boothPosition.replace("_", " ").replace(/^\w/, (c) => c.toUpperCase())}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Area</p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{booking.sqMeters} m²</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Total Cost</p>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{booking.totalPrice}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Products and services you&apos;re showcasing</p>
              <button
                type="button"
                onClick={() => setShowAddProduct(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Product
              </button>
            </div>

            {showAddProduct && (
              <form onSubmit={handleAddProduct} className="mb-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-500/30 dark:bg-indigo-500/5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <input
                    type="text"
                    placeholder="Product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))}
                    required
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                    required
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <button type="submit" className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">Save</button>
                  <button type="button" onClick={() => setShowAddProduct(false)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</button>
                </div>
              </form>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <div key={p.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className={`h-24 bg-gradient-to-br ${p.image}`} />
                  <div className="p-4">
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{p.category}</span>
                    <h4 className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-50">{p.name}</h4>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="mt-8 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">No products added yet. Add your first product to showcase at this event.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "sponsors" && (
          <div>
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">Sponsors supporting your booth at this event</p>
            <div className="space-y-3">
              {sponsors.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${tierColors[s.tier]}`}>{s.tier}</span>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{s.companyName}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.status === "active" ? "Active" : "Pending approval"}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{s.amount}</p>
                </div>
              ))}
            </div>
            {sponsors.length === 0 && (
              <div className="mt-8 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">No sponsors for this event yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "leads" && (
          <div>
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">Visitor leads captured at your booth</p>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-zinc-50 text-left text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-300">
                    <tr>
                      <th className="px-4 py-3">Visitor</th>
                      <th className="px-4 py-3">Company</th>
                      <th className="px-4 py-3">Interest</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l) => (
                      <tr key={l.id} className="border-t border-zinc-100 dark:border-zinc-800">
                        <td className="px-4 py-3">
                          <p className="font-medium text-zinc-900 dark:text-zinc-100">{l.visitorName}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{l.visitorEmail}</p>
                        </td>
                        <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{l.visitorCompany}</td>
                        <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{l.interest}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${scoreStyles[l.score]}`}>{l.score}</span>
                        </td>
                        <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                          {new Date(l.capturedDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {leads.length === 0 && (
              <div className="mt-8 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">No leads captured at this event yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Organiser Event Detail ─── */

type Tab = "exhibitors" | "visitors" | "booths";

function OrganiserEventDetail() {
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
