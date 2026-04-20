"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { mockExhibitorProducts, mockEvents } from "@/data/mock-data";
import type { ExhibitorProduct } from "@/data/mock-data";

const gradients = [
  "from-indigo-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-fuchsia-600",
  "from-amber-500 to-orange-600",
];

export default function ProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<ExhibitorProduct[]>(
    mockExhibitorProducts.filter((p) => p.userId === user?.id),
  );
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", description: "", eventId: "" });

  const allEvents = mockEvents.filter((e) => e.status === "upcoming" || e.status === "live");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const product: ExhibitorProduct = {
      id: `PRD-${Date.now()}`,
      userId: user?.id ?? "",
      eventId: newProduct.eventId,
      name: newProduct.name,
      category: newProduct.category,
      description: newProduct.description,
      image: gradients[Math.floor(Math.random() * gradients.length)],
    };
    setProducts((prev) => [product, ...prev]);
    setNewProduct({ name: "", category: "", description: "", eventId: "" });
    setShowAdd(false);
  };

  // Group products by event
  const groupedByEvent = products.reduce<Record<string, ExhibitorProduct[]>>((acc, p) => {
    if (!acc[p.eventId]) acc[p.eventId] = [];
    acc[p.eventId].push(p);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Products & Services</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage products you&apos;re showcasing at exhibitions
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-500/30 dark:bg-indigo-500/5">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">New Product</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
            <select
              value={newProduct.eventId}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, eventId: e.target.value }))}
              required
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            >
              <option value="">Select event</option>
              {allEvents.map((evt) => (
                <option key={evt.id} value={evt.id}>{evt.title}</option>
              ))}
            </select>
          </div>
          <div className="mt-3 flex gap-2">
            <button type="submit" className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">Save</button>
            <button type="button" onClick={() => setShowAdd(false)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</button>
          </div>
        </form>
      )}

      {/* Products grouped by event */}
      <div className="mt-6 space-y-8">
        {Object.entries(groupedByEvent).map(([eventId, eventProducts]) => {
          const event = mockEvents.find((e) => e.id === eventId);
          return (
            <div key={eventId}>
              <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {event?.title ?? "Unknown Event"}
                <span className="ml-2 text-sm font-normal text-zinc-400">({eventProducts.length})</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {eventProducts.map((p) => (
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
            </div>
          );
        })}
      </div>

      {products.length === 0 && !showAdd && (
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No products yet. Add your first product to showcase at events.</p>
        </div>
      )}
    </div>
  );
}
