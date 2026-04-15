import type { Metadata } from "next";

import VisitorDirectory from "@/components/visitor-directory";

export const metadata: Metadata = {
  title: "Visitor Experience",
  description: "Browse exhibitors, apply filters, and book meetings in the visitor portal demo.",
};

export default function VisitorExperiencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Visitor Experience</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">Discover exhibitors, search by interest, and request meetings in seconds.</p>
      </div>
      <VisitorDirectory />
    </div>
  );
}
